# VedaAI – AI Assessment Creator

**Full Stack Engineering Assignment Implementation**

AI-powered academic assessment system that allows teachers to create assignments and generate question papers using AI.
https://vedaai-assignment-ranjeetpandey.netlify.app/home
---

## Architecture Overview

```
vedaai/
├── frontend/          # Next.js 14 + TypeScript + Zustand
└── backend/           # Node.js + Express + TypeScript
```

### Tech Stack

**Frontend:** Next.js 14, TypeScript, Zustand (state management), React Hook Form + Zod (validation), WebSocket client, Tailwind CSS

**Backend:** Node.js + Express (TypeScript), MongoDB + Mongoose, Redis (caching/job state), BullMQ (background job queue), WebSocket (ws) for real-time updates

**AI:** Anthropic Claude API (or OpenAI GPT-4) with structured prompt engineering and JSON response parsing

---

## Flow

1. Teacher fills the Create Assignment form (title, subject, class, question types, marks, etc.)
2. Frontend POSTs to `/api/assignments` — assignment saved to MongoDB with `status: pending`
3. A BullMQ job is added to the Redis queue
4. Worker picks up the job → calls AI API with a structured prompt → parses JSON response → saves `generatedPaper` to MongoDB
5. Worker notifies frontend via WebSocket with real-time progress updates
6. Frontend displays the structured question paper with sections, difficulty badges, and marks

---

## Setup Instructions

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Redis (local or Upstash)
- Anthropic API key **or** OpenAI API key

### 1. Backend

```bash
cd backend
cp .env.example .env
# Edit .env: add ANTHROPIC_API_KEY or OPENAI_API_KEY, set MONGODB_URI and REDIS_URL
npm install
npm run dev
```

Backend runs on `http://localhost:5000`

### 2. Frontend

```bash
cd frontend
cp .env.local.example .env.local
# Edit .env.local if backend URL differs
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/assignments` | List all assignments |
| POST | `/api/assignments` | Create assignment + queue job |
| GET | `/api/assignments/:id` | Get assignment with generated paper |
| POST | `/api/assignments/:id/regenerate` | Re-queue generation |
| DELETE | `/api/assignments/:id` | Delete assignment |
| GET | `/api/health` | Health check |

### WebSocket

Connect to `ws://localhost:5000/ws`, then send:
```json
{ "type": "subscribe", "assignmentId": "<id>" }
```

Receive real-time events:
```json
{ "type": "assignment_update", "status": "processing", "progress": 30, "message": "Generating questions..." }
{ "type": "assignment_update", "status": "completed", "progress": 100 }
```

---

## Features Implemented

### Core
- ✅ Assignment creation form with validation
- ✅ File upload (PDF / text) for reference material
- ✅ AI question generation (Anthropic Claude / OpenAI)
- ✅ Structured prompt → JSON parsing (not raw LLM output)
- ✅ Sections A, B, C with difficulty + marks per question
- ✅ Background job queue (BullMQ + Redis)
- ✅ Real-time WebSocket progress updates
- ✅ MongoDB persistence
- ✅ Redis caching of generated papers
- ✅ Output page with structured question paper
- ✅ Student info section (name, roll no, section lines)
- ✅ Answer key (collapsible, teacher-only)
- ✅ Zustand state management

### Bonus
- ✅ Print / Download as PDF (browser print API)
- ✅ Regenerate button
- ✅ Difficulty badges (Easy / Medium / Hard)
- ✅ Mobile responsive layout
- ✅ Proper error handling + retry logic (3 attempts)

---

## Environment Variables

### Backend `.env`
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vedaai
REDIS_URL=redis://localhost:6379
ANTHROPIC_API_KEY=sk-ant-...
AI_PROVIDER=anthropic          # or "openai"
OPENAI_API_KEY=sk-...          # if using OpenAI
FRONTEND_URL=http://localhost:3000
```

### Frontend `.env.local`
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_WS_URL=ws://localhost:5000/ws
```
