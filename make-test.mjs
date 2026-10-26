import fs from 'fs';
const p1b64 = fs.readFileSync('page1-bg.jfif').toString('base64');
const p2b64 = fs.readFileSync('page2-bg.jfif').toString('base64');
const html = `<!DOCTYPE html><html><body style="margin:0;display:flex;"><img src="data:image/jpeg;base64,${p1b64}" style="width:50vw;" /><img src="data:image/jpeg;base64,${p2b64}" style="width:50vw;" /></body></html>`;
fs.writeFileSync('test-bg.html', html);
console.log('test-bg.html created successfully');
