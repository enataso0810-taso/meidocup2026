# 明戸杯2026 公式サイト

「麻雀好きのための秋の祭典」明戸杯2026（主催：明戸えな）の特設サイトです。

- **技術スタック**: [Astro](https://astro.build/) 5 + TypeScript + [Three.js](https://threejs.org/)（トップのWebGL演出）
- **出力**: 完全な静的サイト（サーバー不要）。GitHub Pages にそのまま載ります
- **フォント**: Google Fonts（Shippori Mincho B1 / Zen Kaku Gothic New / Cinzel）

---

## セットアップ

```bash
cd site
npm install
npm run dev      # http://localhost:4321
```

| コマンド | 内容 |
| --- | --- |
| `npm run dev` | 開発サーバーを起動 |
| `npm run build` | `site/dist/` に静的サイトを出力 |
| `npm run preview` | ビルド結果をローカル確認 |
| `npm run check` | 型・構文チェック |
| `npm run assets` | 素材フォルダから画像を取り込み直す（リネーム＋軽量化＋対照表生成） |

---

## よく触るファイル

### 1. 日付・カウントダウン → `src/data/site.ts`

開催日時・投票締切など、時間に関わる値はすべてここに集約しています。

```ts
export const EVENT = {
  startsAt: '2026-10-12T13:00:00+09:00',   // ← ここを書き換えるだけ
  dateLabelJa: '2026年10月12日(月・祝)',
  streamUrl: '',                            // 配信URLが決まったら記入するとボタンが出ます
};

export const EXHIBITION_VOTE = {
  deadlineAt: '2026-10-12T16:30:00+09:00', // 投票締切カウントダウン
};
```

### 2. 出演者 → `src/data/guests.ts`

キャッチフレーズが未提出の方は `catch: ''` にしてあり、
サイト上では「キャッチフレーズ Coming Soon」と表示されます。
（現在：聖夜ノ雪さん・虚無ねこさん）

### 3. 企業協賛 → `src/data/sponsors.ts`

`AGRELUX` のブロックで、スリーアール株式会社様のクーポンコードと
プレスリリースURLを設定できます。

```ts
export const AGRELUX = {
  couponCode: '',        // ← 空文字だとクーポン欄が「COMING SOON」表示になります
  couponDiscount: '',    // 例: '10%OFF'
  couponValidUntil: '',  // 例: '2026年12月31日まで'
  pressReleaseUrl: '',   // ← 記入するとボタンが出ます
};
```

### 4. 賞品 → `src/data/prizes.ts`
### 5. ルール・禁止事項 → `src/data/rules.ts`
### 6. スケジュール → `src/data/schedule.ts`
### 7. クリエイター・大会サポートスタッフ・賞品制作者 → `src/data/creators.ts`

3つの配列があります。

| 配列 | 掲載先 |
| --- | --- |
| `CREATORS` | クリエイターページ「クリエイター」 |
| `MODERATORS` | クリエイターページ「大会サポートスタッフ」 |
| `PRIZE_CREATORS` | 賞品ページ「主催賞」内の「賞品制作クリエイター」 |


紹介文は `bio:` に入ります。

### 8. 画像 → `public/assets/`

差し替え方法は [`public/assets/README.md`](public/assets/README.md)、
元素材とサイト上のファイル名の対応は [`public/assets/RENAME.md`](public/assets/RENAME.md) を参照してください。

素材フォルダごと入れ替えた場合は、`site/` で次を実行すれば取り込み直せます。

```bash
npm run assets
```

リネーム・リサイズ・WebP変換・OGP画像の合成・対照表の更新まで一括で行われます。

---

## トーナメント表の差し込み

`src/pages/schedule.astro` の一番下、`id="bracket"` 相当のセクションに
「COMING SOON」のプレースホルダーを置いてあります。
抽選結果が出たら、`.bracket__overlay` のブロックを削除し、
`.bracket__ghost` を実際のトーナメント表（画像 or HTML）に置き換えてください。

画像で差し込む場合は `public/assets/` に `bracket.png` などを置き、

```astro
<div class="bracket washi corner-key">
  <img src={withBase('assets/bracket.png')} alt="明戸杯2026 トーナメント表" />
</div>
```

のように書き換えるのが最も簡単です。

---

## GitHub Pages へのデプロイ

1. このリポジトリを GitHub に push
2. リポジトリの **Settings → Pages → Build and deployment → Source** を **GitHub Actions** に変更
3. `site/astro.config.mjs` の `site` / `base` を公開先に合わせて設定

`site/astro.config.mjs` の冒頭にある **`SITE` と `BASE` の 2 行だけ**を書き換えます。
それ以外の行（コメントを含む）は触らないでください。

```js
const SITE = 'https://ユーザー名.github.io';  // 末尾スラッシュなし
const BASE = '';                              // サブディレクトリを使う場合のみ '/リポジトリ名'
```

| 公開URL | `SITE` | `BASE` |
| --- | --- | --- |
| `https://ユーザー名.github.io/` | `'https://ユーザー名.github.io'` | `''` |
| `https://ユーザー名.github.io/リポジトリ名/` | `'https://ユーザー名.github.io'` | `'/リポジトリ名'` |
| 独自ドメイン `https://akedohai.jp/` | `'https://akedohai.jp'` | `''` ＋ `public/CNAME` を追加 |

> **注意**：GitHub のリポジトリ名に日本語は使えず、自動的にハイフンへ置換されます。
> 例えば「明戸杯2026」というリポジトリ名は `-2026` になり、公開URLも
> `https://ユーザー名.github.io/-2026/` という見栄えの悪いものになります。
> `akedo-hai-2026` のような半角英数のリポジトリ名を推奨します。

`main` ブランチへの push で `.github/workflows/deploy.yml` が走り、自動的に公開されます。

---

## 掲載方針のメモ

### エキシビジョン賞品の掲載場所（ご相談いただいた件）

**両方に載せています。** データの実体は `src/data/prizes.ts` の `EXHIBITION_PRIZES` 一箇所だけで、
それを 2 ページから参照しています（片方を直せば両方に反映されます）。

- **賞品ページ** … 全19賞を一覧できるように、末尾に「エキシビジョンマッチ企画の賞」として掲載
- **エキシビジョンページ** … 投票の直後に「この企画で当たるもの」が見えるよう文脈内に掲載

賞品を探す人は賞品ページを、投票しに来た人はエキシビジョンページだけを見ればよく、
どちらから入っても迷わない形にしました。相互リンクのボタンも設置しています。

### 未確定・要確認の項目

サイト上ではプレースホルダー表示になっています。確定したら該当ファイルを更新してください。

| 項目 | 状態 | 更新場所 |
| --- | --- | --- |
| エキシビジョン投票フォーム | 「応募フォーム準備中」表示 | `src/data/site.ts` の `EXHIBITION_VOTE.formUrl` |
| トーナメント表 | 「COMING SOON」枠を設置済み | `src/pages/schedule.astro` |
| AGRelux クーポンコード | 「COMING SOON」チケット表示 | `src/data/sponsors.ts` |

---

## デザインについて

配色・モチーフは公式ロゴおよび大会配信画面のデザインから抽出しています。

| 色 | 用途 |
| --- | --- |
| 紅 `#c8103c` / `#a30a2e` / `#7d0722` | ベース |
| 深緑 `#0e7c6e` / `#2aa595` | アクセント（麻雀牌の緑） |
| 金 `#d9a441` / `#f2d89b` | 罫線・装飾 |
| 生成り `#fbf3e2` | 和紙カード |
| 墨茶 `#5a2b24` | 和紙上の本文 |

モチーフは祥雲・梅の花・雷紋（回紋）・麻雀牌。
見出しは明朝体（Shippori Mincho B1）、本文はゴシック（Zen Kaku Gothic New）です。

トップページの WebGL 演出（`src/scripts/hero.ts`）は、秋の祭典に合わせて
**麻雀牌・紅葉（もみじ／銀杏）・金の粒子**が舞う構成です。
麻雀牌は全面を角丸にしたジオメトリで、牌面は Canvas から生成しています
（「白」は日本麻雀にならって完全な無地）。
`prefers-reduced-motion` の指定時は動きを大幅に抑え、
WebGL 非対応環境ではグラデーション背景にフォールバックします。
