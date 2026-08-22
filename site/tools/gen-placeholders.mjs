/* ===========================================================================
   プレースホルダー画像ジェネレータ
   アイコン・ロゴ画像が未入稿の枠に、デザインテーマに沿ったSVGを生成します。
   本番画像を入れる際は public/assets/ 配下の同名ファイルを差し替えるか、
   src/data/*.ts の image: を新しいファイル名に書き換えてください。

     node tools/gen-placeholders.mjs          既存ファイルは上書きしない
     node tools/gen-placeholders.mjs --force  すべて再生成
   =========================================================================== */
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const FORCE = process.argv.includes('--force');

const PALETTES = [
  ['#c8103c', '#7d0722'],
  ['#0e7c6e', '#0a4d44'],
  ['#a30a2e', '#5c0518'],
  ['#2aa595', '#0e6459'],
  ['#f0546a', '#a30a2e'],
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** 名前の頭文字（記号・様を除いた1文字） */
function initial(name) {
  const cleaned = name.replace(/様$/, '').replace(/プロ$/, '').trim();
  return [...cleaned][0] ?? '?';
}

function hash(s) {
  let h = 0;
  for (const ch of s) h = (h * 31 + ch.codePointAt(0)) >>> 0;
  return h;
}

/** 正方形アイコン（人物用） */
function avatarSvg(name) {
  const [c1, c2] = PALETTES[hash(name) % PALETTES.length];
  const ch = esc(initial(name));
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400" role="img" aria-label="${esc(name)}">
  <defs>
    <radialGradient id="bg" cx="50%" cy="34%" r="78%">
      <stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/>
    </radialGradient>
    <pattern id="key" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M8 8h24v24H20V20h-6v18H8z" fill="none" stroke="#f2d89b" stroke-width="2" opacity=".14"/>
    </pattern>
  </defs>
  <rect width="400" height="400" fill="url(#bg)"/>
  <rect width="400" height="400" fill="url(#key)"/>
  <circle cx="200" cy="196" r="118" fill="none" stroke="#d9a441" stroke-width="2" opacity=".85"/>
  <circle cx="200" cy="196" r="106" fill="rgba(45,2,12,.34)" stroke="#f2d89b" stroke-width="1" opacity=".9"/>
  <text x="200" y="196" fill="#fbf3e2" font-size="128" font-weight="700" text-anchor="middle" dominant-baseline="central"
        font-family="'Shippori Mincho B1','Hiragino Mincho ProN','Yu Mincho',serif">${ch}</text>
  <g fill="#fff6f1" opacity=".9">
    <g transform="translate(330,72) scale(.9)">
      ${[0, 1, 2, 3, 4].map((i) => `<ellipse cx="0" cy="-14" rx="8" ry="12" transform="rotate(${i * 72})"/>`).join('')}
      <circle r="6" fill="#ffd9c9"/>
    </g>
    <g transform="translate(66,332) scale(.68)">
      ${[0, 1, 2, 3, 4].map((i) => `<ellipse cx="0" cy="-14" rx="8" ry="12" transform="rotate(${i * 72})"/>`).join('')}
      <circle r="6" fill="#ffd9c9"/>
    </g>
  </g>
  <text x="200" y="366" fill="#f2d89b" font-size="19" letter-spacing="3" text-anchor="middle" opacity=".72"
        font-family="'Zen Kaku Gothic New','Hiragino Sans',sans-serif">${esc(name)}</text>
</svg>
`;
}

/** 横長ロゴ枠（企業協賛用） */
function logoSvg(name) {
  const label = esc(name.replace(/様$/, ''));
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 240" width="480" height="240" role="img" aria-label="${esc(name)}">
  <rect width="480" height="240" fill="#fbf3e2"/>
  <rect x="10" y="10" width="460" height="220" fill="none" stroke="#d9a441" stroke-width="2"/>
  <rect x="18" y="18" width="444" height="204" fill="none" stroke="#d9a441" stroke-width="1" opacity=".5"/>
  <g stroke="#c8103c" stroke-width="3" fill="none" opacity=".55">
    <path d="M30 30h26v26"/><path d="M450 30h-26v26"/><path d="M30 210h26v-26"/><path d="M450 210h-26v-26"/>
  </g>
  <text x="240" y="112" fill="#5a2b24" font-size="30" font-weight="700" text-anchor="middle" dominant-baseline="central"
        font-family="'Shippori Mincho B1','Hiragino Mincho ProN','Yu Mincho',serif">${label}</text>
  <text x="240" y="160" fill="#0e7c6e" font-size="15" letter-spacing="4" text-anchor="middle"
        font-family="'Zen Kaku Gothic New','Hiragino Sans',sans-serif">LOGO PLACEHOLDER</text>
</svg>
`;
}

/** ファビコン */
function faviconSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="10" fill="#c8103c"/>
  <rect x="14" y="9" width="36" height="46" rx="6" fill="#fbf3e2" stroke="#0e7c6e" stroke-width="2.5"/>
  <text x="32" y="34" fill="#c8103c" font-size="30" font-weight="700" text-anchor="middle" dominant-baseline="central"
        font-family="'Shippori Mincho B1','Hiragino Mincho ProN',serif">明</text>
</svg>
`;
}

function write(relPath, content) {
  const abs = join(ROOT, relPath);
  mkdirSync(dirname(abs), { recursive: true });
  if (!FORCE && existsSync(abs)) {
    console.log(`skip   ${relPath}`);
    return;
  }
  writeFileSync(abs, content, 'utf8');
  console.log(`write  ${relPath}`);
}

/* ---------------- 生成対象 ---------------- */
const GUESTS = [
  ['akedo-ena.svg', '明戸えな'],
  ['oshitara-ataru.svg', 'おしたらあたる'],
  ['hosoya-takuma.svg', '細谷拓真'],
  ['nishino-ururi.svg', '西乃うるり'],
  ['chigo.svg', '稚児'],
  ['takeoshan.svg', 'タケオしゃん'],
  ['hinano-chino.svg', '雛呑ちの'],
  ['yuntyuru.svg', 'ゆんちゅる'],
  ['holy-night-snow.svg', '聖夜ノ雪'],
  ['yamato-chitose.svg', '大和ちとせ'],
  ['akarun.svg', 'あかるん'],
  ['kyomuneko.svg', '虚無ねこ'],
  ['momonoki-kanari.svg', '百軒カナリ'],
  ['ukuna.svg', 'うくな'],
];

const CREATORS = [
  ['153day.svg', '153day'],
  ['mochizuki-nagumo.svg', '望月南雲'],
  ['sakura-secho.svg', '桜せちょ'],
  ['ginka.svg', '銀貨先生'],
];

const SPONSORS = [
  ['3r.svg', 'スリーアール株式会社'],
  ['kimura-shuzo.svg', '株式会社木村酒造'],
  ['uzakushiki.svg', 'ウザク式'],
  ['okuyama-shoten.svg', '合資会社奥山商店'],
  ['lien.svg', 'online pâtisserie Lien'],
  ['men-hyakushiki.svg', '麺百式'],
  ['merrypamerry.svg', 'めりぃぱめりぃ'],
];

for (const [file, name] of GUESTS) write(`public/assets/guests/${file}`, avatarSvg(name));
for (const [file, name] of CREATORS) write(`public/assets/creators/${file}`, avatarSvg(name));
for (const [file, name] of SPONSORS) write(`public/assets/sponsors/${file}`, logoSvg(name));
write('public/favicon.svg', faviconSvg());

console.log('\n完了。本番画像は同名ファイルで上書きしてください。');
