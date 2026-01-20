# Resume AI Backend (scaffold)

This folder contains a minimal Express + Mongoose backend scaffold for the Resume AI Builder project.

Quick start:

1. Copy `.env.example` to `.env` and set `MONGO_URI` and JWT secrets.
2. Install dependencies: `cd backend && npm install`
3. Run dev server: `npm run dev` (requires MongoDB running locally)

Implemented endpoints (initial):

- Auth: `/api/v1/auth` (register, login, refresh, logout, me)
- Users: `/api/v1/users` (get / update)
- Resumes: `/api/v1/resumes` (CRUD)
- Templates: `/api/v1/templates` (list)
- Uploads: `/api/v1/uploads/presign` (presign stub)
- Jobs: `/api/v1/jobs` (status)

Notes:

- JWT access + refresh token implementation
- Minimal Mongoose models
- Uploads: the `/api/v1/uploads/presign` endpoint is a simple stub by default and does not require a bucket; replace it with your provider's presign logic (S3, GCS, etc.) when integrating real storage.
