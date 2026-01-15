const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const API_URL = 'http://localhost:4567/api/accidents';

async function testImageUpload() {
    console.log('\n🧪 TESTING IMAGE UPLOAD TO SERVER');
    console.log('===================================\n');

    // Create a simple test image (1x1 pixel PNG)
    const testImageBuffer = Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
        'base64'
    );

    const testImagePath = path.join(__dirname, 'test-image.png');
    fs.writeFileSync(testImagePath, testImageBuffer);
    console.log('✅ Created test image:', testImagePath);

    try {
        const formData = new FormData();
        formData.append('image', fs.createReadStream(testImagePath));
        formData.append('confidence', '95.5');
        formData.append('cameraId', 'TEST-CAM-01');
        formData.append('location', 'Test Location - Main Street');
        formData.append('timestamp', new Date().toISOString());

        console.log('\n📤 Sending POST request to:', API_URL);
        console.log('📦 Data being sent:');
        console.log('   - Image: test-image.png');
        console.log('   - Confidence: 95.5%');
        console.log('   - Camera: TEST-CAM-01');
        console.log('   - Location: Test Location - Main Street\n');

        const response = await axios.post(API_URL, formData, {
            headers: formData.getHeaders(),
        });

        console.log('✅ SUCCESS! Response:');
        console.log(JSON.stringify(response.data, null, 2));
        console.log('\n✅ Image URL:', `http://localhost:4567${response.data.imageUrl}`);

        // Clean up test image
        fs.unlinkSync(testImagePath);

        // Test GET endpoint
        console.log('\n\n🧪 TESTING GET ACCIDENTS');
        console.log('===================================\n');
        const getResponse = await axios.get(API_URL);
        console.log(`✅ Retrieved ${getResponse.data.length} accident(s)`);
        if (getResponse.data.length > 0) {
            console.log('\n📋 Latest accident:');
            console.log(JSON.stringify(getResponse.data[0], null, 2));
        }

    } catch (error) {
        console.error('\n❌ TEST FAILED!');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else if (error.request) {
            console.error('No response received. Is the server running?');
            console.error('Make sure the backend is started with: npm start');
        } else {
            console.error('Error:', error.message);
        }

        // Clean up test image even on error
        if (fs.existsSync(testImagePath)) {
            fs.unlinkSync(testImagePath);
        }
    }
}

// Check if server is running first
async function checkServer() {
    try {
        await axios.get('http://localhost:4567/health');
        console.log('✅ Server is running!\n');
        return true;
    } catch (error) {
        console.error('❌ Server is not running!');
        console.error('Please start the backend server first:');
        console.error('  cd backend');
        console.error('  npm start\n');
        return false;
    }
}

// Run the test
(async () => {
    const serverRunning = await checkServer();
    if (serverRunning) {
        await testImageUpload();
    }
})();
