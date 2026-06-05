export type ItemCategory = '餌' | 'おもちゃ' | '環境';
export type EffectType = 'クリック' | '自動';

export interface UpgradeItem {
  id: string;
  name: string;
  category: ItemCategory;
  effectType: EffectType;
  baseCost: number;
  baseEffect: number;
  flavorText: string;
}
