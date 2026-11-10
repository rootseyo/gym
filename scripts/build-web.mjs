import { copyFile, mkdir, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputDirectory = resolve(projectRoot, 'dist');

if (dirname(outputDirectory) !== projectRoot) {
  throw new Error(`Unexpected output directory: ${outputDirectory}`);
}

const publicFiles = [
  'index.html',
  'weekly.html',
  'community.html',
  'ouwan-core.js',
  'ouwan.js',
  'ouwan.css',
  'routine-code.js',
  'nickname-samples.json',
  'community.css',
  'community.js',
  'community-auth.js',
  'community-import.js',
  'privacy.html',
  'terms.html',
  'app.js',
  'weekly.js',
  'equipment-encyclopedia.js',
  'routine-recommendations.js',
  'firebase-config.js',
  'firebase-sync.js',
  'kakao.min.js',
  'style.css',
  'weekly.css',
  'sw.js',
  'manifest.webmanifest',
  'favicon.png',
  'favicon.svg',
  'icon-192.png',
  'icon-512.png',
  'og-fittracker.png',
  'robots.txt',
  'sitemap.xml'
];

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

await Promise.all(publicFiles.map(file => (
  copyFile(resolve(projectRoot, file), resolve(outputDirectory, file))
)));

console.log(`Prepared ${publicFiles.length} public web assets in ${outputDirectory}`);
