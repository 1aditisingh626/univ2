
import os
from datetime import datetime, date
from typing import Optional

import psycopg
from psycopg.rows import dict_row
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

DATABASE_URL = (
    os.getenv("DATABASE_URL")
    or os.getenv("POSTGRES_URL")
    or os.getenv("POSTGRES_PRISMA_URL")
)

if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL / POSTGRES_URL is not configured")

app = FastAPI(title="UniSphere University Portal API - PostgreSQL")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def db():
    return psycopg.connect(DATABASE_URL, row_factory=dict_row)

def rows(table):
    allowed = {
        "users", "attendance", "faculty_attendance", "assignments",
        "submissions", "notices", "results", "fees", "placements", "timetable"
    }
    if table not in allowed:
        raise ValueError("Invalid table")
    with db() as conn:
        return conn.execute(f"SELECT * FROM {table} ORDER BY id").fetchall()

def clean(v):
    if isinstance(v, (datetime, date)):
        return v.isoformat()
    return v

def clean_rows(items):
    return [{k: clean(v) for k, v in dict(x).items()} for x in items]

class LoginRequest(BaseModel):
    email: str
    password: str

class AttendanceRequest(BaseModel):
    student_id: int
    subject: str
    present: bool
    date: Optional[str] = None

class FacultyAttendanceRequest(BaseModel):
    faculty_id: int
    present: bool
    date: Optional[str] = None

class AssignmentRequest(BaseModel):
    title: str
    subject: str
    description: str = ""
    due_date: str
    max_marks: int = 20
    created_by: int

class SubmissionRequest(BaseModel):
    assignment_id: int
    student_id: int
    submitted_at: Optional[str] = None
    file_name: str = "submission.pdf"

class GradeRequest(BaseModel):
    marks: float
    feedback: str = ""

class NoticeRequest(BaseModel):
    title: str
    body: str
    category: str = "General"
    author: str = "Academic Office"

class UserRequest(BaseModel):
    name: str
    email: str
    password: str = "1234"
    role: str
    department: Optional[str] = None
    class_year: Optional[str] = None
    roll_no: Optional[str] = None
    employee_id: Optional[str] = None
    phone: Optional[str] = None
    status: str = "Active"

class FeeRequest(BaseModel):
    student_id: int
    amount: float

class ResultRequest(BaseModel):
    student_id: int
    subject: str
    internal: float
    external: float
    total: float
    grade: str
    published: int = 1
    published_by: Optional[int] = None

ALIASES = {
    "student0001@gmail.com": "nikki@unisphere.edu",
    "student0002@gmail.com": "aarav@gmail.com",
    "student0003@gmail.com": "meera@gmail.com",
    "student0004@gmail.com": "kabir@gmail.com",
    "faculty01@gmail.com": "priya@unisphere.edu",
    "faculty02@gmail.com": "rajesh@unisphere.edu",
}

@app.get("/api/health")
def health():
    with db() as conn:
        conn.execute("SELECT 1")
    return {"status": "ok", "database": "postgresql"}

@app.post("/api/login")
def login(payload: LoginRequest):
    email = ALIASES.get(payload.email.strip().lower(), payload.email.strip().lower())
    with db() as conn:
        user = conn.execute(
            "SELECT * FROM users WHERE LOWER(email)=LOWER(%s) AND password=%s LIMIT 1",
            (email, payload.password),
        ).fetchone()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return clean_rows([user])[0]

@app.get("/api/state")
def state():
    with db() as conn:
        users = conn.execute("SELECT * FROM users ORDER BY id").fetchall()
        attendance = conn.execute("""
            SELECT id, student_id, subject, date, present
            FROM attendance ORDER BY id
        """).fetchall()
        faculty_attendance = conn.execute("""
            SELECT id, faculty_id, date, present
            FROM faculty_attendance ORDER BY id
        """).fetchall()
        assignments = conn.execute("""
            SELECT a.*, u.name AS creator_name
            FROM assignments a
            LEFT JOIN users u ON u.id=a.created_by
            ORDER BY a.id DESC
        """).fetchall()
        submissions = conn.execute("""
            SELECT s.*, u.name AS student_name, u.roll_no,
                   a.title AS assignment_title, a.subject
            FROM submissions s
            LEFT JOIN users u ON u.id=s.student_id
            LEFT JOIN assignments a ON a.id=s.assignment_id
            ORDER BY s.id DESC
        """).fetchall()
        notices = conn.execute(
            "SELECT * FROM notices ORDER BY id DESC"
        ).fetchall()
        results = conn.execute("""
            SELECT r.*, u.name AS student_name, u.roll_no
            FROM results r
            LEFT JOIN users u ON u.id=r.student_id
            ORDER BY r.id DESC
        """).fetchall()
        fees = conn.execute("""
            SELECT f.*, u.name AS student_name, u.email,
                   u.roll_no, u.department
            FROM fees f
            LEFT JOIN users u ON u.id=f.student_id
            ORDER BY f.id
        """).fetchall()
        placements = conn.execute(
            "SELECT * FROM placements ORDER BY id"
        ).fetchall()
        timetable = conn.execute(
            "SELECT * FROM timetable ORDER BY id"
        ).fetchall()

    return {
        "users": clean_rows(users),
        "attendance": clean_rows(attendance),
        "faculty_attendance": clean_rows(faculty_attendance),
        "assignments": clean_rows(assignments),
        "submissions": clean_rows(submissions),
        "notices": clean_rows(notices),
        "results": clean_rows(results),
        "fees": clean_rows(fees),
        "placements": clean_rows(placements),
        "timetable": clean_rows(timetable),
    }

