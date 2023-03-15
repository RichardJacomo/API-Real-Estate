import { z } from "zod";
import { returnCategoryCreateSchema } from "../schemas/category.schema";

export type ICategoriesReturn = z.infer<typeof returnCategoryCreateSchema>;
