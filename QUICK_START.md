# 🚨 QUICK START - Emergency Accident Detection System

## Status: ✅ BACKEND RUNNING on PORT 4567

## To View Dashboard
1. Open NEW terminal
2. Run:
   ```bash
   cd "c:\Users\dhine\Desktop\emergency system\frontend"
   npm run dev
   ```
3. Open browser: `http://localhost:5173`

## ⚠️ CRITICAL: Update Your Hardware Code

**Old URL (WRONG):**
```
http://localhost:5000/api/accidents  ❌
```

**New URL (CORRECT):**
```
http://localhost:4567/api/accidents  ✅
```

## Hardware Quick Test (Python)
```python
import requests

# Update this URL!
url = "http://localhost:4567/api/accidents"

files = {'image': open('accident.jpg', 'rb')}
data = {
    'confidence': '95.5',
    'cameraId': 'ESP32-CAM-01',
    'location': 'Highway Exit 5'
}

response = requests.post(url, files=files, data=data)
print(response.status_code)  # Should be 201
print(response.json())
```

## What to Watch

### Server Console Should Show:
```
🚨 NEW ACCIDENT REPORT RECEIVED
⏰ Time: ...
📦 Request Body: ...
📁 File Info: ...
✅ Accident stored successfully!
```

### If You See "NO FILE RECEIVED":
- Check field name is exactly `image`
- Verify sending as `multipart/form-data`
- Ensure file is actually attached

## Files You Need
- 📖 Full guide: `TROUBLESHOOTING.md`
- 🎯 Detailed walkthrough: See artifacts panel
- 🔧 Port changer: `backend/update-port.js`
