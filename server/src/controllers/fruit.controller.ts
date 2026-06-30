import type { Request, Response } from 'express';
import type { CreateFruitBody, UpdateFruitBody } from '../schemas/fruit.schemas.js';
import { FruitService } from '../services/fruit.service.js';

export class FruitController {
  constructor(private readonly fruitService: FruitService) {}

  listFruits = async (_req: Request, res: Response): Promise<void> => {
    const fruits = await this.fruitService.listFruits();

    res.json(fruits);
  };

  getFruit = async (req: Request, res: Response): Promise<void> => {
    const fruit = await this.fruitService.getFruitById(Number(req.params.id));

    res.json(fruit);
  };

  createFruit = async (req: Request, res: Response): Promise<void> => {
    const body = req.body as CreateFruitBody;
    const fruit = await this.fruitService.createFruit(body);

    res.status(201).json(fruit);
  };

  updateFruit = async (req: Request, res: Response): Promise<void> => {
    const body = req.body as UpdateFruitBody;
    const fruit = await this.fruitService.updateFruit(Number(req.params.id), body);

    res.json(fruit);
  };

  deleteFruit = async (req: Request, res: Response): Promise<void> => {
    await this.fruitService.deleteFruit(Number(req.params.id));

    res.status(204).send();
  };
}
