import { NextFunction, Request, Response } from "express";

import { ZodTypeAny } from "zod";

const validateBodyMiddleware =
  (schema: ZodTypeAny) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const validateData = schema.parse(req.body);
    req.body = validateData;

    return next();
  };

export { validateBodyMiddleware };
