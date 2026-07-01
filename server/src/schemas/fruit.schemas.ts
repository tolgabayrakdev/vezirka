import { z } from 'zod';

export const fruitParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const createFruitSchema = z.object({
  name: z.string().trim().min(1),
  color: z.string().trim().min(1).nullable().optional(),
  price: z.number().nonnegative().optional(),
  stock: z.number().int().nonnegative().optional(),
});

export const updateFruitSchema = createFruitSchema
  .partial()
  .refine((value) => Object.keys(value).length > 0, 'At least one field is required');

export type CreateFruitBody = z.infer<typeof createFruitSchema>;
export type UpdateFruitBody = z.infer<typeof updateFruitSchema>;