@app.get("/api/attendance/{student_id}")
def student_attendance(student_id: int):
    with db() as conn:
        data = conn.execute("""
            SELECT subject,
                   COUNT(*)::int AS total,
                   SUM(CASE WHEN present THEN 1 ELSE 0 END)::int AS present
            FROM attendance
            WHERE student_id=%s
            GROUP BY subject
            ORDER BY subject
        """, (student_id,)).fetchall()
    result = []
    for r in data:
        total = int(r["total"] or 0)
        present = int(r["present"] or 0)
        result.append({
            "subject": r["subject"],
            "total": total,
            "present": present,
            "percentage": round((present / total) * 100, 1) if total else 0,
        })
    return result

@app.post("/api/attendance")
def mark_attendance(payload: AttendanceRequest):
    day = payload.date or datetime.now().date().isoformat()
    with db() as conn:
        existing = conn.execute("""
            SELECT id FROM attendance
            WHERE student_id=%s AND subject=%s AND date=%s
            LIMIT 1
        """, (payload.student_id, payload.subject, day)).fetchone()

        if existing:
            row = conn.execute("""
                UPDATE attendance SET present=%s
                WHERE id=%s RETURNING *
            """, (payload.present, existing["id"])).fetchone()
        else:
            row = conn.execute("""
                INSERT INTO attendance(student_id,subject,date,present)
                VALUES(%s,%s,%s,%s) RETURNING *
            """, (payload.student_id, payload.subject, day, payload.present)).fetchone()
    return clean_rows([row])[0]

@app.get("/api/faculty-attendance")
def get_faculty_attendance():
    return clean_rows(rows("faculty_attendance"))

@app.post("/api/faculty-attendance")
def mark_faculty_attendance(payload: FacultyAttendanceRequest):
    day = payload.date or datetime.now().date().isoformat()
    with db() as conn:
        existing = conn.execute("""
            SELECT id FROM faculty_attendance
            WHERE faculty_id=%s AND date=%s
            LIMIT 1
        """, (payload.faculty_id, day)).fetchone()
        if existing:
            row = conn.execute("""
                UPDATE faculty_attendance SET present=%s
                WHERE id=%s RETURNING *
            """, (payload.present, existing["id"])).fetchone()
        else:
            row = conn.execute("""
                INSERT INTO faculty_attendance(faculty_id,date,present)
                VALUES(%s,%s,%s) RETURNING *
            """, (payload.faculty_id, day, payload.present)).fetchone()
    return clean_rows([row])[0]

@app.post("/api/results")
def create_result(payload: ResultRequest):
    with db() as conn:
        row = conn.execute("""
            INSERT INTO results
            (student_id,subject,internal,external,total,grade,published)
            VALUES(%s,%s,%s,%s,%s,%s,%s)
            RETURNING *
        """, (
            payload.student_id, payload.subject, payload.internal,
            payload.external, payload.total, payload.grade,
            bool(payload.published)
        )).fetchone()
    return clean_rows([row])[0]

@app.post("/api/assignments")
def create_assignment(payload: AssignmentRequest):
    created = datetime.now().date().isoformat()
    with db() as conn:
        row = conn.execute("""
            INSERT INTO assignments
            (title,subject,description,due_date,max_marks,created_by,created_at)
            VALUES(%s,%s,%s,%s,%s,%s,%s)
            RETURNING *
        """, (
            payload.title, payload.subject, payload.description,
            payload.due_date, payload.max_marks, payload.created_by, created
        )).fetchone()
    return clean_rows([row])[0]

