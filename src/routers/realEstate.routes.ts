import { Router } from "express";
import { listAllRealEstateController } from "../controllers/realEstate/getListAllRealEstate.controllers";
import { createRealEstateController } from "../controllers/realEstate/postRealEstate.controllers";
import { authMiddleware } from "../middlewares/authorization.middleware";
import { validateBodyMiddleware } from "../middlewares/validateBody.middlewares";
import { verifyUserIsAdmin } from "../middlewares/verifyIsAdmin.middleware";
import { realEstateSchema } from "../schemas/realEstate.schema";

const routerRealEstate: Router = Router();

routerRealEstate.post(
  "",
  authMiddleware,
  verifyUserIsAdmin,
  validateBodyMiddleware(realEstateSchema),
  createRealEstateController
);
routerRealEstate.get("", listAllRealEstateController);

export default routerRealEstate;
