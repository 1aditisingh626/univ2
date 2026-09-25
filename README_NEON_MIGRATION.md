# UniSphere — Neon/PostgreSQL version

This package keeps the supplied UniSphere React UI and moves the backend data layer from Excel to PostgreSQL/Neon.

## Important

- Keep `unisphere_database.xlsx` as a backup until the migration and production tests are complete.
- Do NOT commit your Neon connection string to GitHub.
- Put the Neon connection string in Vercel Environment Variables as `DATABASE_URL`.

## Local migration

PowerShell:

```powershell
$env:DATABASE_URL="YOUR_NEON_CONNECTION_STRING"
python -m pip install -r requirements.txt
python migrate_excel_to_postgres.py
```

The migration imports all 10 workbook sheets, including the 100,000-row attendance table.

## Local frontend

```powershell
npm install
npm run dev
```

## Vercel

Use the existing Vercel project. Add `DATABASE_URL` to the project's Production environment and redeploy.

The React frontend calls `/api/...`, so no frontend API URL change is required for the same Vercel deployment.