@app.post("/api/submissions")
def create_submission(payload: SubmissionRequest):
    submitted = payload.submitted_at or datetime.now().isoformat(timespec="seconds")
    with db() as conn:
        row = conn.execute("""
            INSERT INTO submissions
            (assignment_id,student_id,submitted_at,file_name,status,marks,feedback)
            VALUES(%s,%s,%s,%s,%s,NULL,NULL)
            RETURNING *
        """, (
            payload.assignment_id, payload.student_id, submitted,
            payload.file_name, "Submitted"
        )).fetchone()
    return clean_rows([row])[0]

@app.put("/api/submissions/{submission_id}/grade")
def grade_submission(submission_id: int, payload: GradeRequest):
    with db() as conn:
        row = conn.execute("""
            UPDATE submissions
            SET marks=%s, feedback=%s, status='Graded'
            WHERE id=%s
            RETURNING *
        """, (payload.marks, payload.feedback, submission_id)).fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="Submission not found")
    return clean_rows([row])[0]

@app.post("/api/notices")
def create_notice(payload: NoticeRequest):
    created = datetime.now().date().isoformat()
    with db() as conn:
        row = conn.execute("""
            INSERT INTO notices(title,body,category,author,created_at)
            VALUES(%s,%s,%s,%s,%s) RETURNING *
        """, (
            payload.title, payload.body, payload.category,
            payload.author, created
        )).fetchone()
    return clean_rows([row])[0]

@app.post("/api/users")
def create_user(payload: UserRequest):
    with db() as conn:
        exists = conn.execute(
            "SELECT id FROM users WHERE LOWER(email)=LOWER(%s)",
            (payload.email,)
        ).fetchone()
        if exists:
            raise HTTPException(status_code=409, detail="Email already exists")
        row = conn.execute("""
            INSERT INTO users
            (name,email,password,role,department,class_year,roll_no,employee_id,phone,status)
            VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
            RETURNING *
        """, (
            payload.name, payload.email, payload.password, payload.role,
            payload.department, payload.class_year, payload.roll_no,
            payload.employee_id, payload.phone, payload.status
        )).fetchone()
    return clean_rows([row])[0]

@app.delete("/api/users/{user_id}")
def delete_user(user_id: int):
    with db() as conn:
        row = conn.execute(
            "DELETE FROM users WHERE id=%s RETURNING id", (user_id,)
        ).fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="User not found")
    return {"ok": True, "id": user_id}

@app.get("/api/fees")
def get_fees():
    with db() as conn:
        data = conn.execute("""
            SELECT f.*, u.name AS student_name, u.email,
                   u.roll_no, u.department
            FROM fees f
            LEFT JOIN users u ON u.id=f.student_id
            ORDER BY f.id
        """).fetchall()
    return clean_rows(data)

@app.get("/api/fees/{student_id}")
def get_student_fee(student_id: int):
    with db() as conn:
        row = conn.execute("""
            SELECT f.*, u.name AS student_name, u.email,
                   u.roll_no, u.department
            FROM fees f
            LEFT JOIN users u ON u.id=f.student_id
            WHERE f.student_id=%s
            LIMIT 1
        """, (student_id,)).fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="Fee record not found")
    return clean_rows([row])[0]

@app.post("/api/fees/pay")
def pay_fee(payload: FeeRequest):
    if payload.amount <= 0:
        raise HTTPException(status_code=400, detail="Amount must be positive")
    with db() as conn:
        row = conn.execute("""
            UPDATE fees
            SET paid = LEAST(semester_fee, paid + %s)
            WHERE student_id=%s
            RETURNING *
        """, (payload.amount, payload.student_id)).fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="Fee record not found")
    return clean_rows([row])[0]

@app.get("/api/admin/analytics")
def admin_analytics():
    with db() as conn:
        users = conn.execute("""
            SELECT
              COUNT(*) FILTER (WHERE role='student')::int AS students,
              COUNT(*) FILTER (WHERE role='faculty')::int AS faculty,
              COUNT(*) FILTER (WHERE role='admin')::int AS admins,
              COUNT(*)::int AS total
            FROM users
        """).fetchone()
        fee = conn.execute("""
            SELECT COALESCE(SUM(semester_fee),0) AS total_fees,
                   COALESCE(SUM(paid),0) AS collected
            FROM fees
        """).fetchone()
        attendance = conn.execute("""
            SELECT
              COUNT(*)::int AS total,
              COALESCE(SUM(CASE WHEN present THEN 1 ELSE 0 END),0)::int AS present
            FROM attendance
        """).fetchone()
    total = int(attendance["total"] or 0)
    present = int(attendance["present"] or 0)
    return {
        **dict(users),
        "total_fees": float(fee["total_fees"] or 0),
        "collected": float(fee["collected"] or 0),
        "attendance_percentage": round(present / total * 100, 1) if total else 0,
    }
