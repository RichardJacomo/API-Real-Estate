import { Request, Response } from "express";
import { createRealEstateService } from "../../services/realEstate/postRealEstate.services";

const createRealEstateController = async (req: Request, res: Response) => {
  const real = await createRealEstateService(req.body);
  return res.status(201).json(real);
};

export { createRealEstateController };
