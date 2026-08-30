/* ===========================================================================
   出演者データ
   image は public/assets/guests/ 配下のファイル名を指定します。
   画像を差し替えるときは同名ファイルを上書きするか、下の image: を書き換えるだけ。
   =========================================================================== */

export type Person = {
  name: string;
  /** キャッチフレーズ。未提出の場合は '' （サイト上は「Coming Soon」表示） */
  catch: string;
  /** public/assets/guests/ からの相対パス */
  image: string;
  x?: string;
  youtube?: string;
  /** 所属・段位など（エキシビジョン出演者で使用） */
  affiliation?: string;
  rank?: string;
  /** 役割ラベル */
  role?: string;
};

/** ① 主催 */
export const HOSTS: Person[] = [
  {
    name: '明戸えな',
    role: '主催',
    catch: '',
    image: 'akedo-ena.webp',
    x: 'https://x.com/enataso0810',
    youtube: 'https://www.youtube.com/@enataso0810',
  },
];

/** ② 主催サポート */
export const SUPPORTERS: Person[] = [
  {
    name: 'おしたらあたる',
    role: '主催サポート',
    catch: '',
    image: 'oshitara-ataru.webp',
    affiliation: 'VPL所属',
    x: 'https://x.com/oshi_tara_ataru',
    youtube: 'https://www.youtube.com/@oshitaraataru',
  },
];

/** ③ 解説 */
export const COMMENTATORS: Person[] = [
  {
    name: '細谷拓真プロ',
    role: '解説',
    catch: '',
    image: 'hosoya-takuma.webp',
    affiliation: '麻雀プロ団体RMU・VPL所属',
    x: 'https://x.com/hosoya_rmu',
    youtube: 'https://www.youtube.com/@hosoya',
  },
];

/** ④ 招待枠 */
export const INVITED: Person[] = [
  {
    name: '細谷拓真',
    catch: '人生はゼンツ、麻雀は守備派',
    image: 'hosoya-takuma.webp',
    x: 'https://x.com/hosoya_rmu',
    youtube: 'https://www.youtube.com/@hosoya',
  },
  {
    name: '西乃うるり',
    catch: '日本プロ麻雀協会所属VPL1期生魂天で天鳳位の麻雀大喜利インターネットパンダ',
    image: 'nishino-ururi.webp',
    x: 'https://x.com/ururipanda',
    youtube: 'https://www.youtube.com/@nishino_ururi',
  },
  {
    name: '稚児',
    catch: '構想力',
    image: 'chigo.webp',
    x: 'https://x.com/chigo0822',
    youtube: 'https://www.youtube.com/@稚児ch',
  },
  {
    name: 'タケオしゃん',
    catch: '親切で優しいパッツモ',
    image: 'takeoshan.webp',
    x: 'https://x.com/nyankosan',
    youtube: 'https://www.youtube.com/@takeoshan',
  },
  {
    name: '雛呑ちの',
    catch: 'けもりーち',
    image: 'hinano-chino.webp',
    x: 'https://x.com/chinohinano',
    youtube: 'https://www.youtube.com/@雛呑ちの',
  },
  {
    name: 'ゆんちゅる',
    catch: '100万カラットの天才',
    image: 'yuntyuru.webp',
    x: 'https://x.com/yuntyuru_autre',
    youtube: 'https://www.youtube.com/@yuntyuru',
  },
  {
    name: '聖夜ノ雪',
    catch: '絶対立直',
    image: 'holy-night-snow.webp',
    x: 'https://x.com/holy_night_snow',
    youtube: 'https://www.youtube.com/@聖夜ノ雪',
  },
  {
    name: '大和ちとせ',
    catch: "Don't think. Kan.（考えるな、カンしろ）",
    image: 'yamato-chitose.webp',
    x: 'https://x.com/yamato_chitose',
    youtube: 'https://www.youtube.com/@大和ちとせ',
  },
  {
    name: 'あかるん',
    catch: 'ポジティブ絶叫マシーン',
    image: 'akarun.webp',
    x: 'https://x.com/akarun_melody',
    youtube: 'https://www.youtube.com/@Akarun_dayo',
  },
  {
    name: '虚無ねこ',
    catch: 'かわいさ役満級！',
    image: 'kyomuneko.webp',
    x: 'https://x.com/kyomuneko_dayo',
    youtube: 'https://www.youtube.com/@kyomuneko_dayo',
  },
  {
    name: '百軒カナリ',
    catch: '「和良、明るくなったろう」',
    image: 'momonoki-kanari.webp',
    x: 'https://x.com/MMnoki_Chan',
    youtube: 'https://www.youtube.com/@Momonoki_Kanari',
  },
  {
    name: 'うくな',
    catch: 'お振込み用ATM',
    image: 'ukuna.webp',
    x: 'https://x.com/ukuna_nico',
    youtube: 'https://www.youtube.com/@ukuna7',
  },
];

/** エキシビジョンマッチ出演メンバー（4名） */
export const EXHIBITION_PLAYERS: Person[] = [
  {
    name: '細谷拓真',
    catch: '人生はゼンツ、麻雀は守備派',
    image: 'hosoya-takuma.webp',
    affiliation: '麻雀プロ団体RMU・VPL所属',
    rank: '魂天',
    x: 'https://x.com/hosoya_rmu',
    youtube: 'https://www.youtube.com/@hosoya',
  },
  {
    name: '西乃うるり',
    catch: '日本プロ麻雀協会所属VPL1期生魂天で天鳳位の麻雀大喜利インターネットパンダ',
    image: 'nishino-ururi.webp',
    affiliation: '日本プロ麻雀協会・VPL所属',
    rank: '魂天',
    x: 'https://x.com/ururipanda',
    youtube: 'https://www.youtube.com/@nishino_ururi',
  },
  {
    name: '稚児',
    catch: '構想力',
    image: 'chigo.webp',
    affiliation: '麻雀プロ団体RMU・VPL所属',
    rank: '魂天',
    x: 'https://x.com/chigo0822',
    youtube: 'https://www.youtube.com/@稚児ch',
  },
  {
    name: 'タケオしゃん',
    catch: '親切で優しいパッツモ',
    image: 'takeoshan.webp',
    affiliation: 'VPL所属',
    rank: '魂天',
    x: 'https://x.com/nyankosan',
    youtube: 'https://www.youtube.com/@takeoshan',
  },
];
