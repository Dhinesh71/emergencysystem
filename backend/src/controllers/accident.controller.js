const supabase = require('../utils/supabase');

// POST /api/accidents
exports.createAccident = async (req, res) => {
    try {
        console.log('🔍 [DEBUG] POST /api/accidents hit');
        console.log('🔍 [DEBUG] Headers:', JSON.stringify(req.headers, null, 2));

        // Multer puts the file in req.file and fields in req.body
        const imageFile = req.file;
        const fields = req.body;

        console.log('🔍 [DEBUG] req.file:', imageFile ? 'Found' : 'Missing');
        console.log('🔍 [DEBUG] req.body:', JSON.stringify(fields, null, 2));

        if (!imageFile) {
            console.error('❌ No image file found in req.file');
            return res.status(400).json({
                message: 'No image file received',
                detail: 'Ensure form-data key is "image"'
            });
        }

        const timestamp = new Date().getTime();
        // Use original name or fallback
        const originalExt = imageFile.originalname ? imageFile.originalname.split('.').pop() : 'jpg';
        const filename = `accident_${timestamp}.${originalExt}`;

        // 1. Upload to Supabase Storage
        // req.file.buffer contains the file data in memory
        const { data: storageData, error: storageError } = await supabase
            .storage
            .from('accidents')
            .upload(filename, imageFile.buffer, {
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
        const confidence = fields.confidence;
        const cameraId = fields.cameraId;
        const location = fields.location;
        const timeField = fields.timestamp;

        const newAccident = {
            id: timestamp.toString(),
            imageUrl: imageUrl,
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
