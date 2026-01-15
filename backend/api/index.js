const app = require('../src/app');

// CRITICAL: Disable Vercel's default body parser so Multer can parse files
module.exports = app;
module.exports.config = {
    api: {
        bodyParser: false,
    },
};
