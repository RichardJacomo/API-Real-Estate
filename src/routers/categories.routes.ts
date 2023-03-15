import { Router } from "express";
import { listCategoryController } from "../controllers/category/getCategories.controllers";
import { createCategoryController } from "../controllers/category/postCategories.controllers";
import { validateBodyMiddleware } from "../middlewares/validateBody.middlewares";
import { verifyUserIsAdmin } from "../middlewares/verifyIsAdmin.middleware";
import { categoryCreateSchema } from "../schemas/category.schema";
import { authMiddleware } from "../middlewares/authorization.middleware";
import { listRealEstateController } from "../controllers/schedule/getListRealEstates.controllers";
import { idCategoryExistsMiddleware } from "../middlewares/validateIdCategoryExists.middleware";

const routerCategories: Router = Router();

routerCategories.post(
  "",
  authMiddleware,
  verifyUserIsAdmin,
  validateBodyMiddleware(categoryCreateSchema),
  createCategoryController
);
routerCategories.get("", listCategoryController);

routerCategories.get(
  "/:id/realEstate",
  idCategoryExistsMiddleware,
  listRealEstateController
);

export default routerCategories;
