/* ===========================================================================
   クリエイター紹介 ／ 大会サポートスタッフ
   image は public/assets/creators/ 配下のファイル名。
   =========================================================================== */

/*
 * 紹介文が未入稿の方を追加する場合は、bio に想定文字数ぶんの仮テキストを
 * 入れておくとレイアウトを確認できます。例:
 *   bio: 'サンプルテキスト160文字'.repeat(10).slice(0, 160),
 */

export type Creator = {
  name: string;
  role: string;
  /** public/assets/creators/ からの相対パス。未入稿の場合は省略可 */
  image?: string;
  /** 本人からのメッセージ */
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
    bio: 'これほど熱い企画にデザイナーとして関わることができたことを、非常に幸せに思っています。参加者の皆様が最後の一局まで悔いなく闘い、勝敗にかかわらず、お一人お一人にとって記憶に残る一日となることを心から願っております。',
    x: 'https://x.com/153day_D',
    link: 'https://www.foriio.com/153day',
    linkLabel: 'foriio',
  },
  {
    name: '望月南雲様',
    role: '大会キービジュアルイラスト／トロフィーデザイン',
    image: 'mochizuki-nagumo.webp',
    bio: 'このような賑やかな大会でキービジュアルを担当させていただき、とても嬉しいです！ 皆様の一手が、これからどのような局面を描いていくのか。主催者様方、参加者の皆様、視聴者の皆様と一緒に、楽しく熱い時間を過ごせることを心から楽しみにしております！',
    x: 'https://x.com/mochinagumo',
    link: 'https://lit.link/mochinagumo',
    linkLabel: 'lit.link',
  },
  {
    name: '桜せちょ様',
    role: '大会テーマ楽曲',
    image: 'sakura-secho.webp',
    bio: 'ツモ！ 今回テーマ曲を制作させていただきました！ 桜せちょです～！！ 麻雀に関するアレやコレな要素を入れて、アジアテイストにカッコ可愛く仕上げました！ イベントを通して、この曲が皆さんをより色付ける存在になれば幸いです。よろしくお願いいたします～～！！！',
    x: 'https://x.com/sechosakura',
    link: 'https://www.foriio.com/sechosakura',
    linkLabel: 'foriio',
  },
  {
    name: '銀貨先生様',
    role: '大会公式サイト',
    image: 'ginka.webp',
    bio: '今回お声がけいただいて運営に参加させていただけることになりました。イベントが盛り上がるように、そして協賛いただいた企業・クリエイター・ゲスト全員の魅力が紹介できるように、精一杯設計とデザインを頑張ります。楽しんでいってください！',
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
    bio: '皆様の良き思い出となる大会となりますようサポートさせていただきます。皆様の熱い対局を楽しみにしております。',
    x: 'https://x.com/dartsv_mitsu',
  },
  {
    name: 'ネムメル様',
    role: 'モデレーター',
    image: 'nemumeru.webp',
    bio: '参加する皆様方にはルールをしっかり守り、大会に臨んでください。狐さんは裏で支えたり、飲酒したりしています（コラっ）。皆様のご活躍を心から応援しております。麻雀を楽しみましょう。',
    x: 'https://x.com/marchen_gs',
  },
];

/* ===========================================================================
   主催賞の賞品を制作されたクリエイター
   賞品ページの「主催賞」セクションに掲載します。
   アイコンが届いたら public/assets/creators/ に置き、image: を指定してください
   （未指定の場合は頭文字のプレースホルダーが表示されます）。
   =========================================================================== */
export const PRIZE_CREATORS: Creator[] = [
  {
    name: 'べーぐる様',
    role: 'お前はゴリラで賞 賞品制作',
    image: 'bagelnuts.webp',
    bio: '明戸杯2026開催おめでとうございます！ イラストレーターのべーぐるです。麻雀を楽しむ活動者さんを全力応援しています！ 参加される皆さまにとって思い出に残る大会になりますように！',
    x: 'https://x.com/bagelnuts_',
    link: 'https://tsunagu.cloud/products/64150',
    linkLabel: 'つなぐ',
  },
  {
    name: '浅葱様',
    role: 'おしてもあたらないで賞 賞品制作',
    image: 'asagi.webp',
    bio: 'VTuber様向けのサムネイルやロゴを中心に制作している、デザイナーの浅葱です。大会賞品として、ご入賞者様だけのオリジナルサムネイルを制作いたします。活動のお力になれる一枚を目指し、心を込めて制作させていただきます。',
    x: 'https://x.com/asagi_san_san',
    link: 'https://lit.link/asagiya',
    linkLabel: 'lit.link',
  },
];
