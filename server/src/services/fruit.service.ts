import { NotFoundException } from '../exceptions/http.exception.js';
import { FruitRepository } from '../repositories/fruit.repository.js';
import type {
  CreateFruitInput,
  Fruit,
  FruitRow,
  UpdateFruitInput
} from '../types/fruit.types.js';

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
  constructor(private readonly fruitRepository: FruitRepository) {}

  async listFruits(): Promise<Fruit[]> {
    const rows = await this.fruitRepository.findAll();

    return rows.map(mapFruit);
  }

  async getFruitById(id: number): Promise<Fruit> {
    const row = await this.fruitRepository.findById(id);

    if (!row) {
      throw new NotFoundException('Fruit not found');
    }

    return mapFruit(row);
  }

  async createFruit(input: CreateFruitInput): Promise<Fruit> {
    const row = await this.fruitRepository.create(input);

    return mapFruit(row);
  }

  async updateFruit(id: number, input: UpdateFruitInput): Promise<Fruit> {
    const row = await this.fruitRepository.update(id, input);

    if (!row) {
      throw new NotFoundException('Fruit not found');
    }

    return mapFruit(row);
  }

  async deleteFruit(id: number): Promise<void> {
    const deleted = await this.fruitRepository.delete(id);

    if (!deleted) {
      throw new NotFoundException('Fruit not found');
    }
  }
}
