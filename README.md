# Adaptive Learning Platform - Monorepo & PWA

An offline-first Adaptive Learning Platform powered by 2PL Item Response Theory (IRT), a Python Flask RL Thompson Sampling microservice, and a physical **Kiss-Cut Sticker Sheet Material System** UI design.

---

## Quick Start & Setup Commands

### 1. Environment Setup
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 2. Launch Infrastructure with Docker Compose
Start PostgreSQL, Redis, Backend Node server, Flask ML microservice, and Frontend PWA:
```bash
docker-compose -f infrastructure/docker-compose.yml up -d
```

### 3. Apply PostgreSQL Database Migrations (Prisma)
Run the initial Prisma migration on the backend:
```bash
cd backend
npx prisma migrate dev --name init
npx prisma migrate deploy
```

---

## Firestore Security Rules
Copy these security rules into your Firebase Console to enforce authenticated real-time sync access:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null && request.auth.uid != null;
    }
  }
}
```

---

## Local Development (Without Docker)

### Backend Node.js Server:
```bash
cd backend
npm install
npm run dev
```

### Python Flask ML Microservice:
```bash
cd backend/ml-service
pip install -r requirements.txt
python app.py
```

### React PWA Frontend:
```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000` to interact with the application.

---

## Features Implemented
- **Kiss-Cut Sticker Sheet Design**: Blush Pink ground (`#f3c9d5`), Navy ink (`#1A2540`), Crimson accent (`#cc2b3f`), Cream backing paper (`#f2e9db`), blossom pink hatch shadow (`#EF9CC0`), folded CSS triangle corner folds, and empty dated wells.
- **Pure JavaScript 2PL IRT Engine**: 10-iteration Newton-Raphson MAP parameter estimation for student ability $\theta$.
- **Python Flask RL Microservice**: Thompson Sampling with Beta distributions for question selection.
- **Offline-First PWA**: IndexedDB storage via Dexie + Service Worker background sync.
- **Teacher Dashboard**: Socket.io real-time alerts, class $\theta$ progression line chart, Red Alert filtering, and mock SMS webhooks.
