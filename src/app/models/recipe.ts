export interface Recipe {
  id: string;
  userId: string;
  name: string;
  type: string;
  originalGravity: number;
  finalGravity: number;
  alcohol: number;
  ibu: number;
}
