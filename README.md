# 🎓 AuraLearn AI — Intelligent Adaptive Learning & Assessment Platform

<div align="center">

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-iem--hacks.vercel.app-brightgreen?style=for-the-badge)](https://iem-hacks.vercel.app/)
[![Firebase Hosting](https://img.shields.io/badge/Firebase_Hosting-eduai--d168d.web.app-orange?style=for-the-badge&logo=firebase)](https://eduai-d168d.web.app)
[![AI Provider](https://img.shields.io/badge/AI-Google_Gemini-4285F4?style=for-the-badge&logo=google)](https://aistudio.google.com)

**AuraLearn AI** is a real-time, AI-powered adaptive learning platform designed for teachers and students. It features Google Firebase Auth, Firestore real-time sync, Google Gemini 1.5 & 2.0 Flash models for AI tutoring & automated question generation, Google Meet integration, and detailed student analytics.

[🌐 Open Live App →](https://iem-hacks.vercel.app/)

</div>

---

## 🎬 Demo Video

<div align="center">

[![Watch the Demo](https://img.youtube.com/vi/3LUOnh70Uc8/maxresdefault.jpg)](https://youtu.be/3LUOnh70Uc8)

**▶️ [Watch Full Demo on YouTube →](https://youtu.be/3LUOnh70Uc8)**

</div>

---

## 📸 Product Screenshots

### 🏠 Landing Page — Hero
![Landing Page Hero](./screenshots/01-landing-hero.png)

### 👨‍🏫 For Teachers — Features Overview
![Teacher Features](./screenshots/02-teacher-features.png)

### 👨‍🎓 For Students — AI-Powered Learning
![Student Features](./screenshots/03-student-features.png)

### 📊 Student Dashboard
![Student Dashboard](./screenshots/04-student-dashboard.png)

### 🏫 Teacher Dashboard — Class Management
![Teacher Dashboard](./screenshots/05-teacher-dashboard.png)

---

## 🏗️ App Directory Structure

```
iem_hacks/
├── README.md                          # Application documentation & pipeline architecture
├── screenshots/                       # Product screenshots for README
└── frontend/                          # Vite + React 18 Single Page Application
    ├── firebase.json                  # Firebase Hosting SPA routing & rewrite rules
    ├── vercel.json                    # Vercel SPA routing configuration
    ├── firestore.rules                # Production Firestore Security Rules
    ├── firestore.indexes.json         # Firestore Composite Indexes
    ├── index.html                     # HTML5 entrypoint & Google Fonts (League Spartan)
    ├── package.json                   # Dependencies (Firebase, Lucide-React, Recharts)
    ├── vite.config.js                 # Vite build configuration (Port 3000)
    ├── .env                           # Environment secrets (Firebase & Gemini keys)
    ├── .env.example                   # Environment configuration template
    └── src/
        ├── main.jsx                   # React DOM root entrypoint
        ├── App.jsx                    # Core Router & Navigation controller
        ├── firebase.js                # Firebase App, Auth & Firestore initialization
        ├── index.css                  # Physical Kiss-Cut Material Design CSS system
        ├── context/
        │   └── AuthContext.jsx        # Auth state context provider & role switcher
        ├── components/
        │   ├── Navbar.jsx             # Role-aware Navigation Bar with user badge
        │   ├── EmptyState.jsx         # Component for empty classes/tests/attempts
        │   ├── AITutor.jsx            # Gemini AI explanation & practice quiz widget
        │   ├── CreateTestModal.jsx    # Teacher test creator with AI question generator
        │   └── ConductClassModal.jsx  # Teacher Google Meet instant room launcher
        └── pages/
            ├── LandingPage.jsx        # Public product showcase landing page
            ├── AuthPage.jsx           # Google Sign-In & Role selection (Student/Teacher)
            ├── TeacherDashboard.jsx   # Class management, AI Test builder, Meet & Analytics
            └── StudentDashboard.jsx   # Class enrolment, Test attempt view, AI Tutor & Progress
```

---

## ⚡ Complete System Pipeline & Architecture

### 1. High-Level Data & AI Pipeline

```mermaid
flowchart TD
    subgraph Client ["Frontend Client (React 18 + Vite)"]
        Landing["Landing Page"]
        Auth["Auth Page (Google Sign-In)"]
        TDash["Teacher Dashboard"]
        SDash["StudentDashboard"]
        AITutor["AI Tutor Widget"]
        TestModal["Create Test Modal"]
    end

    subgraph Firebase ["Firebase Cloud Infrastructure"]
        FAuth["Firebase Auth"]
        FSDB[("Firestore Database")]
        FHost["Firebase Hosting"]
    end

    subgraph GoogleAI ["Google AI Infrastructure"]
        Gemini15["Gemini 1.5 Flash API"]
        Gemini20["Gemini 2.0 Flash API"]
    end

    subgraph VideoConferencing ["Google Services"]
        GMeet["Google Meet API / Instant Room"]
    end

    Landing -->|Sign In Click| Auth
    Auth -->|Authenticate| FAuth
    FAuth -->|Store User Profile & Role| FSDB
    
    Auth -->|Role: Teacher| TDash
    Auth -->|Role: Student| SDash

    TDash -->|Create Class / Tests| FSDB
    TDash -->|Launch Class| GMeet
    TDash -->|Generate AI Questions| TestModal
    TestModal -->|Prompt API| Gemini15

    SDash -->|Join Class by Code| FSDB
    SDash -->|Submit Test Attempt| FSDB
    SDash -->|Interactive Search| AITutor
    AITutor -->|Generate Explanation & Quiz| Gemini15
    Gemini15 -.->|Fallback if busy| Gemini20
```

---

### 2. Teacher & Student Workflow Pipelines

#### 👨‍🏫 Teacher Workflow Pipeline
```
[Google Sign-In] ➔ [Select Teacher Role] ➔ [Create Class & Get Code] 
        │
        ├──► [Conduct Instant Class] ➔ [Launch Google Meet]
        ├──► [Create Test] ➔ [Prompt Gemini AI for Questions] ➔ [Publish Test to Class]
        └──► [View Class Analytics] ➔ [Real-Time Student Attempt Scores & Progress]
```

#### 👨‍🎓 Student Workflow Pipeline
```
[Google Sign-In] ➔ [Select Student Role] ➔ [Enter Class Code] 
        │
        ├──► [Take Test] ➔ [Submit Answers] ➔ [Auto-Score & Save to Firestore]
        ├──► [AI Tutor] ➔ [Search Any Topic] ➔ [Receive Gemini 1.5 Flash Explanation & Quiz]
        └──► [Progress Dashboard] ➔ [Track Average Score & Attempt History]
```

---

## 🗄️ Firestore Database Schema

```
collections/
├── users/
│   └── {uid} ➔ { uid, email, displayName, photoURL, role: "teacher"|"student", createdAt }
├── classes/
│   └── {classId} ➔ { className, subject, joinCode, teacherId, teacherName, studentIds: [], createdAt }
├── tests/
│   └── {testId} ➔ { title, subject, classId, teacherId, questions: [{ text, options, correctAnswer, difficulty }], createdAt }
└── attempts/
    └── {attemptId} ➔ { testId, testTitle, classId, studentId, studentName, score, totalQuestions, percentage, answers: [], completedAt }
```

---

## 🚀 Environment Setup & Deployment

### 1. Prerequisites
- Node.js `v18+`
- Firebase CLI (`npm install -g firebase-tools`)
- Google Gemini API Key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### 2. Local Environment Setup
1. Copy `.env.example` to `frontend/.env`:
   ```bash
   cp frontend/.env.example frontend/.env
   ```
2. Populate `frontend/.env` with your credentials:
   ```env
   VITE_FIREBASE_API_KEY="YOUR_FIREBASE_API_KEY"
   VITE_FIREBASE_AUTH_DOMAIN="YOUR_PROJECT.firebaseapp.com"
   VITE_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
   VITE_FIREBASE_STORAGE_BUCKET="YOUR_PROJECT.firebasestorage.app"
   VITE_FIREBASE_MESSAGING_SENDER_ID="YOUR_SENDER_ID"
   VITE_FIREBASE_APP_ID="YOUR_APP_ID"
   VITE_GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
   ```

### 3. Running Locally
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:3000` in your browser.

### 4. Deploying to Vercel
1. Import the repo at [vercel.com/new](https://vercel.com/new)
2. Set **Root Directory** → `frontend`
3. Add all `VITE_*` environment variables from your `.env`
4. Deploy — your app is live at `https://your-app.vercel.app`

### 5. Deploying to Firebase Hosting
```bash
cd frontend
npm run build
firebase deploy --only hosting,firestore
```

---

## 🎨 Design System
- **Ground Color**: `#f3c9d5` (Blush Pink)
- **Ink Color**: `#1A2540` (Deep Navy)
- **Accent Color**: `#cc2b3f` (Crimson)
- **Card Surface**: `#f2e9db` (Cream)
- **Icons**: Lucide-React (`<Bot />`, `<GraduationCap />`, `<TrendingUp />`, etc.)

---

<div align="center">
Made with ❤️ for IEM Hacks &nbsp;|&nbsp; <a href="https://iem-hacks.vercel.app/">iem-hacks.vercel.app</a> &nbsp;|&nbsp; AuraLearn AI
</div>
