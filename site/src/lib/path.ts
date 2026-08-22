/* ===========================================================================
   base パス解決ヘルパー
   GitHub Pages のプロジェクトサイト（https://user.github.io/repo/）のように
   サブパスへ配置する場合でも、正しい URL を組み立てます。

     withBase('')                  → '/repo/'
     withBase('guests/')           → '/repo/guests/'
     withBase('assets/logo/a.png') → '/repo/assets/logo/a.png'
   =========================================================================== */

const BASE = import.meta.env.BASE_URL;

/** base 込みの絶対パスを返す（引数は base からの相対パス） */
export function withBase(path = ''): string {
  const base = BASE.endsWith('/') ? BASE : `${BASE}/`;
  return `${base}${path.replace(/^\/+/, '')}`;
}
