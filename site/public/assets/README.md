# 画像アセットの差し替えガイド

すべての画像は `public/assets/` 配下にあります。
ここに置いたファイルはビルド後 `/assets/...` としてそのまま配信されます。

差し替え方法は 2 通りです。

1. **同じファイル名で上書きする** ── コードの変更は不要です（推奨）
2. **別のファイル名で追加する** ── `src/data/*.ts` の `image:` / `logo:` を新しいファイル名に書き換えます

---

## ディレクトリ構成

| ディレクトリ | 中身 | 参照している設定ファイル |
| --- | --- | --- |
| `logo/` | 大会公式ロゴ（縦型・横型） | `src/layouts` `src/components/Header.astro` `Footer.astro` `Hero.astro` |
| `bg/` | 背景パターン | `src/styles/global.css` |
| `parts/` | 配信画面から切り出した装飾パーツ（フレーム・ネームプレート等） | 現状未使用。装飾追加時に利用可 |
| `guests/` | 出演者アイコン | `src/data/guests.ts` |
| `creators/` | クリエイターアイコン | `src/data/creators.ts` |
| `sponsors/` | 企業協賛ロゴ | `src/data/sponsors.ts` |
| `prizes/` | 賞品・協賛紹介画像 | `src/data/prizes.ts` |

---

## 差し替えが必要なファイル（現在プレースホルダー）

`.svg` のものは自動生成したプレースホルダーです。本番画像に差し替えてください。
拡張子が変わる場合（`.svg` → `.png` / `.jpg`）は、対応するデータファイルの
`image:` / `logo:` の記述も新しいファイル名に書き換えてください。

### 出演者アイコン `guests/`

| ファイル | 対象 |
| --- | --- |
| `akedo-ena.svg` | 明戸えな（主催） |
| `oshitara-ataru.svg` | おしたらあたる（主催サポート） |
| `hosoya-takuma.svg` | 細谷拓真（解説・招待枠・エキシビジョン） |
| `nishino-ururi.svg` | 西乃うるり |
| `chigo.svg` | 稚児 |
| `takeoshan.svg` | タケオしゃん |
| `hinano-chino.svg` | 雛呑ちの |
| `yuntyuru.svg` | ゆんちゅる |
| `holy-night-snow.svg` | 聖夜ノ雪 |
| `yamato-chitose.svg` | 大和ちとせ |
| `akarun.svg` | あかるん |
| `kyomuneko.svg` | 虚無ねこ |
| `momonoki-kanari.svg` | 百軒カナリ |
| `ukuna.svg` | うくな |

推奨サイズ：正方形 512×512px 以上（JPEG / PNG / WebP）

### クリエイターアイコン `creators/`

| ファイル | 対象 |
| --- | --- |
| `153day.svg` | 153day様（大会デザイン一式） |
| `mochizuki-nagumo.svg` | 望月南雲様（キービジュアルイラスト） |
| `sakura-secho.svg` | 桜せちょ様（テーマ楽曲） |
| `ginka.svg` | 銀貨先生様（公式サイト） |

推奨サイズ：正方形 512×512px 以上

### 企業協賛ロゴ `sponsors/`

| ファイル | 対象 |
| --- | --- |
| `3r.svg` | スリーアール株式会社様 |
| `kimura-shuzo.svg` | 株式会社木村酒造様 |
| `uzakushiki.svg` | ウザク式様 |
| `okuyama-shoten.svg` | 合資会社奥山商店様 |
| `lien.svg` | online pâtisserie Lien様 |
| `men-hyakushiki.svg` | 麺百式様 |
| `merrypamerry.svg` | めりぃぱめりぃ様 |

推奨サイズ：横長 960×480px 程度／背景は白または透過PNG

---

## すでに本番画像が入っているファイル

### 賞品・協賛紹介画像 `prizes/`

いただいた協賛紹介画像を Web 用に 1600px 幅へリサイズして配置済みです。
差し替える場合は同名で上書きしてください（16:9 推奨）。

`rank01-3r-agrelux.jpg` / `rank02-kimura-shuzo.jpg` / `rank03-uzakushiki.jpg` /
`rank04-okuyama-shoten.jpg` / `rank05-lien.jpg` / `rank06-07-men-hyakushiki.jpg` /
`rank08-lemo.jpg` / `rank09-10-merrypamerry.jpg` / `special-3r-zoniq.jpg` /
`special-lien-cookie.jpg` / `personal-kanari.jpg` / `personal-ukuna.jpg` /
`personal-merrypamerry.jpg` / `personal-kanose-asa-01.jpg` / `personal-kanose-asa-02.jpg`

### ロゴ `logo/`

- `logo-main.png` … 縦型ロゴ（ヒーロー／フッター）
- `logo-horizontal.png` … 横型ロゴ（ヘッダー／OGP）

### 背景・パーツ

- `bg/pattern-crimson.jpg` … サイト全体の背景パターン
- `parts/frame-gold.png` `parts/nameplate-*.png` `parts/logo-small.png` … 配信画面素材から切り出したパーツ（予備）

---

## プレースホルダーの再生成

```bash
node tools/gen-placeholders.mjs          # 未生成のものだけ作る
node tools/gen-placeholders.mjs --force  # すべて作り直す
```
