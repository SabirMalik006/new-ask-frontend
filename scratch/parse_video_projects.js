const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../video-project-details.html');
const content = fs.readFileSync(filePath, 'utf-8');

// We want to find all occurrences of: <source type="video/mp4" src="..." or similar
const regex = /<source\s+type="video\/mp4"\s+src="([^"]+)"/gi;
let match;
const sources = [];

while ((match = regex.exec(content)) !== null) {
  // Skip the menu video if it's there
  if (match[1].includes('menu video')) continue;
  sources.push(match[1]);
}

console.log(`Total video clips found: ${sources.length}`);
console.log('List of video file paths:');
sources.forEach((src, idx) => {
  console.log(`${idx + 1}. ${src}`);
});

// Let's also check for poster images
const posterRegex = /<video[^>]*poster="([^"]+)"/gi;
const posters = [];
while ((match = posterRegex.exec(content)) !== null) {
  if (match[1].includes('dummyimage.com')) continue; // Skip dummy placeholders if any
  posters.push(match[1]);
}
console.log(`\nFound poster images (non-dummy):`, posters);

// Also look at the metadata header in the file:
const clientRegex = /Client<\/p>\s*<p class="mxd-data-list__content">([^<]+)/i;
const servicesRegex = /Services<\/p>\s*<p class="mxd-data-list__content">([^<]+)/i;
const platformsRegex = /Platforms<\/p>\s*<p class="mxd-data-list__content">([^<]+)/i;
const specializationRegex = /Specialization<\/p>\s*<p class="mxd-data-list__content">([^<]+)/i;
const serviceListRegex = /Services list<\/p>\s*<p class="mxd-data-list__content">([^<]+)/i;

console.log('\nMetadata details:');
console.log('Client match:', content.match(clientRegex)?.[1]?.trim());
console.log('Services match:', content.match(servicesRegex)?.[1]?.trim());
console.log('Platforms match:', content.match(platformsRegex)?.[1]?.trim());
console.log('Specialization match:', content.match(specializationRegex)?.[1]?.trim());
console.log('Services list match:', content.match(serviceListRegex)?.[1]?.trim());
