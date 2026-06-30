import type { Request, Response } from 'express';
import type { CreateFruitBody, FruitParams, UpdateFruitBody } from '../schemas/fruit.schemas.js';
import { FruitService } from '../services/fruit.service.js';

export class FruitController {
  constructor(private readonly fruitService: FruitService) {}

  listFruits = async (_req: Request, res: Response): Promise<void> => {
    const fruits = await this.fruitService.listFruits();

    res.json(fruits);
  };

  getFruit = async (req: Request, res: Response): Promise<void> => {
    const params = req.params as unknown as FruitParams;
    const fruit = await this.fruitService.getFruitById(params.id);

    res.json(fruit);
  };

  createFruit = async (req: Request, res: Response): Promise<void> => {
    const body = req.body as CreateFruitBody;
    const fruit = await this.fruitService.createFruit(body);

    res.status(201).json(fruit);
  };

  updateFruit = async (req: Request, res: Response): Promise<void> => {
    const params = req.params as unknown as FruitParams;
    const body = req.body as UpdateFruitBody;
    const fruit = await this.fruitService.updateFruit(params.id, body);

    res.json(fruit);
  };

  deleteFruit = async (req: Request, res: Response): Promise<void> => {
    const params = req.params as unknown as FruitParams;

    await this.fruitService.deleteFruit(params.id);

    res.status(204).send();
  };
}
