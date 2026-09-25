
import os
from pathlib import Path
import openpyxl
import psycopg

BASE_DIR = Path(__file__).resolve().parent
EXCEL = BASE_DIR / "unisphere_database.xlsx"
DATABASE_URL = (
    os.getenv("DATABASE_URL")
    or os.getenv("POSTGRES_URL")
    or os.getenv("POSTGRES_PRISMA_URL")
)

if not DATABASE_URL:
    raise SystemExit("Set DATABASE_URL or POSTGRES_URL first.")
if not EXCEL.exists():
    raise SystemExit(f"Missing {EXCEL}")

SCHEMAS = {
    "users": """
        id BIGINT PRIMARY KEY,
        name TEXT, email TEXT, password TEXT, role TEXT,
        department TEXT, class_year TEXT, roll_no TEXT,
        employee_id TEXT, phone TEXT, status TEXT
    """,
    "attendance": """
        id BIGINT PRIMARY KEY,
        student_id BIGINT, subject TEXT, date TEXT, present BOOLEAN
    """,
    "faculty_attendance": """
        id BIGINT PRIMARY KEY,
        faculty_id BIGINT, date TEXT, present BOOLEAN
    """,
    "assignments": """
        id BIGINT PRIMARY KEY,
        title TEXT, subject TEXT, description TEXT, due_date TEXT,
        max_marks INTEGER, created_by BIGINT, created_at TEXT
    """,
    "submissions": """
        id BIGINT PRIMARY KEY,
        assignment_id BIGINT, student_id BIGINT, submitted_at TEXT,
        file_name TEXT, status TEXT, marks DOUBLE PRECISION, feedback TEXT
    """,
    "notices": """
        id BIGINT PRIMARY KEY,
        title TEXT, body TEXT, category TEXT, author TEXT, created_at TEXT
    """,
    "results": """
        id BIGINT PRIMARY KEY,
        student_id BIGINT, subject TEXT, internal DOUBLE PRECISION,
        external DOUBLE PRECISION, total DOUBLE PRECISION,
        grade TEXT, published BOOLEAN
    """,
    "fees": """
        id BIGINT PRIMARY KEY,
        student_id BIGINT, semester_fee DOUBLE PRECISION, paid DOUBLE PRECISION
    """,
    "placements": """
        id BIGINT PRIMARY KEY,
        company TEXT, role TEXT, package TEXT, eligibility TEXT,
        deadline TEXT, status TEXT
    """,
    "timetable": """
        id BIGINT PRIMARY KEY,
        day TEXT, start_time TEXT, end_time TEXT, subject TEXT,
        faculty TEXT, room TEXT, class_year TEXT
    """,
}

def pg_value(table, col, value):
    if value is None:
        return None
    if col == "present" or col == "published":
        return bool(value)
    return value

print("Excel:", EXCEL)
print("Connecting to Neon/PostgreSQL...")

wb = openpyxl.load_workbook(EXCEL, read_only=True, data_only=True)

with psycopg.connect(DATABASE_URL) as conn:
    with conn.cursor() as cur:
        for table, schema in SCHEMAS.items():
            cur.execute(f"CREATE TABLE IF NOT EXISTS {table} ({schema})")
        for table in SCHEMAS:
            cur.execute(f"TRUNCATE TABLE {table}")
        conn.commit()

        for table in SCHEMAS:
            ws = wb[table]
            headers = [c.value for c in next(ws.iter_rows(max_row=1))]
            quoted = ",".join(f'"{h}"' for h in headers)
            placeholders = ",".join(["%s"] * len(headers))
            sql = f"INSERT INTO {table} ({quoted}) VALUES ({placeholders})"

            count = 0
            batch = []
            for raw in ws.iter_rows(min_row=2, values_only=True):
                batch.append(tuple(pg_value(table, h, v) for h, v in zip(headers, raw)))
                if len(batch) >= 1000:
                    cur.executemany(sql, batch)
                    count += len(batch)
                    batch = []
            if batch:
                cur.executemany(sql, batch)
                count += len(batch)

            cur.execute(f"""
                SELECT setval(
                    pg_get_serial_sequence('{table}', 'id'),
                    COALESCE((SELECT MAX(id) FROM {table}), 1),
                    true
                )
            """) if table in {"users","attendance","faculty_attendance","assignments","submissions","notices","results","fees","placements","timetable"} else None

            print(f"{table}: {count} rows")
        conn.commit()

print("Migration complete.")
