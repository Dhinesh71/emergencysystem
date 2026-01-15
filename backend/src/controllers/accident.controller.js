const supabase = require('../utils/supabase');
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
            const timestamp = new Date().getTime();
            const filename = `accident_${timestamp}.jpg`;

            // 1. Upload to Supabase Storage
            const { data: storageData, error: storageError } = await supabase
                .storage
                .from('accidents')
                .upload(filename, imageBuffer, {
                    contentType: imageFile.mimetype || 'image/jpeg',
                    upsert: false
                });

            if (storageError) {
                console.error('❌ Storage Upload Error:', storageError);
                throw storageError;
            }

            // Get Public URL
            const { data: publicUrlData } = supabase
                .storage
                .from('accidents')
                .getPublicUrl(filename);

            const imageUrl = publicUrlData.publicUrl;

            // Extract fields
            const confidence = Array.isArray(fields.confidence) ? fields.confidence[0] : fields.confidence;
            const cameraId = Array.isArray(fields.cameraId) ? fields.cameraId[0] : fields.cameraId;
            const location = Array.isArray(fields.location) ? fields.location[0] : fields.location;
            const timeField = Array.isArray(fields.timestamp) ? fields.timestamp[0] : fields.timestamp;

            const newAccident = {
                id: timestamp.toString(),
                imageUrl: imageUrl, // URL from Supabase
                confidence: parseFloat(confidence) || 0,
                cameraId: cameraId || 'Unknown',
                location: location || 'Unknown',
                timestamp: timeField || new Date().toISOString(),
                createdAt: new Date().toISOString()
            };

            // 2. Insert into Supabase Table
            const { data: dbData, error: dbError } = await supabase
                .from('accidents')
                .insert([newAccident])
                .select();

            if (dbError) {
                console.error('❌ Database Insert Error:', dbError);
                throw dbError;
            }

            console.log('✅ Accident saved to Supabase:', newAccident.id);
            res.status(201).json({
                status: 'ok',
                message: 'Accident recorded successfully',
                url: imageUrl,
                ...newAccident
            });

        } catch (error) {
            console.error('❌ Error processing upload:', error);
            res.status(500).json({ message: 'Error processing upload', error: error.message });
        }
    });
};

// GET /api/accidents
exports.getAllAccidents = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('accidents')
            .select('*')
            .order('createdAt', { ascending: false });

        if (error) throw error;

        console.log(`📡 GET request - Returning ${data.length} accidents from Supabase`);
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching accidents:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// GET /api/accidents/:id
exports.getAccidentById = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('accidents')
            .select('*')
            .eq('id', req.params.id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') { // Not found code
                return res.status(404).json({ message: 'Accident not found' });
            }
            throw error;
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching accident:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
