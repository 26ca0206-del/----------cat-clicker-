import { UpgradeItem } from './types';

// ゲームプランナーとして考案した20個のアップグレードアイテムリスト
export const UPGRADE_ITEMS: UpgradeItem[] = [
  { id: 'item_1', name: '猫じゃらし', category: 'おもちゃ', effectType: 'クリック', baseCost: 15, baseEffect: 1, flavorText: 'まずは定番。猫の目を釘付けにする。' },
  { id: 'item_2', name: 'カリカリ', category: '餌', effectType: '自動', baseCost: 50, baseEffect: 1, flavorText: '美味しくて栄養満点。猫が自ら寄ってくる。' },
  { id: 'item_3', name: 'またたび', category: '餌', effectType: 'クリック', baseCost: 150, baseEffect: 5, flavorText: '猫を狂わせる魅惑の粉スト。' },
  { id: 'item_4', name: 'ダンボール箱', category: '環境', effectType: '自動', baseCost: 400, baseEffect: 5, flavorText: 'なぜか高級ベッドよりこっちを好む。' },
  { id: 'item_5', name: '高級ねこ缶', category: '餌', effectType: '自動', baseCost: 1200, baseEffect: 15, flavorText: 'プルトップを開ける音だけで猫が飛んでくる。' },
  { id: 'item_6', name: 'レーザーポインター', category: 'おもちゃ', effectType: 'クリック', baseCost: 3000, baseEffect: 30, flavorText: '絶対に捕まえられない赤い光の虜。' },
  { id: 'item_7', name: 'キャットタワー', category: '環境', effectType: '自動', baseCost: 8000, baseEffect: 100, flavorText: '見晴らし最高。王様気分の猫を崇めよ。' },
  { id: 'item_8', name: '魔法のブラシ', category: 'おもちゃ', effectType: 'クリック', baseCost: 20000, baseEffect: 200, flavorText: '撫でられる快感が倍増する魔法のアイテム。' },
  { id: 'item_9', name: 'ちゅ～る詰め合わせ', category: '餌', effectType: '自動', baseCost: 50000, baseEffect: 600, flavorText: 'これさえあればどんな猫も骨抜き。' },
  { id: 'item_10', name: 'ぽかぽかヒーター', category: '環境', effectType: '自動', baseCost: 120000, baseEffect: 1500, flavorText: '冬場の猫の聖地。一度入ると出てこない。' },
  { id: 'item_11', name: '自動給餌器ロボ', category: '環境', effectType: '自動', baseCost: 350000, baseEffect: 4500, flavorText: '時間通りにカリカリを排出する機械の神。' },
  { id: 'item_12', name: 'マタタビの原木', category: '餌', effectType: 'クリック', baseCost: 1000000, baseEffect: 12000, flavorText: '直接かじらせるワイルドなプレイスタイル。' },
  { id: 'item_13', name: '猫専門マッサージ師', category: '環境', effectType: '自動', baseCost: 2500000, baseEffect: 35000, flavorText: '全身のツボを刺激し、極上の癒やしを提供。' },
  { id: 'item_14', name: '全自動ネコトイレ', category: '環境', effectType: '自動', baseCost: 8000000, baseEffect: 120000, flavorText: '常に清潔。用を足すたびに満足度が上がる。' },
  { id: 'item_15', name: '特注・黄金の鈴', category: 'おもちゃ', effectType: 'クリック', baseCost: 25000000, baseEffect: 300000, flavorText: 'チリンと鳴るたび、愛が爆発的に溢れ出す。' },
  { id: 'item_16', name: '猫専用おこた', category: '環境', effectType: '自動', baseCost: 80000000, baseEffect: 1000000, flavorText: '無限に猫を吸い込むブラックホール的こたつ。' },
  { id: 'item_17', name: 'マタタビ農園', category: '環境', effectType: '自動', baseCost: 300000000, baseEffect: 4000000, flavorText: '新鮮なマタタビを自家栽培。猫の楽園。' },
  { id: 'item_18', name: 'キャット・ゴッドの像', category: '環境', effectType: '自動', baseCost: 1000000000, baseEffect: 15000000, flavorText: '猫の神を祀る祭壇。周囲に愛のオーラを放つ。' },
  { id: 'item_19', name: '猫用リゾートアイランド', category: '環境', effectType: '自動', baseCost: 5000000000, baseEffect: 80000000, flavorText: '島を丸ごと猫のために開発した究極の贅沢。' },
  { id: 'item_20', name: '宇宙の猫法則', category: '環境', effectType: 'クリック', baseCost: 90000000000, baseEffect: 999999999, flavorText: '宇宙の真理。撫でるたびにビッグバンが起きる。' }
];
