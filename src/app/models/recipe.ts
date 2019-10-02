import { Ingredient } from './ingredient';

export interface Recipe {
  id: number;
  userId: number;
  name: string;
  type: string;
  originalGravity: number;
  finalGravity: number;
  alcohol: number;
  ibu: number;
  materials: Ingredient[];
  hops: Ingredient[];
  yeast: string;
  mashing: Ingredient[];
  brewing: Ingredient[];
  fermentation: Ingredient[];
}
