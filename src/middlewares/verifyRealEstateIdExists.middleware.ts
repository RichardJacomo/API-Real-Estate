import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { RealEstate } from "../entities";
import { AppError } from "../errors";

const idRealEstateExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const realEstateRepo = AppDataSource.getRepository(RealEstate);

  const findRealEstateById = await realEstateRepo.findOne({
    where: {
      id: parseInt(req.params.id),
    },
  });

  if (!findRealEstateById) throw new AppError("RealEstate not found", 404);

  return next();
};

export { idRealEstateExistsMiddleware };
