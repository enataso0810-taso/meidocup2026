/* ===========================================================================
   クリエイター紹介データ
   image は public/assets/creators/ 配下のファイル名。
   =========================================================================== */

export type Creator = {
  name: string;
  role: string;
  image: string;
  x?: string;
  link?: string;
  linkLabel?: string;
};

export const CREATORS: Creator[] = [
  {
    name: '153day様',
    role: '大会デザイン一式',
    image: '153day.svg',
    x: 'https://x.com/153day_D',
    link: 'https://www.foriio.com/153day',
    linkLabel: 'foriio',
  },
  {
    name: '望月南雲様',
    role: '大会キービジュアルイラスト',
    image: 'mochizuki-nagumo.svg',
    x: 'https://x.com/mochinagumo',
    link: 'https://lit.link/mochinagumo',
    linkLabel: 'lit.link',
  },
  {
    name: '桜せちょ様',
    role: '大会テーマ楽曲',
    image: 'sakura-secho.svg',
    x: 'https://x.com/sechosakura',
    link: 'https://www.foriio.com/sechosakura',
    linkLabel: 'foriio',
  },
  {
    name: '銀貨先生様',
    role: '大会公式サイト',
    image: 'ginka.svg',
    x: 'https://x.com/ginka1108',
    link: 'https://lit.link/ginka1108',
    linkLabel: 'lit.link',
  },
];
