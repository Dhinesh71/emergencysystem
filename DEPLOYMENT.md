

## Option 2: Unified Vercel Deployment (Recommended)
*Best for: Easy, free, permanent deployment. Both Frontend and Backend on one URL.*

**⚠️ Warning**: Data (accidents/images) will reset periodically because Vercel servers go to sleep.

### Step 1: Install Vercel CLI (Optional but easy)
```bash
npm install -g vercel
```

### Step 2: Deploy
1.  Open terminal in the root folder (`emergency system`).
2.  Run:
    ```bash
    vercel
    ```
3.  Follow the prompts:
    *   Set up and deploy? **Yes**
    *   Which scope? **(Select your account)**
    *   Link to existing project? **No**
    *   Project name? **accident-detection-system**
    *   Directory? **(Leave default)**
    *   Want to modify settings? **No**

### Step 3: Update Hardware
Once deployed, Vercel will give you a URL (e.g., `https://accident-detection-system.vercel.app`).
Update your hardware code to:
```
POST https://accident-detection-system.vercel.app/api/accidents
```

### Alternative: Deploy via GitHub
1.  Push your code to **GitHub**.
2.  Go to **Vercel Dashboard** > **Add New Project**.
3.  Import your repository.
4.  **Framework Preset**: Select **Vite**.
5.  **Root Directory**: Leave as `.` (root).
6.  Click **Deploy**.

---

### Comparison

| Feature | Ngrok (Local) | Vercel (Unified) |
| :--- | :--- | :--- |
| **Stability** | Temporary URL | Permanent URL |
| **Images** | **Permanent** (Saved to Disk) | **Temporary** (In-Memory Base64) |
| **Setup** | Easy (No code changes) | Easy (Deploy command) |
| **Best For** | **Hardware Testing** | **Showcasing / Demos** |
