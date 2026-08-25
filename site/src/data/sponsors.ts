/* ===========================================================================
   企業協賛データ
   logo は public/assets/sponsors/ 配下のファイル名。
   正式なロゴ画像を頂けたら同名で上書きするだけで差し替わります。
   =========================================================================== */

export type Sponsor = {
  name: string;
  /** public/assets/sponsors/ からの相対パス */
  logo: string;
  x?: string;
  /** 公式HP / 販売サイト / アプリ */
  site?: string;
  siteLabel?: string;
  /** 提供賞品の要約（協賛一覧に表示） */
  offering?: string;
  note?: string;
};

export const SPONSORS: Sponsor[] = [
  {
    name: 'スリーアール株式会社様',
    logo: '3r.webp',
    x: 'https://x.com/AGRelux',
    site: 'https://agrelux.jp/?utm_source=x&utm_medium=soci',
    siteLabel: '公式HP（AGRelux）',
    offering: '1位賞品 ゲーミングチェア「AGRelux」／集中してたで賞「ZONIQ」',
  },
  {
    name: '株式会社木村酒造様',
    logo: 'kimura-shuzo.webp',
    x: 'https://x.com/fukukomachi1615',
    site: 'https://www.fukukomachi.com/',
    siteLabel: '公式HP',
    offering: '2位賞品 福小町 純米大吟醸 百田40／純米吟醸 福小町 2本セット',
  },
  {
    name: 'ウザク式様',
    logo: 'uzakushiki.webp',
    x: 'https://x.com/mjbook',
    site: 'https://nanikiru.uzakushiki.com/',
    siteLabel: 'アプリ「何切る」',
    offering: '3位賞品 ウザク式何切る問題集 全巻セット（4冊）',
  },
  {
    name: '合資会社奥山商店様',
    logo: 'okuyama-shoten.webp',
    x: 'https://x.com/okuyama_syouten',
    site: 'https://okuyama-sake.com/idamasi',
    siteLabel: '公式HP',
    offering: '4位賞品 純米吟醸いだまし一年熟成／純米吟醸どんぶぐ 2本セット',
  },
  {
    name: 'online pâtisserie Lien様',
    logo: 'lien.webp',
    x: 'https://x.com/Freria_inverse',
    site: 'https://lien0322.base.ec/',
    siteLabel: 'オンラインショップ',
    offering: '5位賞品 クッキー缶／個人協賛感謝賞 おすそ分けクッキーセット',
  },
  {
    name: '麺百式様',
    logo: 'men-hyakushiki.webp',
    x: 'https://x.com/100Hiko',
    site: 'https://ramengame-hyakushiki.stores.jp/items/69854133c232b026777f80b0',
    siteLabel: 'オンラインショップ',
    offering: '6〜7位賞品 冷凍餃子（24個入り）',
  },
  {
    name: 'めりぃぱめりぃ様',
    logo: 'merrypamerry.webp',
    x: 'https://x.com/merrypamerry',
    site: 'https://merrypamerry.base.shop/',
    siteLabel: 'オンラインショップ',
    offering: '9〜10位賞品 麻雀モチーフ雑貨／配信感謝賞 わんコメ 麻雀コメント欄',
  },
];

/* --- スリーアール株式会社様 特設ブロック用 -------------------------------
   クーポンコード・プレスリリースURLが確定したらここを書き換えてください。
   couponCode を '' にすると、クーポン欄は非表示になります。
   ------------------------------------------------------------------------ */
export const AGRELUX = {
  /** ブランド表記（先方指定の名義） */
  brand: 'AGRelux（アグリラックス）',
  /** タグライン。コンセプトとセットで見せる指定 */
  tagline: '日常に、あぐらをかく。',
  concept: 'ゆるむほど、没入できる。',
  logo: '3r.webp',
  zoniqLogo: 'zoniq.webp',

  couponCode: '',            // 例: 'AKEDO2026'
  couponDiscount: '',        // 例: '10%OFF'
  couponValidUntil: '',      // 例: '2026年12月31日まで'
  couponShopUrl: 'https://agrelux.jp/?utm_source=x&utm_medium=soci',
  pressReleaseUrl: '',       // プレスリリースURL
  pressReleaseTitle: '',     // プレスリリース見出し

  /* 先方提供資料「AGRelux_企業情報・紹介文」④ 紹介文（メイン・約380字）より */
  intro: [
    'AGRelux（アグリラックス）は、「日常に、あぐらをかく。」を掲げる、日本のゲーミングチェアブランドです。',
    '「正しい姿勢」を我慢して座り続けるのではなく、あぐらも横座りもできる自由な姿勢のまま、深く集中してほしい——。その思想から、一般的なゲーミングチェアより広い約61.5cmの“食パン型”フラット座面を開発しました。太ももを締めつけず、長い時間でも体が窮屈になりにくい設計です。アームレストも外側へ開く“ハの字”可動で、あぐらをかいても膝が当たりにくい（モデルによる）。Makuake の応援購入から生まれ、ゲーマーや配信クリエイターにも支持されています。',
    '一局一局と長い時間、向き合う麻雀は、まさに「ゆるむほど、没入できる」を体現する競技だと感じています。明戸杯に挑む皆さまのその時間に寄り添えたら——という想いで協賛させていただきます。',
    '優勝者様には、ラインアップ（極／標準／α／座椅子Z）の中から、お住まいの環境に合わせてお好きなモデルをお選びいただけます。',
  ],

  /* ⑧ 特別賞：ZONIQ「集中してたで賞」用 */
  zoniqIntro:
    'ZONIQ（ゾニック）は、AGRelux が手がける集中系サプリメント（一般食品）です。カフェインとロディオラを配合し、「オンに切り替えたい時の集中サポート」をコンセプトにした、においが気にならないハードカプセルタイプ。日本製・GMP認定工場製造・砂糖不使用。決勝戦・秋のエキシビションマッチの「集中してたで賞」としてお贈りします。',
  zoniqCatch: '集中を、味方に。── ZONIQ（集中系サプリメント／一般食品）',
} as const;
