// Build-time image pipeline (sharp): public/img/src/*.jpg -> public/img/<name>.webp (1600w) + <name>-sm.webp (800w).
import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';
import { join, parse } from 'node:path';

const SRC = 'public/img/src';
const OUT = 'public/img';
await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png)$/i.test(f));
for (const f of files) {
  const { name } = parse(f);
  const img = sharp(join(SRC, f), { failOn: 'none' }).rotate();
  const big = name.startsWith('lot-mosaic') ? 2000 : 1600;
  await img.clone().resize({ width: big, height: big, fit: 'inside', withoutEnlargement: true }).webp({ quality: 76, effort: 5 }).toFile(join(OUT, `${name}.webp`));
  await img.clone().resize({ width: 800, height: 800, fit: 'inside', withoutEnlargement: true }).webp({ quality: 72, effort: 5 }).toFile(join(OUT, `${name}-sm.webp`));
}
console.log(`optimised ${files.length} images`);
