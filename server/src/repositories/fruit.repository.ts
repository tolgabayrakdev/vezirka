import { db } from '../db/knex.js';
import type { CreateFruitInput, FruitRow, UpdateFruitInput } from '../types/fruit.types.js';

const TABLE = 'fruits';

const COLUMNS = ['id', 'name', 'color', 'price', 'stock', 'created_at', 'updated_at'];

export class FruitRepository {
  async findAll(): Promise<FruitRow[]> {
    const fruits = await db(TABLE).select(COLUMNS).orderBy('id', 'asc');

    return fruits as FruitRow[];
  }

  async findById(id: number): Promise<FruitRow | undefined> {
    const fruit = await db(TABLE).select(COLUMNS).where({ id }).first();

    return fruit as FruitRow | undefined;
  }

  async create(data: CreateFruitInput): Promise<FruitRow> {
    const [fruit] = await db(TABLE)
      .insert({
        name: data.name,
        color: data.color ?? null,
        price: data.price ?? 0,
        stock: data.stock ?? 0,
      })
      .returning(COLUMNS);

    return fruit as FruitRow;
  }

  async update(id: number, data: UpdateFruitInput): Promise<FruitRow | undefined> {
    const [fruit] = await db(TABLE)
      .where({ id })
      .update({
        ...data,
        updated_at: db.fn.now(),
      })
      .returning(COLUMNS);

    return fruit as FruitRow | undefined;
  }

  async delete(id: number): Promise<boolean> {
    const deletedCount = await db(TABLE).where({ id }).delete();

    return deletedCount > 0;
  }
}
