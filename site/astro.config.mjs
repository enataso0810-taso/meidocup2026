// @ts-check
import { defineConfig } from 'astro/config';

// ─────────────────────────────────────────────────────────────
//  GitHub Pages 設定
//  ・ユーザー/組織サイト (https://<user>.github.io/) に置く場合
//      site: 'https://<user>.github.io',  base は指定しない
//  ・プロジェクトサイト (https://<user>.github.io/<repo>/) に置く場合
site: 'https://<user>.github.io',  base: '/<repo>'
//  ・独自ドメイン (https://akedohai.jp/) の場合
//      site: 'https://akedohai.jp',       base は指定しない
// ─────────────────────────────────────────────────────────────
export default defineConfig({
  site: 'https://example.github.io',
  // base: '/akedo-hai-2026',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
