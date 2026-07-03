
export type Item = {
  id: string;
  name: string;
  value: number; // Storing value in USD
  rarity: string;
  categoryId: string;
  gameId: string;
  imageUrl?: string;
};

export type Rarity = {
  id: string;
  name: string;
  color: string;
  order: number;
  gameId?: string; 
}

export type Game = {
  id: string;
  name: string;
  imageUrl?: string;
}

export type Category = {
  id: string;
  name: string;
  gameId: string;
}
