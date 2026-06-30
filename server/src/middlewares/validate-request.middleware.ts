import type { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';
import { BadRequestException } from '../exceptions/http.exception.js';

type RequestSchemas = {
  body?: z.ZodType;
  params?: z.ZodType;
};

function formatZodError(error: ZodError): string {
  return error.issues.map((issue) => issue.message).join(', ');
}

function parseSchema(schema: z.ZodType | undefined, value: unknown): unknown {
  if (!schema) {
    return value;
  }

  const result = schema.safeParse(value);

  if (!result.success) {
    throw new BadRequestException(formatZodError(result.error));
  }

  return result.data;
}

export function validateRequest(schemas: RequestSchemas) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      req.body = parseSchema(schemas.body, req.body);
      parseSchema(schemas.params, req.params);
      next();
    } catch (error) {
      next(error);
    }
  };
}
