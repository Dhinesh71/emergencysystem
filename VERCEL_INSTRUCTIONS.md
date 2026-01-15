# Vercel Deployment Instructions

## 1. Environment Variables
You MUST add your Supabase credentials to Vercel for the backend to work.

1.  Go to your Vercel Project Dashboard.
2.  Click on **Settings** (top tab).
3.  Click on **Environment Variables** (left sidebar).
4.  Add the following variables (copy values from your `backend/.env` file):
    *   **Key:** `SUPABASE_URL`
        **Value:** `https://smgwdwunuierzonqxyii.supabase.co`
    *   **Key:** `SUPABASE_ANON_KEY`
        **Value:** `eyJhbGciOiJIUzI...` (copy the full key)

## 2. Redeploy
After adding the variables:
1.  Go to the **Deployments** tab.
2.  Click the three dots (`...`) on the latest deployment.
3.  Select **Redeploy**.
4.  Check the "Redeploy with existing build cache" option if available (or just Redeploy).

## 3. Storage Bucket Reminder
Ensure you have created the **Public** storage bucket named `accidents` in your Supabase dashboard.
