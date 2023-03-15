import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/users.entity";
import { AppError } from "../errors";

const idExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userRepo = AppDataSource.getRepository(User);

  const findUserById = await userRepo.findOne({
    where: {
      id: parseInt(req.params.id),
    },
  });
  if (!findUserById) throw new AppError("User not found", 404);

  return next();
};

export { idExistsMiddleware };
