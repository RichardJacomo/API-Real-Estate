import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { AppError } from "../../errors";
import { ICategoriesReturn } from "../../interfaces/categories.interfaces";
import { returnCategoryCreateSchema } from "../../schemas/category.schema";

const createCategoryService = async (
  payload: any
): Promise<ICategoriesReturn> => {
  const categoryRepo = AppDataSource.getRepository(Category);

  const findCategoryByName = await categoryRepo.findOne({
    where: { name: payload.name },
  });

  if (findCategoryByName) throw new AppError("Category already exists", 409);

  const category = categoryRepo.create(payload);

  await categoryRepo.save(category);

  const newCategory = returnCategoryCreateSchema.parse(category);

  return newCategory;
};

export { createCategoryService };
