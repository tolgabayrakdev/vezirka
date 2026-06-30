import { db } from '../db/knex.js';
import { NotFoundException } from '../exceptions/http.exception.js';

export type Fruit = {
  id: number;
  name: string;
  color: string | null;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateFruitInput = {
  name: string;
  color?: string | null;
  price?: number;
  stock?: number;
};

export type UpdateFruitInput = Partial<CreateFruitInput>;

type FruitRow = {
  id: number;
  name: string;
  color: string | null;
  price: string | number;
  stock: number;
  created_at: Date;
  updated_at: Date;
};

function mapFruit(row: FruitRow): Fruit {
  return {
    id: row.id,
    name: row.name,
    color: row.color,
    price: Number(row.price),
    stock: row.stock,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export class FruitService {
  async listFruits(): Promise<Fruit[]> {
    const rows = await db<FruitRow>('fruits').select('*').orderBy('id', 'asc');

    return rows.map(mapFruit);
  }

  async getFruitById(id: number): Promise<Fruit> {
    const row = await db<FruitRow>('fruits').where({ id }).first();

    if (!row) {
      throw new NotFoundException('Fruit not found');
    }

    return mapFruit(row);
  }

  async createFruit(input: CreateFruitInput): Promise<Fruit> {
    const [row] = await db<FruitRow>('fruits')
      .insert({
        name: input.name,
        color: input.color ?? null,
        price: input.price ?? 0,
        stock: input.stock ?? 0
      })
      .returning('*');

    return mapFruit(row);
  }

  async updateFruit(id: number, input: UpdateFruitInput): Promise<Fruit> {
    const [row] = await db<FruitRow>('fruits')
      .where({ id })
      .update({
        ...input,
        updated_at: db.fn.now()
      })
      .returning('*');

    if (!row) {
      throw new NotFoundException('Fruit not found');
    }

    return mapFruit(row);
  }

  async deleteFruit(id: number): Promise<void> {
    const deletedCount = await db<FruitRow>('fruits').where({ id }).delete();

    if (deletedCount === 0) {
      throw new NotFoundException('Fruit not found');
    }
  }
}
