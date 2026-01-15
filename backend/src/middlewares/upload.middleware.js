const multer = require('multer');

// Use Memory Storage for Vercel/Serverless
// The file is stored in memory as a Buffer (req.file.buffer)
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    }
});

module.exports = upload;
