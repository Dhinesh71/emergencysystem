const fs = require('fs');
const path = require('path');

const PORT = 4567; // Using a less common port

console.log(`\n🔧 Updating all files to use PORT ${PORT}...\n`);

// Files to update
const files = [
    { file: 'src/server.js', pattern: /const PORT = process\.env\.PORT \|\| \d+;/, replacement: `const PORT = process.env.PORT || ${PORT};` },
    { file: '../frontend/src/api/accident.api.js', pattern: /localhost:\d+/, replacement: `localhost:${PORT}` },
    { file: '../frontend/src/components/AccidentCard.jsx', pattern: /localhost:\d+/g, replacement: `localhost:${PORT}` },
    { file: '../frontend/src/pages/AccidentDetail.jsx', pattern: /localhost:\d+/g, replacement: `localhost:${PORT}` },
    { file: 'test-upload.js', pattern: /localhost:\d+/g, replacement: `localhost:${PORT}` }
];

files.forEach(({ file, pattern, replacement }) => {
    const filePath = path.join(__dirname, file);
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        content = content.replace(pattern, replacement);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Updated: ${file}`);
    } catch (err) {
        console.error(`❌ Failed to update ${file}:`, err.message);
    }
});

console.log(`\n✅ All files updated to port ${PORT}!`);
console.log(`\n📝 Hardware should POST to: http://localhost:${PORT}/api/accidents\n`);
