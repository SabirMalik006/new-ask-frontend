const fs = require('fs');
const path = require('path');

const imgDir = path.resolve(__dirname, '../img');

const imagesToCheck = [
  'ims-collage (1).png',
  'ims-collage (2).png',
  'Hrms-collage (1).png',
  'Hrms-collage (2).png',
  'gowithhajj-collage (1).png',
  'gowithhajj-collage (2).png',
  'logo-collage (1).png',
  'logo-collage (2).png',
  'bfonic-collage (1).png',
  'bfonic-collage (2).png',
  'asfa-collage  (1).png',
  'asfa-collage  (2).png',
  'citylab-collage (1).png',
  'citylab-collage (2).png'
];

console.log(`Checking local images in folder: ${imgDir}`);
imagesToCheck.forEach(imgName => {
  const fullPath = path.join(imgDir, imgName);
  if (fs.existsSync(fullPath)) {
    console.log(`✅ FOUND: "${imgName}" (${fs.statSync(fullPath).size} bytes)`);
  } else {
    console.warn(`❌ NOT FOUND: "${imgName}"`);
  }
});
