export interface Recipe {
  id: number;
  userId: number;
  name: string;
  type: string;
  originalGravity: number;
  finalGravity: number;
  alcohol: number;
  ibu: number;
}
