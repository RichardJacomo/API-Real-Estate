import { Request, Response } from "express";
import { listAllRealEstateService } from "../../services/realEstate/getListAllRealEstate.services";

const listAllRealEstateController = async (req: Request, res: Response) => {
  const realEstates = await listAllRealEstateService();

  return res.json(realEstates);
};

export { listAllRealEstateController };
