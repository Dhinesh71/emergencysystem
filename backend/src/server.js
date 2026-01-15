const app = require('./app');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 4567;

// Ensure uploads directory exists on startup
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log('Created uploads directory');
}

app.listen(PORT, () => {
    console.log('\n╔════════════════════════════════════════════════════════╗');
    console.log('║   🚨 EMERGENCY ACCIDENT DETECTION SYSTEM 🚨          ║');
    console.log('╚════════════════════════════════════════════════════════╝');
    console.log(`\n✅ Server running on port ${PORT}`);
    console.log(`📍 API Endpoints:`);
    console.log(`   POST http://localhost:${PORT}/api/accidents`);
    console.log(`   GET  http://localhost:${PORT}/api/accidents`);
    console.log(`   GET  http://localhost:${PORT}/api/accidents/:id`);
    console.log(`\n📁 Uploads folder: ${uploadDir}`);
    console.log(`🖼️  Static images: http://localhost:${PORT}/uploads/`);
    console.log(`\n⏰ Started at: ${new Date().toLocaleString()}`);
    console.log('🔄 Waiting for hardware data...\n');
});
