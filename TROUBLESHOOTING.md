# Emergency System - Quick Start Guide

## Problem: Images Not Showing

If your hardware says images are being sent but you don't see anything:

### 1. **Start the Backend Server**
```bash
cd backend
npm start
```
**Expected Output:**
```
╔════════════════════════════════════════════════════════╗
║   🚨 EMERGENCY ACCIDENT DETECTION SYSTEM 🚨          ║
╚════════════════════════════════════════════════════════╝

✅ Server running on port 5000
📍 API Endpoints:
   POST http://localhost:5000/api/accidents
   ...
```

### 2. **Start the Frontend** (in a new terminal)
```bash
cd frontend
npm run dev
```
Open browser to: `http://localhost:5173`

### 3. **Test the API Manually**
```bash
cd backend
node test-upload.js
```

### 4. **Check Hardware Configuration**

Your hardware MUST send to: `http://localhost:5000/api/accidents`

**Required Format:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Required field: `image` (the image file)
- Optional fields:
  - `confidence` (number, e.g., "95.5")
  - `cameraId` (string, e.g., "CAM-01")
  - `location` (string, e.g., "Main Street")
  - `timestamp` (ISO string)

**Example using curl:**
```bash
curl -X POST http://localhost:5000/api/accidents \
  -F "image=@path/to/image.jpg" \
  -F "confidence=85.5" \
  -F "cameraId=CAM-01" \
  -F "location=Test Location"
```

**Example Python code for hardware:**
```python
import requests

url = "http://localhost:5000/api/accidents"
files = {'image': open('accident.jpg', 'rb')}
data = {
    'confidence': '95.5',
    'cameraId': 'ESP32-CAM-01',
    'location': 'Highway Exit 5',
    'timestamp': '2024-01-15T12:00:00Z'
}
response = requests.post(url, files=files, data=data)
print(response.json())
```

### 5. **Debugging Checklist**

✅ **Backend running?** → Should see the startup message  
✅ **Frontend running?** → Browser shows dashboard  
✅ **Network accessible?** → Can you curl the health endpoint?  
```bash
curl http://localhost:5000/health
```
✅ **Hardware sending to correct URL?** → Check IP address  
  - If hardware is on different machine, use actual IP instead of localhost
  - Example: `http://192.168.1.100:5000/api/accidents`

✅ **Hardware using multipart/form-data?** → Check Content-Type header  
✅ **Image field named "image"?** → Field name must match exactly  

### 6. **Watch Server Logs**

When hardware sends data, you should see:
```
========================================
🚨 NEW ACCIDENT REPORT RECEIVED
========================================
⏰ Time: 2024-01-15T12:00:00.000Z
📦 Request Body: { confidence: '95.5', cameraId: 'CAM-01' ... }
📁 File Info: { filename: '1705320000000-123456789.jpg', ... }
✅ Accident stored successfully!
```

If you see `NO FILE RECEIVED`, the image isn't being sent properly.

### 7. **Common Issues**

| Issue | Solution |
|-------|----------|
| "Server is not running" | Run `npm start` in backend folder |
| "No FILE RECEIVED" | Hardware not sending image field correctly |
| "Cannot GET /api/accidents" | Using GET instead of POST, or wrong URL |
| CORS errors | Backend has CORS enabled, shouldn't happen |
| Images show but broken | Check uploads folder: `backend/uploads/` |
| 404 on image | Static file serving issue - restart backend |

### 8. **Network Configuration**

If hardware is on **different device** (ESP32, Arduino, etc.):

1. Find your computer's IP:
```bash
ipconfig
```
Look for IPv4 Address (e.g., 192.168.1.100)

2. Update hardware code to use:
```
http://192.168.1.100:5000/api/accidents
```

3. Make sure both devices are on same network

4. Check Windows Firewall allows port 5000
