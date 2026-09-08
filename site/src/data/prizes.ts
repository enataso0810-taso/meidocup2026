/* ===========================================================================
   賞品データ
   image は public/assets/prizes/ 配下のファイル名。
   =========================================================================== */

export type Prize = {
  /** 順位 / 賞名 */
  rank: string;
  /** 賞名（主催賞・個人協賛賞で使用） */
  title?: string;
  item: string;
  sponsor: string;
  /** 受賞条件 */
  condition?: string;
  note?: string;
  /** public/assets/prizes/ からの相対パス。無い場合は undefined */
  image?: string;
  /** 副賞（トロフィーアクキーなど）の画像 */
  bonusImage?: string;
  bonusLabel?: string;
};

/* ---------------------------------------------------------------------------
   協賛者名 → リンク先の対応表
   ここに載っている協賛者名は、賞品カード上でリンクになります。
   キーは各賞の sponsor: に書いた文字列と完全に一致させてください。
   -------------------------------------------------------------------------- */
export const SPONSOR_LINKS: Record<string, string> = {
  // 主催・主催サポート
  '明戸えな': 'https://x.com/enataso0810',
  '明戸えな協賛': 'https://x.com/enataso0810',
  'おしたらあたる協賛': 'https://x.com/oshi_tara_ataru',

  // 個人協賛
  '百軒カナリ様': 'https://x.com/MMnoki_Chan',
  'うくな様': 'https://x.com/ukuna_nico',
  '三反田様': 'https://x.com/santanda35',
  'めりぃぱめりぃ様': 'https://x.com/merrypamerry',
  'online pâtisserie Lien様': 'https://x.com/Freria_inverse',
  '鹿瀬あさ様': 'https://x.com/asa_shikase',

  // 企業協賛
  'スリーアール株式会社様': 'https://x.com/AGRelux',
  '株式会社木村酒造様': 'https://x.com/fukukomachi1615',
  '合同会社ウザク式様': 'https://x.com/mjbook',
  '横手十文字 奥山商店様': 'https://x.com/okuyama_syouten',
  '沼津麺百式様': 'https://x.com/100Hiko',
  '麻雀雑貨Lemo様': 'https://x.com/lemonsalmon0122',
};

/** ☆上位賞（企業協賛）☆ */
export const RANK_PRIZES: Prize[] = [
  {
    rank: '1位',
    item: 'ゲーミングチェア「AGRelux」',
    note: '標準／極／α／座椅子Z の4タイプからお好きなものを1つ選べます。',
    sponsor: 'スリーアール株式会社様',
    image: 'rank01-3r-agrelux.webp',
    bonusImage: 'trophy-gold.webp',
    bonusLabel: 'トロフィーアクキー（金）',
  },
  {
    rank: '2位',
    item: '福小町 純米大吟醸 百田40（720ml×1本）／純米吟醸 福小町（720ml×1本） 2本セット',
    note: '明戸杯オリジナルラベル付き',
    sponsor: '株式会社木村酒造様',
    image: 'rank02-kimura-shuzo.webp',
    bonusImage: 'trophy-silver.webp',
    bonusLabel: 'トロフィーアクキー（銀）',
  },
  {
    rank: '3位',
    item: 'ウザク式何切る問題集 全巻セット（4冊セット）',
    note: 'はじめの書以外の書籍です。',
    sponsor: '合同会社ウザク式様',
    image: 'rank03-uzakushiki.webp',
    bonusImage: 'trophy-bronze.webp',
    bonusLabel: 'トロフィーアクキー（銅）',
  },
  {
    rank: '4位',
    item: '純米吟醸いだまし一年熟成 720ml ＆ 純米吟醸どんぶぐ 720ml 2本セット',
    sponsor: '横手十文字 奥山商店様',
    image: 'rank04-okuyama-shoten.webp',
  },
  {
    rank: '5位',
    item: 'クッキー缶（1缶）',
    sponsor: 'online pâtisserie Lien様',
    image: 'rank05-lien.webp',
  },
  {
    rank: '6〜7位',
    item: '冷凍餃子（24個入り）',
    sponsor: '沼津麺百式様',
    image: 'rank06-07-men-hyakushiki.webp',
  },
  {
    rank: '8位',
    item: '選べる麻雀雑貨',
    sponsor: '麻雀雑貨Lemo様',
    image: 'rank08-lemo.webp',
  },
  {
    rank: '9〜10位',
    item: '麻雀モチーフ雑貨',
    sponsor: 'めりぃぱめりぃ様',
    image: 'rank09-10-merrypamerry.webp',
  },
];

export const RANK_PRIZES_NOTE = '※1〜3位の方へはトロフィーアクキーも合わせて贈呈致します。';

