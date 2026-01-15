const { accidents } = require('../models/accident.model');

// POST /api/accidents
const formidable = require('formidable');
const fs = require('fs');

// POST /api/accidents
exports.createAccident = async (req, res) => {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error('❌ Form parse error:', err);
            return res.status(500).json({ error: 'Form parse failed' });
        }

        // Handle case where files.image might be an array or single object
        const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;

        if (!imageFile) {
            return res.status(400).json({ message: 'No image file received' });
        }

        try {
            // Read file from temporary path
            const imageBuffer = fs.readFileSync(imageFile.filepath);
            const b64 = imageBuffer.toString('base64');
            const mimetype = imageFile.mimetype || 'image/jpeg';
            const dataURI = `data:${mimetype};base64,${b64}`;

            // Extract fields (formidable puts them in arrays usually)
            const confidence = Array.isArray(fields.confidence) ? fields.confidence[0] : fields.confidence;
            const cameraId = Array.isArray(fields.cameraId) ? fields.cameraId[0] : fields.cameraId;
            const location = Array.isArray(fields.location) ? fields.location[0] : fields.location;
            const timestamp = Array.isArray(fields.timestamp) ? fields.timestamp[0] : fields.timestamp;

            const newAccident = {
                id: Date.now().toString(),
                imageUrl: dataURI,
                confidence: parseFloat(confidence) || 0,
                cameraId: cameraId || 'Unknown',
                location: location || 'Unknown',
                timestamp: timestamp || new Date().toISOString(),
                createdAt: new Date().toISOString()
            };

            accidents.unshift(newAccident);
            if (accidents.length > 100) accidents.pop();

            console.log('✅ Accident processed via Formidable');
            res.status(201).json({
                status: 'ok',
                message: 'Accident image received',
                url: dataURI, // Alias for hardware side
                ...newAccident
            });
        } catch (error) {
            console.error('❌ Error processing file:', error);
            res.status(500).json({ message: 'Error processing upload' });
        }
    });
};

// GET /api/accidents
exports.getAllAccidents = (req, res) => {
    try {
        console.log(`📡 GET request - Returning ${accidents.length} accidents`);
        res.status(200).json(accidents);
    } catch (error) {
        console.error('Error fetching accidents:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// GET /api/accidents/:id
exports.getAccidentById = (req, res) => {
    try {
        const accident = accidents.find(a => a.id === req.params.id);
        if (!accident) {
            return res.status(404).json({ message: 'Accident not found' });
        }
        res.status(200).json(accident);
    } catch (error) {
        console.error('Error fetching accident:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
