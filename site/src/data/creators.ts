/* ===========================================================================
   クリエイター紹介 ／ 大会サポートスタッフ
   image は public/assets/creators/ 配下のファイル名。
   =========================================================================== */

/**
 * 紹介文が未入稿の枠に入れるサンプルテキスト。
 * 実際の紹介文が届いたら bio: の中身をそのまま差し替えてください。
 * 引数はおおよその想定文字数です。
 */
const sample = (chars: number): string => {
  const unit = `サンプルテキスト${chars}文字`;
  return unit.repeat(Math.ceil(chars / unit.length)).slice(0, chars);
};

export type Creator = {
  name: string;
  role: string;
  image: string;
  /** 本人紹介文（未入稿の間はサンプルテキスト） */
  bio: string;
  x?: string;
  link?: string;
  linkLabel?: string;
};

export const CREATORS: Creator[] = [
  {
    name: '153day様',
    role: '大会デザイン一式',
    image: '153day.webp',
    bio: sample(160),
    x: 'https://x.com/153day_D',
    link: 'https://www.foriio.com/153day',
    linkLabel: 'foriio',
  },
  {
    name: '望月南雲様',
    role: '大会キービジュアルイラスト',
    image: 'mochizuki-nagumo.webp',
    bio: sample(160),
    x: 'https://x.com/mochinagumo',
    link: 'https://lit.link/mochinagumo',
    linkLabel: 'lit.link',
  },
  {
    name: '桜せちょ様',
    role: '大会テーマ楽曲',
    image: 'sakura-secho.webp',
    bio: sample(160),
    x: 'https://x.com/sechosakura',
    link: 'https://www.foriio.com/sechosakura',
    linkLabel: 'foriio',
  },
  {
    name: '銀貨先生様',
    role: '大会公式サイト',
    image: 'ginka.webp',
    bio: sample(160),
    x: 'https://x.com/ginka1108',
    link: 'https://lit.link/ginka1108',
    linkLabel: 'lit.link',
  },
];

/** 大会サポートスタッフ（モデレーター） */
export const MODERATORS: Creator[] = [
  {
    name: '射銀光展様',
    role: 'モデレーター',
    image: 'igin-mitsuhiro.webp',
    bio: sample(90),
    x: 'https://x.com/dartsv_mitsu',
  },
  {
    name: 'ネムメル様',
    role: 'モデレーター',
    image: 'nemumeru.webp',
    bio: sample(90),
    x: 'https://x.com/marchen_gs',
  },
];
