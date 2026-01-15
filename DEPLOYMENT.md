# 🚀 Deployment Guide - Accident Detection System

This guide covers two ways to make your system accessible from the internet:
1.  **Ngrok (Recommended for Demos)** - Quickest, keeps images saved on your laptop.
2.  **Cloud Deployment (Render/Vercel)** - Permanent links, but images are temporary (delete on restart) unless you add cloud storage.

---

## Option 1: Ngrok (Best for Hackathons & Demos)
*Why? You don't need to change any code. Your laptop acts as the server, so images saved to the `uploads` folder stay there safely.*

### 1. Install Ngrok
1.  Go to [ngrok.com](https://ngrok.com) and sign up (free).
2.  Download and install Ngrok.
3.  Connect your account (run the command shown on their dashboard, e.g., `ngrok config add-authtoken ...`).

### 2. Start Your Servers Normally
Open two terminals and run:

**Terminal 1 (Backend):**
```bash
cd backend
npm start
```
*(Ensure it's running on port 4567)*

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

### 3. Expose Backend to the Internet
Open a **new** terminal and run:
```bash
ngrok http 4567
```
Copy the **Forwarding URL** (e.g., `https://a1b2-c3d4.ngrok-free.app`).

### 4. Configure Hardware
Update your hardware code to send data to this new public URL:
```
POST https://a1b2-c3d4.ngrok-free.app/api/accidents
```
*(Replace `https://a1b2-c3d4.ngrok-free.app` with your actual Ngrok URL)*

### 5. Access Dashboard
You can now access your dashboard locally at `http://localhost:5173`.
To share the dashboard publicly, run another ngrok tunnel in a separate terminal:
```bash
ngrok http 5173
```

---

## Option 2: Cloud Deployment (Render + Vercel)
*Why? Creates permanent links anyone can visit. Caveat: Uploaded images will be DELETED whenever the free server "sleeps" (updates/inactivity).*

### Step 1: Deploy Backend to Render

1.  Push your code to **GitHub**.
2.  Go to [dashboard.render.com](https://dashboard.render.com) and creating a new **Web Service**.
3.  Connect your GitHub repo.
4.  **Settings:**
    *   **Root Directory:** `backend`
    *   **Build Command:** `npm install`
    *   **Start Command:** `node src/server.js`
    *   **Environment Variables:** Add `PORT` with value `4567` (or let Render assign one, usually 10000).
5.  Click **Deploy**.
6.  Copy your new backend URL (e.g., `https://my-accident-backend.onrender.com`).

### Step 2: Configure Frontend for Production

1.  Open `frontend/src/api/accident.api.js`.
2.  Change the API URL to your **Render Backend URL**:
    ```javascript
    // Replace with your actual Render URL
    const API_URL = 'https://my-accident-backend.onrender.com/api/accidents'; 
    ```
3.  Open `frontend/src/components/AccidentCard.jsx` and `frontend/src/pages/AccidentDetail.jsx`.
4.  Update the image base URL to match your Render backend.
    *   *Tip: Better yet, use a variable for this base URL so you don't have to change it in multiple places!*

### Step 3: Deploy Frontend to Vercel

1.  Go to [vercel.com](https://vercel.com) and sign up.
2.  Import your GitHub repo.
3.  **Settings:**
    *   **Root Directory:** `frontend`
    *   **Framework Preset:** Vite
    *   **Build Command:** `npm run build`
    *   **Output Directory:** `dist`
4.  Click **Deploy**.

---

### Comparison

| Feature | Ngrok (Local Tunnel) | Cloud (Render/Vercel) |
| :--- | :--- | :--- |
| **Setup Time** | < 5 mins | 15-30 mins |
| **Cost** | Free | Free Tier |
| **Image Storage** | **Persistent** (Saved on laptop) | **Temporary** (Deleted on restart) |
| **URL Stability** | Changes on restart (unless paid) | Permanent |
| **Hardware Config** | Update URL each session | Set once and forget |
| **Best For** | **Demos, Testing, Hackathons** | **Production w/ cloud storage** |
