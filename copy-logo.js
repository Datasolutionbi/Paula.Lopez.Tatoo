import fs from 'fs';
import path from 'path';

const src = '/home/Docs01/ProjectsGem/Tattocaro/docs/paula lopez.png';
const dest = '/home/Docs01/ProjectsGem/Tattocaro/public/logo-paula.png';

try {
    fs.copyFileSync(src, dest);
    console.log('Logo copied successfully to ' + dest);
} catch (err) {
    console.error('Error copying logo:', err);
    process.exit(1);
}
