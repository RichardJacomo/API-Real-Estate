import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Category } from "../entities";
import { AppError } from "../errors";

const idCategoryExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const categoryRepo = AppDataSource.getRepository(Category);

  const findCategoryById = await categoryRepo.findOne({
    where: {
      id: parseInt(req.params.id),
    },
  });
  if (!findCategoryById) throw new AppError("Category not found", 404);

  return next();
};

export { idCategoryExistsMiddleware };
