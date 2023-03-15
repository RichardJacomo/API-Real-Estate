import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { ICategoriesReturn } from "../../interfaces/categories.interfaces";

const listCategoryService = async (): Promise<ICategoriesReturn[]> => {
  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const findCategories: Array<Category> = await categoryRepo.find();

  return findCategories;
};

export { listCategoryService };
