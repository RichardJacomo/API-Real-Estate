import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/users.entity";
import { AppError } from "../errors";

const emailExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userRepo = AppDataSource.getRepository(User);

  const findUserByEmail = await userRepo.findOne({
    where: { email: req.body.email },
    withDeleted: true,
  });

  if (findUserByEmail) throw new AppError("Email already exists", 409);

  return next();
};

export { emailExistsMiddleware };
