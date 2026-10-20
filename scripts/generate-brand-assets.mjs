// Render the existing Blackout logo into standard web metadata formats.
// No generated artwork or external assets: the source logo is unchanged.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createElement as h } from 'react';
import { ImageResponse } from 'next/og.js';

const root = new URL('../', import.meta.url);
const logo = `data:image/png;base64,${(await readFile(new URL('public/logo-transparent.png', root))).toString('base64')}`;
const font = await readFile(new URL('public/fonts/inter-600.ttf', root));
const directory = new URL('public/brand/', root);
await mkdir(directory, { recursive: true });

async function render(element, width, height) {
  const response = new ImageResponse(element, {
    width, height,
    fonts: [{ name: 'Inter', data: font, weight: 600, style: 'normal' }],
  });
  return Buffer.from(await response.arrayBuffer());
}

async function icon(size) {
  return render(h('div', { style: {
    display: 'flex', width: '100%', height: '100%',
    alignItems: 'center', justifyContent: 'center', backgroundColor: '#080a0c',
  } }, h('img', { src: logo, width: size, height: size * 682 / 1024 })), size, size);
}

for (const size of [180, 192, 512]) {
  await writeFile(new URL(`blackout-${size}.png`, directory), await icon(size));
}

// Standard ICO directory with square PNG entries for browser compatibility.
const sizes = [16, 32, 48, 256];
const images = [];
for (const size of sizes) images.push(await icon(size));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((size, i) => {
  const entry = 6 + 16 * i;
  header[entry] = size === 256 ? 0 : size;
  header[entry + 1] = size === 256 ? 0 : size;
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(images[i].length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += images[i].length;
});
await writeFile(new URL('src/app/favicon.ico', root), Buffer.concat([header, ...images]));

const social = h('div', { style: {
  display: 'flex', flexDirection: 'column', alignItems: 'center',
  justifyContent: 'center', width: '100%', height: '100%',
  backgroundColor: '#080a0c', color: '#d5bb87', fontFamily: 'Inter',
} },
  h('div', { style: { display: 'flex', position: 'absolute', top: 24, bottom: 24, left: 24, right: 24, border: '1px solid #554431' } }),
  h('img', { src: logo, width: 730, height: 730 * 682 / 1024 }),
  h('div', { style: { display: 'flex', fontSize: 21, letterSpacing: 3, marginTop: 3 } }, 'WOTLK 3.3.5a · LEVEL 255 · HIGH RATE'),
  h('div', { style: { display: 'flex', fontSize: 15, letterSpacing: 4, marginTop: 22, color: '#93908a' } }, 'BLACKOUT-WOW.COM'),
);
await writeFile(new URL('blackout-social.png', directory), await render(social, 1200, 630));
console.log(`Brand assets rendered from the original logo: ${fileURLToPath(directory)}`);
