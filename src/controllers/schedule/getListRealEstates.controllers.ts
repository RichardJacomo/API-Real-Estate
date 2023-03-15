import { Request, Response } from "express";
import { listRealEstateService } from "../../services/category/getListRealEstates.services";

const listRealEstateController = async (req: Request, res: Response) => {
  const realEstates = await listRealEstateService(Number(req.params.id));

  return res.json(realEstates);
};

export { listRealEstateController };
