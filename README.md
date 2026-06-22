# Job Portal (Frontend + Backend)(https://jobportal-one-kohl.vercel.app/)

A full-stack **job portal** with authentication, job browsing, admin/company management, job applications, and AI-assisted resume/interview features.

frontend link = https://jobportal-one-kohl.vercel.app/
backend link = https://jobportal-b-8qo9.onrender.com

## Tech Stack

- **Frontend:** React + Vite, React Router, Redux Toolkit
- **Backend:** Node.js + Express, MongoDB (Mongoose)
- **AI/Utilities:** `@google/genai` (AI features), Cloudinary (uploads), Puppeteer/PDF parsing

## Project Structure

- `frontend/` — React application
- `backend/` — Express API server

## Prerequisites

- Node.js (LTS recommended)
- MongoDB running (local or hosted)

## Setup

### 1) Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` (example):

```bash
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_ORIGINS=http://localhost:5173
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
GOOGLE_GENAI_API_KEY=...
```

Run the server:

```bash
npm run dev
```

Server runs at `http://localhost:4000` (or your configured `PORT`).

### 2) Frontend

```bash
cd frontend
npm install
```

Run the app:

```bash
npm run dev
```

Frontend runs at `http://localhost:5173` by default.

## Available Routes (High Level)

Backend (mounted under `/api`):
- `/api/users` — user auth & profile related routes
- `/api/company` — company management
- `/api/job` — job listing & details
- `/api/application` — apply to jobs
- `/api/ai` — AI resume/interview/report related endpoints

Frontend pages include:
- `/` Home
- `/login`, `/register`
- `/Profile`, `/Jobs`, `/browse`, `/description/:id`
- Admin (protected):
  - `/admin/companies`, `/admin/companies/create`, `/admin/companies/:id`
  - `/admin/jobs`, `/admin/jobs/create`, `/admin/jobs/:id/applicants`
- AI (protected/functional):
  - `/ai`, `/ai/reports`
  - `/interview/:interviewId`
 
##Images
<img width="1438" height="820" alt="Screenshot 2026-06-17 at 8 13 47 PM" src="https://github.com/user-attachments/assets/49fe83e9-f084-4309-83e7-2d95441cb4b6" />
<img width="1440" height="818" alt="Screenshot 2026-06-18 at 6 47 27 PM" src="https://github.com/user-attachments/assets/04bda23e-2e28-4393-8e6a-c6e6a1b74141" />
<img width="1440" height="818" alt="Screenshot 2026-06-18 at 6 46 50 PM" src="https://github.com/user-attachments/assets/20508e58-2acc-474a-80d7-16f474d2c783" />
<img width="1440" height="797" alt="Screenshot 2026-06-18 at 6 42 19 PM" src="https://github.com/user-attachments/assets/471e80ac-c1b7-4f94-99af-b57cb56a031a" />
<img width="1440" height="818" alt="Screenshot 2026-06-18 at 6 47 33 PM" src="https://github.com/user-attachments/assets/5c8d407c-add7-4628-afbd-4060067b1c1d" />
<img width="1440" height="818" alt="Screenshot 2026-06-18 at 6 46 57 PM" src="https://github.com/user-attachments/assets/7a0dcf31-3b00-4254-b458-73e842600f30" />
<img width="1440" height="818" alt="Screenshot 2026-06-18 at 6 46 08 PM" src="https://github.com/user-attachments/assets/3909ca17-d04d-4c22-82e0-00f0e721640f" />
<img width="1440" height="818" alt="Screenshot 2026-06-18 at 6 47 38 PM" src="https://github.com/user-attachments/assets/c9609a60-889a-4d1c-ac96-7396a2a0a6f8" />
<img width="1440" height="818" alt="Screenshot 2026-06-18 at 6 47 10 PM" src="https://github.com/user-attachments/assets/4aa4ddce-4310-4b2d-9d53-9389c7041f8a" />
<img width="1440" height="797" alt="Screenshot 2026-06-18 at 6 42 13 PM" src="https://github.com/user-attachments/assets/a930006c-de90-4a3c-b388-588ce656d623" />


## Testing

This repo currently doesn’t include automated tests (based on package scripts).

## Deployment Notes

- Ensure backend `.env` values are provided.
- Configure `FRONTEND_ORIGINS` to allow cookie-based auth from your frontend domain.
- Prefer production process managers (e.g. PM2) and proper CORS settings.
