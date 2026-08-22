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
    logo: '3r.svg',
    x: 'https://x.com/AGRelux',
    site: 'https://agrelux.jp/?utm_source=x&utm_medium=soci',
    siteLabel: '公式HP（AGRelux）',
    offering: '1位賞品 ゲーミングチェア「AGRelux」／集中してたで賞「ZONIQ」',
  },
  {
    name: '株式会社木村酒造様',
    logo: 'kimura-shuzo.svg',
    x: 'https://x.com/fukukomachi1615',
    site: 'https://www.fukukomachi.com/',
    siteLabel: '公式HP',
    offering: '2位賞品 福小町 純米大吟醸 百田40／純米吟醸 福小町 2本セット',
  },
  {
    name: 'ウザク式様',
    logo: 'uzakushiki.svg',
    x: 'https://x.com/mjbook',
    site: 'https://nanikiru.uzakushiki.com/',
    siteLabel: 'アプリ「何切る」',
    offering: '3位賞品 ウザク式何切る問題集 全巻セット（4冊）',
  },
  {
    name: '合資会社奥山商店様',
    logo: 'okuyama-shoten.svg',
    x: 'https://x.com/okuyama_syouten',
    site: 'https://okuyama-sake.com/idamasi',
    siteLabel: '公式HP',
    offering: '4位賞品 純米吟醸いだまし一年熟成／純米吟醸どんぶぐ 2本セット',
  },
  {
    name: 'online pâtisserie Lien様',
    logo: 'lien.svg',
    x: 'https://x.com/Freria_inverse',
    site: 'https://lien0322.base.ec/',
    siteLabel: 'オンラインショップ',
    offering: '5位賞品 クッキー缶／個人協賛感謝賞 おすそ分けクッキーセット',
  },
  {
    name: '麺百式様',
    logo: 'men-hyakushiki.svg',
    x: 'https://x.com/100Hiko',
    site: 'https://ramengame-hyakushiki.stores.jp/items/69854133c232b026777f80b0',
    siteLabel: 'オンラインショップ',
    offering: '6〜7位賞品 冷凍餃子（24個入り）',
  },
  {
    name: 'めりぃぱめりぃ様',
    logo: 'merrypamerry.svg',
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
  couponCode: '',            // 例: 'AKEDO2026'
  couponDiscount: '',        // 例: '10%OFF'
  couponValidUntil: '',      // 例: '2026年12月31日まで'
  couponShopUrl: 'https://agrelux.jp/?utm_source=x&utm_medium=soci',
  pressReleaseUrl: '',       // プレスリリースURL
  pressReleaseTitle: '',     // プレスリリース見出し
  pressReleaseSummary:
    'AGRelux（アグリラックス）は「日常に、あぐらをかく。」を掲げる日本のゲーミングチェアブランド。約61.5cmの広いフラット座面で、あぐらのまま長い対局に没入できます。',
} as const;
