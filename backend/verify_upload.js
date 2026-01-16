const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

async function testUpload() {
    try {
        console.log('🚀 Starting Raspberry Pi Simulation...');

        // 1. Create a dummy image buffer (1x1 pixel JPEG essentially, or just random bytes mimicking a file)
        // A minimal valid JPEG header + some data
        const dummyImageBuffer = Buffer.from([
            0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46, 0x00, 0x01, 0x01, 0x01, 0x00, 0x48,
            0x00, 0x48, 0x00, 0x00, 0xFF, 0xDB, 0x00, 0x43, 0x00, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
            0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
            0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
            0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xC0, 0x00, 0x0B, 0x08, 0x00, 0x01, 0x00, 0x01, 0x01, 0x01, 0x11,
            0x00, 0xFF, 0xC4, 0x00, 0x1F, 0x00, 0x00, 0x01, 0x05, 0x01, 0x01, 0x01, 0x01, 0x01, 0x01, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09,
            0x0A, 0x0B, 0xFF, 0xDA, 0x00, 0x08, 0x01, 0x01, 0x00, 0x00, 0x3F, 0x00, 0x7F, 0xFF, 0xD9
        ]);

        const form = new FormData();
        form.append('image', dummyImageBuffer, {
            filename: 'test_accident.jpg',
            contentType: 'image/jpeg',
        });
        form.append('confidence', '85.5');
        form.append('cameraId', 'CAM-001');
        form.append('location', 'Test Location');
        form.append('timestamp', new Date().toISOString());

        console.log('📡 Sending POST request to http://localhost:3000/api/accidents...');

        const response = await axios.post('http://localhost:3000/api/accidents', form, {
            headers: {
                ...form.getHeaders(),
            },
        });

        console.log('✅ Response Received:', response.status);
        console.log('📄 Data:', response.data);

        if (response.data.url) {
            console.log('🎉 SUCCESS: Image URL received:', response.data.url);
        } else {
            console.error('⚠️ WARNING: No URL in response.');
        }

    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            console.error('❌ Connection Refused. Is the backend server running on port 5000?');
        } else {
            console.error('❌ Error:', error.message);
            if (error.response) {
                console.error('Status:', error.response.status);
                console.error('Data:', error.response.data);
            }
        }
    }
}

testUpload();
