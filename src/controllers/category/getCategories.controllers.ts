import { Request, Response } from "express";
import { listCategoryService } from "../../services/category/getCategories.services";

const listCategoryController = async (req: Request, res: Response) => {
  const categories = await listCategoryService();

  return res.json(categories);
};

export { listCategoryController };
