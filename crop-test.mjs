import sharp from 'sharp';
import { readdirSync } from 'node:fs';
const DIR = 'public/assets/guests';
const OUT = '/private/tmp/claude-502/-Users-kannosatoshi-Desktop----2026/48720293-3ce7-46c5-a574-1231b97264cd/scratchpad';

const names = readdirSync(DIR).filter(f => f.endsWith('.webp')).sort();

// 各画像の「実際に絵が描かれている範囲」を調べる
console.log('file'.padEnd(24), 'canvas'.padEnd(12), 'artwork(trim後)'.padEnd(16), '透明余白 上/左');
for (const f of names) {
  const src = `${DIR}/${f}`;
  const meta = await sharp(src).metadata();
  const { info } = await sharp(src).trim({ threshold: 1 }).toBuffer({ resolveWithObject: true });
  console.log(
    f.padEnd(24),
    `${meta.width}x${meta.height}`.padEnd(12),
    `${info.width}x${info.height}`.padEnd(16),
    `${-(info.trimOffsetTop ?? 0)}px / ${-(info.trimOffsetLeft ?? 0)}px`
  );
}

// 比較用コンタクトシートを2種つくる
const CELL = 260;
async function sheet(outName, mode) {
  const tiles = [];
  for (let i = 0; i < names.length; i++) {
    const src = `${DIR}/${names[i]}`;
    let img = sharp(src);
    if (mode === 'trim') img = sharp(await img.trim({ threshold: 1 }).toBuffer());
    const m = await img.metadata();
    // 正方形を「上端から」切り出す（現在のCSS object-position:top と同じ挙動）
    const side = Math.min(m.width, m.height);
    const buf = await img
      .extract({ left: Math.round((m.width - side) / 2), top: 0, width: side, height: side })
      .resize(CELL, CELL)
      .flatten({ background: '#7d0722' })
      .toBuffer();
    tiles.push({ input: buf, left: (i % 5) * CELL, top: Math.floor(i / 5) * CELL });
  }
  const rows = Math.ceil(names.length / 5);
  await sharp({ create: { width: CELL * 5, height: CELL * rows, channels: 3, background: '#4d0316' } })
    .composite(tiles).png().toFile(`${OUT}/${outName}`);
  console.log('\n→', outName);
}
await sheet('crop-now.png', 'raw');
await sheet('crop-trim.png', 'trim');
