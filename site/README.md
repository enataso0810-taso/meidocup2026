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
### 7. クリエイター → `src/data/creators.ts`

### 8. 画像 → `public/assets/`

差し替え方法は [`public/assets/README.md`](public/assets/README.md) を参照してください。

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

| 公開先 | 設定 |
| --- | --- |
| `https://<user>.github.io/` | `site: 'https://<user>.github.io'`（`base` なし） |
| `https://<user>.github.io/<repo>/` | `site: 'https://<user>.github.io'` + `base: '/<repo>'` |
| 独自ドメイン | `site: 'https://example.jp'`（`base` なし）＋ `public/CNAME` を追加 |

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
| 聖夜ノ雪様・虚無ねこ様のキャッチコピー | 「Coming Soon」表示 | `src/data/guests.ts` |
| トーナメント表 | 「COMING SOON」枠を設置済み | `src/pages/schedule.astro` |
| AGRelux クーポンコード | 「COMING SOON」チケット表示 | `src/data/sponsors.ts` |
| スリーアール様プレスリリースURL | 「公開準備中」表示 | `src/data/sponsors.ts` |
| 配信URL | ボタン非表示 | `src/data/site.ts` |
| 出演者・クリエイターのアイコン | 自動生成プレースホルダー | `public/assets/guests/` `creators/` |
| 企業ロゴ | 自動生成プレースホルダー | `public/assets/sponsors/` |
| ルール詳細（持ち点・赤ドラ等） | 雀魂 段位戦の標準設定で仮置き | `src/data/rules.ts` |
| 禁止事項 | 一般的な内容で起案 | `src/data/rules.ts` |

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

トップページの WebGL 演出（`src/scripts/hero.ts`）は麻雀牌・梅の花びら・金の粒子が
舞う構成で、`prefers-reduced-motion` の指定時は動きを大幅に抑えます。
WebGL 非対応環境ではグラデーション背景にフォールバックします。
