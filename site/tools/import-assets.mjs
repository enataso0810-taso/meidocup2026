/* ===========================================================================
   素材フォルダ → site/public/assets/ 取り込みスクリプト

   ・元ファイル名（日本語・記号あり）を Web 用の半角英数名にリネームして配置
   ・Web 表示に必要なサイズへ縮小し、WebP / JPEG に変換して軽量化
   ・リネーム対照表を public/assets/RENAME.md に自動生成

     node tools/import-assets.mjs                    （既定の素材フォルダを探す）
     node tools/import-assets.mjs "../素材フォルダ"   （パス指定）
   =========================================================================== */
import { readdirSync, existsSync, mkdirSync, writeFileSync, statSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const SITE = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const REPO = resolve(SITE, '..');
const DST = join(SITE, 'public', 'assets');

const SRC = resolve(
  process.argv[2] ??
    join(REPO, readdirSync(REPO).find((d) => d.startsWith('素材') && statSync(join(REPO, d)).isDirectory()) ?? '素材フォルダ')
);

if (!existsSync(SRC)) {
  console.error(`素材フォルダが見つかりません: ${SRC}`);
  process.exit(1);
}

/* ---------------------------------------------------------------------------
   取り込み定義
     from   : 素材フォルダからの相対パス
     to     : public/assets/ からの相対パス（＝サイト上のファイル名）
     w      : 最大幅（省略時は縮小しない）。元画像より大きい場合は拡大しない
     use    : 対照表に載せる用途
   ------------------------------------------------------------------------- */
const JOBS = [
  ['── ロゴ・背景'],
  ['デザイン周り/公式ロゴデータ/大会公式ロゴ.png',                     'logo/logo-main.webp',        1000, '大会公式ロゴ（縦型・ヒーロー/フッター）'],
  ['デザイン周り/公式ロゴデータ/明戸えな様_明戸杯ロゴ_横型.png',        'logo/logo-horizontal.webp',  1200, '大会公式ロゴ（横型・ヘッダー）'],
  ['デザイン周り/素材パーツ分け/協賛画像_パーツ分け/背景.jpg',          'bg/pattern-crimson.jpg',     1280, 'サイト全体の背景パターン'],
  ['デザイン周り/素材パーツ分け/協賛画像_パーツ分け/フレーム.png',      'parts/frame-gold.webp',      1400, '金枠フレーム（予備）'],

  ['── ミニキャラ（SD）'],
  ['大会キービジュアル/ena-sd.png',        'characters/ena-sd.webp',     500, '明戸えな ミニキャラ（スケジュール左上）'],
  ['大会キービジュアル/atarusd2.png',      'characters/ataru-sd.webp',   500, 'おしたらあたる ミニキャラ（スケジュール右下）'],



  ['── クリエイター・大会サポートスタッフ'],
  ['クリエイター様アイコン画像/153day様.jpg', 'creators/153day.webp',           400, '153day様 アイコン'],
  ['クリエイター様アイコン画像/望月南雲様',   'creators/mochizuki-nagumo.webp', 400, '望月南雲様 アイコン'],
  ['クリエイター様アイコン画像/桜せちょ様',   'creators/sakura-secho.webp',     400, '桜せちょ様 アイコン'],
  ['クリエイター様アイコン画像/銀貨先生様',   'creators/ginka.webp',            400, '銀貨先生様 アイコン'],
  ['クリエイター様アイコン画像/射銀光展様',   'creators/igin-mitsuhiro.webp',   400, '射銀光展様 アイコン（モデレーター）'],
  ['クリエイター様アイコン画像/ネムメル様',   'creators/nemumeru.webp',         400, 'ネムメル様 アイコン（モデレーター）'],

  ['── 企業ロゴ'],
  ['企業協賛/スリーアール株式会社様/01_ロゴ/AGRelux_logo_黒_透過.png', 'sponsors/3r.webp',             560, 'AGRelux ロゴ'],
  ['企業協賛/スリーアール株式会社様/03_ZONIQ/ZONIQ_logo_カラー.png',   'sponsors/zoniq.webp',          400, 'ZONIQ ロゴ'],
  ['企業協賛/木村酒造様/株式会社木村酒造様ロゴ.jpe',                  'sponsors/kimura-shuzo.webp',   560, '株式会社木村酒造様 ロゴ'],
  ['企業協賛/合同会社ウザク式様/-logo.png',                           'sponsors/uzakushiki.webp',     560, 'ウザク式様 ロゴ'],
  ['企業協賛/合資会社奥山商店様/企業ロゴ.png',                        'sponsors/okuyama-shoten.webp', 560, '合資会社奥山商店様 ロゴ'],
  ['企業協賛/online pâtisserie Lien様/ロゴ.png',                      'sponsors/lien.webp',           560, 'online pâtisserie Lien様 ロゴ'],
  ['企業協賛/めりぃぱめりぃ様/ぱめりシンボルロゴ3.png',                'sponsors/merrypamerry.webp',   560, 'めりぃぱめりぃ様 ロゴ'],
  ['企業協賛/麺百式様/phonto.jpeg',                                   'sponsors/men-hyakushiki.webp', 560, '沼津麺百式様 バナー（ロゴ未入稿のため代用）'],

  ['── トロフィーアクリルキーホルダー（1〜3位）'],
  ['トロフィーデータ/trophy-gold.png',   'prizes/trophy-gold.webp',   620, 'トロフィーアクキー 金（1位）'],
  ['トロフィーデータ/trophy-silver.png', 'prizes/trophy-silver.webp', 620, 'トロフィーアクキー 銀（2位）'],
  ['トロフィーデータ/trophy-bronze.png', 'prizes/trophy-bronze.webp', 620, 'トロフィーアクキー 銅（3位）'],

  ['── エキシビジョンマッチ'],
  ['エキシビジョンマッチ/山本の米/山本の米イメージ写真.png', 'prizes/yamamoto-rice.webp',     760, '山本の米 新米10kg 賞品画像'],
  ['エキシビジョンマッチ/山本の米/山本さん立ち絵.png',       'exhibition/yamamoto-san.webp',  620, '山本さん 立ち絵'],

  ['── 協賛紹介画像（賞品カード）'],
  ['デザイン周り/協賛紹介画像/協賛紹介_企業_1位_スリーアール株式会社様.jpg',     'prizes/rank01-3r-agrelux.webp',        1400, '1位 賞品紹介'],
  ['デザイン周り/協賛紹介画像/協賛紹介_企業_2位_株式会社木村酒造様.jpg',         'prizes/rank02-kimura-shuzo.webp',      1400, '2位 賞品紹介'],
  ['デザイン周り/協賛紹介画像/協賛紹介_企業_3位_合同会社ウザク式様.jpg',         'prizes/rank03-uzakushiki.webp',        1400, '3位 賞品紹介'],
  ['デザイン周り/協賛紹介画像/協賛紹介_企業_4位_合資会社奥山商店様.jpg',         'prizes/rank04-okuyama-shoten.webp',    1400, '4位 賞品紹介'],
  ['デザイン周り/協賛紹介画像/協賛紹介_企業_5位_online pâtisserie Lien様.jpg',   'prizes/rank05-lien.webp',              1400, '5位 賞品紹介'],
  ['デザイン周り/協賛紹介画像/協賛紹介_企業_6〜7位_沼津麺百式様.jpg',            'prizes/rank06-07-men-hyakushiki.webp', 1400, '6〜7位 賞品紹介'],
  ['デザイン周り/協賛紹介画像/協賛紹介_個人_8位_麻雀雑貨Lemo様',                 'prizes/rank08-lemo.webp',              1400, '8位 賞品紹介'],
  ['デザイン周り/協賛紹介画像/協賛紹介_企業_９〜10位_めりぃぱめりぃ様.jpg',       'prizes/rank09-10-merrypamerry.webp',   1400, '9〜10位 賞品紹介'],
  ['デザイン周り/協賛紹介画像/協賛紹介_企業_特別賞_スリーアール株式会社様.jpg',   'prizes/special-3r-zoniq.webp',         1400, '集中してたで賞 紹介'],
  ['デザイン周り/協賛紹介画像/協賛紹介_企業_online pâtisserie Lien様_特別賞.jpg', 'prizes/special-lien-cookie.webp',      1400, '個人協賛感謝賞 紹介'],
  ['デザイン周り/協賛紹介画像/協賛紹介_個人_百軒カナリ様_',                      'prizes/personal-kanari.webp',          1400, '本日のキュイ賞 紹介'],
  ['デザイン周り/協賛紹介画像/協賛紹介_個人_うくな様_',                          'prizes/personal-ukuna.webp',           1400, 'これが国士無双で賞 紹介'],
  ['デザイン周り/協賛紹介画像/協賛紹介_個人_めりぃぱめりぃ様_',                  'prizes/personal-merrypamerry.webp',    1400, '配信感謝賞 紹介'],
  ['デザイン周り/協賛紹介画像/協賛紹介_個人_鹿瀬あさ様_',                        'prizes/personal-kanose-asa-01.webp',   1400, '招待枠特別賞 紹介'],
  ['デザイン周り/協賛紹介画像/協賛紹介_個人_鹿瀬あさ様_ (1)',                    'prizes/personal-kanose-asa-02.webp',   1400, '秋のエキシビジョンマッチ賞 紹介'],
];

const rows = [];
let total = 0;
let missing = 0;

for (const job of JOBS) {
  if (job.length === 1) {
    rows.push({ heading: job[0].replace('── ', '') });
    console.log(`\n${job[0]}`);
    continue;
  }
  const [from, to, width, use, opt = {}] = job;
  const src = join(SRC, from);
  if (!existsSync(src)) {
    console.log(`  !! 見つかりません: ${from}`);
    missing++;
    continue;
  }

  const out = join(DST, to);
  mkdirSync(dirname(out), { recursive: true });

  let img = sharp(src, { failOn: 'none' });
  const meta = await img.metadata();
  if (width && meta.width && meta.width > width) img = img.resize({ width, withoutEnlargement: true });
  if (opt.flatten) img = img.flatten({ background: opt.flatten });

  if (to.endsWith('.webp')) img = img.webp({ quality: 82, effort: 5 });
  else if (to.endsWith('.jpg')) img = img.jpeg({ quality: 80, mozjpeg: true, chromaSubsampling: '4:4:4' });
  else if (to.endsWith('.png')) img = img.png({ compressionLevel: 9, palette: true });

  const info = await img.toFile(out);
  total += info.size;
  rows.push({ from, to, use, size: info.size, w: info.width, h: info.height });
  console.log(`  ${from.padEnd(52)} -> ${to}  (${(info.size / 1024).toFixed(0)}KB)`);
}

/* --- 出演者画像 ------------------------------------------------------------
   立ち絵は PNG の透明余白の量がファイルごとにバラバラで、そのまま正方形に
   切り出すと顔の大きさが揃いません。そこで

     1. 透明部分を自動で取り除いて「絵の実寸」を求める
     2. そこから正方形のバストアップを切り出す（guests/<name>.webp）
     3. 全身版も別に書き出す（guests/full/<name>.webp）

   という2種類を作ります。カードのグリッドは 1、主催・解説の大きいカードは
   全身版を使います。

   w : 切り出す幅（絵の横幅に対する割合）。小さいほど顔に寄ります
   y : 切り出しの上端（絵の高さに対する割合）。0 = 頭のてっぺん
   x : 横方向のずらし（絵の横幅に対する割合。+ で右へ）
   ------------------------------------------------------------------------- */
const GUESTS = [
  // [元ファイル, 出力名, 表示名, { w, y, x }]
  ['大会キービジュアル/meidoena.png',      'akedo-ena',        '明戸えな',       { w: 0.88, y: 0.00, x:  0.06 }],
  ['大会キービジュアル/oshitaraataru.png', 'oshitara-ataru',   'おしたらあたる', { w: 0.70, y: 0.00, x: -0.05 }],
  ['招待枠立ち絵素材/hosoya.png',    'hosoya-takuma',   '細谷拓真',     { w: 1.00, y: 0.00 }],
  ['招待枠立ち絵素材/ururi.png',     'nishino-ururi',   '西乃うるり',   { w: 1.00, y: 0.00 }],
  ['招待枠立ち絵素材/chigo.png',     'chigo',           '稚児',         { w: 0.78, y: 0.00, x:  0.10 }],
  ['招待枠立ち絵素材/takeoshan.png', 'takeoshan',       'タケオしゃん', { w: 1.00, y: 0.00 }],
  ['招待枠立ち絵素材/hinano.png',    'hinano-chino',    '雛呑ちの',     { w: 0.78, y: 0.00 }],
  ['招待枠立ち絵素材/yunchuru.png',  'yuntyuru',        'ゆんちゅる',   { w: 0.76, y: 0.00 }],
  ['招待枠立ち絵素材/noyuki.png',    'holy-night-snow', '聖夜ノ雪',     { w: 0.80, y: 0.00 }],
  ['招待枠立ち絵素材/chitose.png',   'yamato-chitose',  '大和ちとせ',   { w: 0.78, y: 0.00, x:  0.10 }],
  ['招待枠立ち絵素材/akarun.png',    'akarun',          'あかるん',     { w: 0.88, y: 0.00 }],
  ['招待枠立ち絵素材/kyomuneko.png', 'kyomuneko',       '虚無ねこ',     { w: 0.84, y: 0.00 }],
  ['招待枠立ち絵素材/kanari.png',    'momonoki-kanari', '百軒カナリ',   { w: 0.86, y: 0.00 }],
  ['招待枠立ち絵素材/ukuna.png',     'ukuna',           'うくな',       { w: 1.00, y: 0.00 }],
];

{
  const BUST = 640;   // バストアップの書き出しサイズ
  const FULL = 620;   // 全身版の最大幅
  console.log('\n── 出演者（バストアップ＋全身）');

  for (const [from, name, label, cfg] of GUESTS) {
    const src = join(SRC, from);
    if (!existsSync(src)) {
      console.log(`  !! 見つかりません: ${from}`);
      missing++;
      continue;
    }

    // 1) 透明余白を取り除いた「絵の実寸」を得る
    const trimmed = await sharp(src).trim({ threshold: 1 }).toBuffer({ resolveWithObject: true });
    const { width: tw, height: th } = trimmed.info;

    // 2) 正方形バストアップ
    const side = Math.min(Math.round(tw * (cfg.w ?? 1)), th);
    const left = Math.max(0, Math.min(tw - side, Math.round((tw - side) / 2 + tw * (cfg.x ?? 0))));
    const top = Math.max(0, Math.min(th - side, Math.round(th * (cfg.y ?? 0))));

    const bustOut = join(DST, `guests/${name}.webp`);
    mkdirSync(dirname(bustOut), { recursive: true });
    const bustInfo = await sharp(trimmed.data)
      .extract({ left, top, width: side, height: side })
      .resize(BUST, BUST)
      .webp({ quality: 84, effort: 5 })
      .toFile(bustOut);
    total += bustInfo.size;
    rows.push({
      from, to: `guests/${name}.webp`,
      use: `${label}（バストアップ・カード用）`,
      size: bustInfo.size, w: BUST, h: BUST,
    });

    // 3) 全身版
    const fullOut = join(DST, `guests/full/${name}.webp`);
    mkdirSync(dirname(fullOut), { recursive: true });
    const fullInfo = await sharp(trimmed.data)
      .resize({ width: Math.min(FULL, tw), withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toFile(fullOut);
    total += fullInfo.size;
    rows.push({
      from, to: `guests/full/${name}.webp`,
      use: `${label}（全身・主催/解説カード用）`,
      size: fullInfo.size, w: fullInfo.width, h: fullInfo.height,
    });

    console.log(
      `  ${label.padEnd(8)} 絵の実寸 ${String(tw).padStart(4)}x${String(th).padStart(4)}` +
      `  → バストアップ ${BUST}px (${(bustInfo.size / 1024).toFixed(0)}KB)` +
      ` / 全身 ${fullInfo.width}x${fullInfo.height} (${(fullInfo.size / 1024).toFixed(0)}KB)`
    );
  }
}

/* --- 出演者カードの並びを確認するコンタクトシート（開発用） ---------------
   tools/_contact-sheet.png に一覧画像を書き出します（公開されません）。
   顔の大きさが揃っているかを目視で確認し、上の w / y / x を調整してください。
   ------------------------------------------------------------------------- */
{
  const CELL = 240;
  const COLS = 5;
  const tiles = [];
  let i = 0;
  for (const [, name] of GUESTS) {
    const f = join(DST, `guests/${name}.webp`);
    if (!existsSync(f)) continue;
    tiles.push({
      input: await sharp(f).resize(CELL, CELL).flatten({ background: '#7d0722' }).toBuffer(),
      left: (i % COLS) * CELL,
      top: Math.floor(i / COLS) * CELL,
    });
    i++;
  }
  const sheetRows = Math.ceil(i / COLS);
  await sharp({ create: { width: CELL * COLS, height: CELL * sheetRows, channels: 3, background: '#4d0316' } })
    .composite(tiles).png().toFile(join(SITE, 'tools/_contact-sheet.png'));
  console.log(`\n  確認用一覧: site/tools/_contact-sheet.png`);
}

/* --- OGP画像（1200×630）を合成 --------------------------------------------
   SNSシェア時に使われる画像。紅色の背景パターンにロゴを重ねて生成します。
   ------------------------------------------------------------------------- */
{
  const W = 1200;
  const H = 630;
  const bgPath = join(SRC, 'デザイン周り/素材パーツ分け/協賛画像_パーツ分け/背景.jpg');
  const logoPath = join(SRC, 'デザイン周り/公式ロゴデータ/明戸えな様_明戸杯ロゴ_横型.png');

  const bg = existsSync(bgPath)
    ? await sharp(bgPath).resize(W, H, { fit: 'cover' }).toBuffer()
    : await sharp({ create: { width: W, height: H, channels: 3, background: '#7d0722' } }).png().toBuffer();

  // 背景を少し暗く落としてロゴを目立たせる
  const veil = await sharp({
    create: { width: W, height: H, channels: 4, background: { r: 93, g: 5, b: 26, alpha: 0.45 } },
  }).png().toBuffer();

  const logo = await sharp(logoPath).resize({ width: 900 }).toBuffer();

  const out = join(DST, 'ogp/ogp.jpg');
  mkdirSync(dirname(out), { recursive: true });
  const info = await sharp(bg)
    .composite([{ input: veil, blend: 'over' }, { input: logo, gravity: 'center' }])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(out);
  total += info.size;
  rows.push({
    from: '（背景.jpg ＋ 明戸えな様_明戸杯ロゴ_横型.png を合成）',
    to: 'ogp/ogp.jpg',
    use: 'OGP画像（SNSシェア用 1200×630）',
    size: info.size,
    w: W,
    h: H,
  });
  console.log(`\n── OGP\n  背景.jpg + 横型ロゴ を合成                         -> ogp/ogp.jpg  (${(info.size / 1024).toFixed(0)}KB)`);
}

/* --- 対照表を書き出し --- */
const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
const md = [
  '# 素材リネーム対照表',
  '',
  '`tools/import-assets.mjs` が自動生成しています。手で編集しないでください。',
  '',
  `- 生成日時: ${new Date().toLocaleString('ja-JP')}`,
  `- 元素材フォルダ: \`${SRC.split('/').pop()}\``,
  `- 合計: ${rows.filter((r) => r.to).length} ファイル / ${kb(total)}`,
  '',
  '元素材のファイル名は日本語や記号を含み、そのままでは URL に使えないため、',
  '半角英数のファイル名へ変換したうえで `site/public/assets/` 配下に配置しています。',
  '',
  '**画像を差し替えるとき**は、右列のパスに同名で上書きするのが最も簡単です。',
  '素材フォルダごと入れ替えた場合は `node tools/import-assets.mjs` を実行すれば',
  'このリネームと軽量化が一括で再実行されます。',
  '',
];
for (const r of rows) {
  if (r.heading) {
    md.push('', `## ${r.heading}`, '', '| 元ファイル（素材フォルダ内） | サイト上のパス | 用途 | 書き出しサイズ |', '| --- | --- | --- | --- |');
  } else {
    md.push(`| \`${r.from}\` | \`public/assets/${r.to}\` | ${r.use} | ${r.w}×${r.h} / ${kb(r.size)} |`);
  }
}
md.push('', '---', '', '## 未入稿・代用しているもの', '',
  '| 対象 | 状況 |', '| --- | --- |',
  '| 沼津麺百式様 ロゴ | ロゴデータ未入稿のため、商品バナー画像で代用しています |',
  '| 麻雀雑貨Lemo様 ロゴ | 企業協賛一覧には掲載していないため未取り込み（8位賞品の紹介画像のみ使用） |',
  '| 三反田様 / 鹿瀬あさ様 | 個人協賛のためロゴなし（賞品紹介画像のみ） |',
  '');
writeFileSync(join(DST, 'RENAME.md'), md.join('\n'), 'utf8');

console.log(`\n完了: ${rows.filter((r) => r.to).length} ファイル / 合計 ${kb(total)}${missing ? ` （${missing} 件が見つかりませんでした）` : ''}`);
console.log('対照表: site/public/assets/RENAME.md');
