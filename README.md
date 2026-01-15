# AI-Powered Accident Detection System

## Overview
A real-time accident detection and emergency response dashboard, receiving data from hardware devices and displaying it in a control-room style interface.

## Tech Stack
- **Backend**: Node.js, Express, Multer (Port 4567)
- **Frontend**: React, Vite, Tailwind CSS (Port 5173)

## Setup & Run

### 1. Backend
```bash
cd backend
npm install
node src/server.js
```
Server runs at `http://localhost:4567`

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
Dashboard available at `http://localhost:5173`

## ⚠️ IMPORTANT: Hardware Configuration

Your hardware **MUST** send POST requests to:
```
http://localhost:4567/api/accidents
```

- **Field name for image:** `image` (required)
- **Method:** POST
- **Content-Type:** multipart/form-data

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for detailed examples.

## API Endpoints
- `POST /api/accidents`: Upload accident data (image, metadata).
- `GET /api/accidents`: List recent accidents.
- `GET /api/accidents/:id`: Get accident details.

## Deployment
See [DEPLOYMENT.md](DEPLOYMENT.md) for instructions on how to put this system online using Ngrok (easiest) or Vercel/Render.

