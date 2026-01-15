const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

async function testUpload() {
    try {
        // Create a dummy image if it doesn't exist
        const dummyPath = path.join(__dirname, 'test_image.jpg');
        if (!fs.existsSync(dummyPath)) {
            fs.writeFileSync(dummyPath, 'fake image content');
        }

        const form = new FormData();
        form.append('image', fs.createReadStream(dummyPath));
        form.append('confidence', '85.5');
        form.append('cameraId', 'CAM-01');
        form.append('location', 'Test Location');

        console.log('🚀 Sending upload request to localhost...');

        const response = await axios.post('http://127.0.0.1:4000/api/accidents', form, {
            headers: {
                ...form.getHeaders()
            }
        });

        console.log('✅ Response Status:', response.status);
        console.log('✅ Response Data:', response.data);

        if (response.data.url) {
            console.log('🎉 SUCCESS: Returned URL:', response.data.url);
        } else {
            console.error('❌ FAILURE: No URL returned in response');
        }

    } catch (error) {
        console.error('❌ Error testing upload:', error.message);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', JSON.stringify(error.response.data, null, 2));
        } else if (error.request) {
            console.error('No response received (Is the server running?)');
        } else {
            console.error('Request setup error:', error.message);
        }
    }
}

testUpload();
