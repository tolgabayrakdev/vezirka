export type Fruit = {
  id: number;
  name: string;
  color: string | null;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
};

export type FruitRow = {
  id: number;
  name: string;
  color: string | null;
  price: string | number;
  stock: number;
  created_at: Date;
  updated_at: Date;
};

export type CreateFruitInput = {
  name: string;
  color?: string | null;
  price?: number;
  stock?: number;
};

export type UpdateFruitInput = Partial<CreateFruitInput>;
