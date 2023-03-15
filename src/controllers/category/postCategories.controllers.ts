import { Request, Response } from "express";
import { createCategoryService } from "../../services/category/postCategories.services";

const createCategoryController = async (req: Request, res: Response) => {
  const category = await createCategoryService(req.body);
  return res.status(201).json(category);
};

export { createCategoryController };
