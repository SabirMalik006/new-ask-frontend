const fs = require('fs');
const path = require('path');

const videoDir = path.resolve(__dirname, '../videos');

console.log(`Checking local videos in folder: ${videoDir}`);
if (!fs.existsSync(videoDir)) {
  console.error('❌ Videos folder does not exist!');
  process.exit(1);
}

const files = fs.readdirSync(videoDir);
console.log(`Found ${files.length} total files in videos folder.`);

// Let's filter out only mp4 and mov files
const videoFiles = files.filter(f => f.match(/\.(mp4|mov)$/i));
console.log(`Found ${videoFiles.length} video files (mp4/mov).`);

const missing = [];
for (let i = 1; i <= 41; i++) {
  // Check standard names
  const ext = (i === 40) ? 'mov' : 'mp4';
  const name1 = `video ${i}.${ext}`;
  const name2 = `video ${i}.${ext.toUpperCase()}`;
  const name = files.includes(name1) ? name1 : (files.includes(name2) ? name2 : null);
  
  if (name) {
    const sizeMB = (fs.statSync(path.join(videoDir, name)).size / (1024 * 1024)).toFixed(2);
    console.log(`- ${name} (${sizeMB} MB)`);
  } else {
    // Only flag as missing if it's referenced in the HTML
    // Wait, let's see which indices are not in the HTML list
    // HTML has: 1-5, 18, 30, 8, 36-39, 40(mov), 41, 9-10, 26, 28, 27, 31, 33, 32, 17, 15, 19-25, 11, 13, 12, 6-7, 16, 29.
    missing.push(`video ${i}`);
  }
}

console.log('\nChecking dynamic numbered duplicates:');
// Check video 34 (1) through (14)
for (let i = 1; i <= 14; i++) {
  const name = `video 34 (${i}).mp4`;
  if (files.includes(name)) {
    console.log(`- ${name} found.`);
  } else {
    console.warn(`❌ ${name} NOT found.`);
  }
}
// Check video 35 (1) through (7)
for (let i = 1; i <= 7; i++) {
  const name = `video 35 (${i}).mp4`;
  if (files.includes(name)) {
    console.log(`- ${name} found.`);
  } else {
    console.warn(`❌ ${name} NOT found.`);
  }
}
