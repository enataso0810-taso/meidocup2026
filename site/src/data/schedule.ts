/* ===========================================================================
   当日スケジュール
   =========================================================================== */

export type ScheduleItem = {
  time: string;
  title: string;
  /** 副題（東風戦／半荘戦 など） */
  sub?: string;
  detail?: string[];
  /** 演出上の種別 */
  kind: 'standby' | 'ceremony' | 'match' | 'break' | 'exhibition' | 'award';
  /** 勝ち上がり条件 */
  advance?: string;
};

export const SCHEDULE: ScheduleItem[] = [
  { time: '12:50〜', title: '待機', kind: 'standby' },
  {
    time: '13:00〜',
    title: '本会場（神視点）配信スタート',
    sub: '開会式',
    detail: ['大会についての各種説明'],
    kind: 'ceremony',
  },
  {
    time: '13:30〜',
    title: '予選 1回戦',
    sub: '東風戦',
    advance: '1,2位勝ち上がり',
    kind: 'match',
  },
  { time: '', title: '予選 2回戦', sub: '東風戦', advance: '1,2位勝ち上がり', kind: 'match' },
  { time: '', title: '予選 3回戦', sub: '半荘戦', advance: '1,2位勝ち上がり', kind: 'match' },
  { time: '', title: '休憩', sub: '10分間', kind: 'break' },
  { time: '', title: '準決勝', sub: '半荘戦', advance: '1位勝ち上がり', kind: 'match' },
  {
    time: '',
    title: '決勝',
    sub: '半荘戦',
    detail: ['トーナメント終了', '※エキシビジョンマッチダービーの投票締め切り'],
    kind: 'match',
  },
  { time: '', title: '休憩', sub: '10分間', kind: 'break' },
  { time: '', title: '秋のエキシビジョンマッチ', kind: 'exhibition' },
  { time: '', title: '各抽選の当選発表とトーナメント表彰式', detail: ['終了'], kind: 'award' },
];

export const SCHEDULE_NOTE =
  '※対局の進行状況によって時間が前後する場合がございます。ご了承ください。';
