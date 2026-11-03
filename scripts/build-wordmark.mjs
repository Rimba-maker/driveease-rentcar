// Builds public/wordmark.svg: DRIVEEASE as nine solid blocks of different heights,
// each letter knocked out in the page colour. Glyph outlines come from the self-hosted Jost 700 (opentype.js).
import opentype from 'opentype.js';
import { readFile, writeFile } from 'node:fs/promises';

const buf = await readFile('node_modules/@fontsource/jost/files/jost-latin-700-normal.woff');
const font = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
const word = 'DRIVEEASE'.split('');
const heights = [1, 0.82, 0.94, 0.76, 0.88, 1, 0.78, 0.92, 0.74];
const fills = ['#d92b21', '#000000', '#8a8a8a', '#d92b21', '#000000', '#8a8a8a', '#d92b21', '#000000', '#8a8a8a'];
const W = 1400, H = 300, GAP = 4;
const bw = (W - GAP * (word.length - 1)) / word.length;

let out = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="DriveEase">`;
word.forEach((ch, i) => {
  const h = H * heights[i];
  const x = i * (bw + GAP);
  const y = H - h;
  out += `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${bw.toFixed(2)}" height="${h.toFixed(2)}" fill="${fills[i]}"/>`;
  // size the glyph to ~72% of the block width, sit it on the block's floor
  const probe = font.getPath(ch, 0, 0, 100);
  const bb = probe.getBoundingBox();
  const scale = Math.min((bw * 0.72) / (bb.x2 - bb.x1), (h * 0.62) / (bb.y2 - bb.y1)) * 100;
  const p = font.getPath(ch, 0, 0, scale);
  const b = p.getBoundingBox();
  const gx = x + (bw - (b.x2 - b.x1)) / 2 - b.x1;
  const gy = H - 18 - b.y2;
  out += `<path transform="translate(${gx.toFixed(2)} ${gy.toFixed(2)})" d="${p.toPathData(2)}" fill="#ffffff"/>`;
});
out += '</svg>\n';
await writeFile('public/wordmark.svg', out);
console.log('wordmark.svg', out.length, 'bytes');