/** 1〜3位に贈られるトロフィーデザインのアクリルキーホルダー */
export const TROPHIES = [
  { rank: '1位', label: '金', image: 'trophy-gold.webp' },
  { rank: '2位', label: '銀', image: 'trophy-silver.webp' },
  { rank: '3位', label: '銅', image: 'trophy-bronze.webp' },
] as const;

/** 【主催賞】 */
export const HOST_PRIZES: Prize[] = [
  {
    rank: '主催賞',
    title: 'お前はゴリラで賞',
    item: '「麻雀牌からひょっこり♪ ちまっとミニキャラクター」（べーぐる様担当／グッズ化を含む商用利用可能）',
    condition: '清一色で和了した方',
    sponsor: '明戸えな協賛',
  },
  {
    rank: '主催賞',
    title: 'おしてもあたらないで賞',
    item: 'サムネイル2種（浅葱様担当／2,000円コース1枚＋3,000円コース1枚）',
    condition:
      '南4局オーラスをラスで迎えた状態から、逆転トップを取った方（親の連荘も含む）',
    note: '※3回戦以降（半荘）から適用。',
    sponsor: 'おしたらあたる協賛',
  },
];

/** 【個人協賛賞】 */
export const PERSONAL_PRIZES: Prize[] = [
  {
    rank: '個人協賛賞',
    title: '本日のキュイ賞',
    item: '八景島シーパラダイス 花火観覧クルーズ ペアチケット',
    condition: '最もド派手な花火となって散った方（百軒カナリ判定）',
    sponsor: '百軒カナリ様',
    image: 'personal-kanari.webp',
  },
  {
    rank: '個人協賛賞',
    title: 'これが国士無双で賞',
    item: '梅酒 国士無双 720ml',
    condition: '国士無双を出した方の中から抽選で1名',
    sponsor: 'うくな様',
    image: 'personal-ukuna.webp',
  },
  {
    rank: '個人協賛賞',
    title: '役満賞',
    item: 'オリジナル麻雀牌',
    condition: '役満を出した方の中から抽選で10名。数え役満も可',
    note: '※10名未満の場合は該当者全員にもれなくプレゼント！',
    sponsor: '三反田様',
    image: 'personal-santanda.webp',
  },
  {
    rank: '個人協賛賞',
    title: '配信感謝賞',
    item: 'わんコメ 麻雀コメント欄',
    condition: '当日配信してくれた方の中から抽選8名',
    sponsor: 'めりぃぱめりぃ様',
    image: 'personal-merrypamerry.webp',
  },
  {
    rank: '個人協賛賞',
    title: '個人協賛感謝賞',
    item: 'おすそ分けクッキーセット',
    condition: '個人協賛してくれた方の中から3名',
    sponsor: 'online pâtisserie Lien様',
    image: 'special-lien-cookie.webp',
  },
];

/** 【招待枠の方限定】 */
export const INVITED_PRIZES: Prize[] = [
  {
    rank: '招待枠限定',
    title: '招待枠特別賞',
    item: 'クラウンメロン 桐箱入り 上 山等級 中玉 1.3kg前後',
    condition: 'エキシビジョンマッチに参加していない招待枠メンバー上位2名',
    sponsor: '鹿瀬あさ様',
    image: 'personal-kanose-asa-01.webp',
  },
];

/** 【エキシビジョンマッチ企画の賞】 */
export const EXHIBITION_PRIZES: Prize[] = [
  {
    rank: 'エキシビジョン',
    title: '秋のエキシビジョンマッチダービー賞',
    item: '山本の米 新米 10kg',
    condition: 'エキシビジョンマッチの1位を予想した方から抽選で1名',
    sponsor: '明戸えな',
    image: 'yamamoto-rice.webp',
  },
  {
    rank: 'エキシビジョン',
    title: '秋のエキシビジョンマッチ賞',
    item: '5段重 松阪牛 焼肉フルコースセット 焼肉コース（4〜5人前）',
    condition: 'エキシビジョンマッチ1位の方',
    sponsor: '鹿瀬あさ様',
    image: 'personal-kanose-asa-02.webp',
  },
  {
    rank: 'エキシビジョン',
    title: '集中してたで賞',
    item: 'ZONIQ（集中系サプリメント／一般食品）',
    condition:
      '決勝戦とエキシビジョンマッチにて、最も高い集中力や粘り強さを見せてくれた選手（主催・運営陣判定）',
    note: '※ZONIQ（ゾニック）は、AGReluxが手がける集中系サプリメント（一般食品）です。カフェインとロディオラを配合し、「オンに切り替えたい時の集中サポート」をコンセプトにした、においが気にならないハードカプセルタイプ。日本製・GMP認定工場製造・砂糖不使用。',
    sponsor: 'スリーアール株式会社様',
    image: 'special-3r-zoniq.webp',
  },
];
