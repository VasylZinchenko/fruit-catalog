export interface Nutritions {
  calories: number;
  carbohydrates: number;
  fat: number;
  protein: number;
  sugar: number;
}

export interface MainFruitInfo {
  family: string;
  genus: string;
  name: string;
  order: string;
}

export interface AdditionalInfo {
  id: number;
  img: string;
  isCompared: boolean;
  isFavorited: boolean;
}

export interface Fruits extends MainFruitInfo, AdditionalInfo {
  nutritions: Nutritions;
}
