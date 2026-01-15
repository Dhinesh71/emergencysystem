const { accidents } = require('../models/accident.model');

// POST /api/accidents
exports.createAccident = (req, res) => {
    console.log('\n========================================');
    console.log('🚨 NEW ACCIDENT REPORT RECEIVED');
    console.log('========================================');
    console.log('⏰ Time:', new Date().toISOString());
    console.log('📦 Request Body:', req.body);
    console.log('📁 File Info:', req.file ? {
        filename: req.file.filename,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path
    } : 'NO FILE RECEIVED');

    try {
        if (!req.file) {
            console.log('❌ ERROR: No image file in request');
            return res.status(400).json({ message: 'Image file is required' });
        }

        const { confidence, cameraId, location, timestamp } = req.body;

        // Convert buffer to base64
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const dataURI = `data:${req.file.mimetype};base64,${b64}`;

        const newAccident = {
            id: Date.now().toString(), // Simple ID generation
            imageUrl: dataURI, // Store the actual image data
            confidence: parseFloat(confidence) || 0,
            cameraId: cameraId || 'Unknown',
            location: location || 'Unknown',
            timestamp: timestamp || new Date().toISOString(),
            createdAt: new Date().toISOString()
        };

        // Add to beginning of array (newest first)
        accidents.unshift(newAccident);

        // Keep only last 100 accidents to prevent memory overflow (optional safety)
        if (accidents.length > 100) {
            accidents.pop();
        }

        console.log('✅ Accident stored successfully!');
        console.log('📊 Accident Data:', newAccident);
        console.log('📈 Total accidents in memory:', accidents.length);
        console.log('========================================\n');

        res.status(201).json(newAccident);
    } catch (error) {
        console.error('❌ ERROR creating accident:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
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
