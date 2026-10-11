# Social Task Manager

A mobile-first productivity app built with Expo (React Native) and a lightweight Node.js backend.

Features:
- Login and session flow
- Dashboard with metrics
- Task creation form
- Real-time style chat UI
- Payment screen with mock checkout
- Local API for development

## Stack
- Frontend: Expo + React Native
- Backend: Node.js + Express
- Data: in-memory JSON store for local development

## Project structure
- `app/` - mobile application
- `backend/` - API server

## Run locally

### 1) Start the backend
```bash
cd backend
npm install
npm run dev
```

### 2) Start the mobile app
```bash
cd app
npm install
npx expo start
```

For Android emulator, the app is already configured to talk to `10.0.2.2:3001`.
For physical devices, update `app/src/services/api.js` to use your machine IP.

## Default login
- Email: `user@example.com`
- Password: `demo123`

## Notes
This is a working starter app intended for local development and easy extension.
