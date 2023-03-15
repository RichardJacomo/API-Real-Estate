import { Router } from "express";
import { listAllSchedulesController } from "../controllers/schedule/getListSchedules.controllers";
import { createScheduleController } from "../controllers/schedule/postSchedule.controllers";
import { authMiddleware } from "../middlewares/authorization.middleware";
import { validateBodyMiddleware } from "../middlewares/validateBody.middlewares";
import { verifyUserIsAdmin } from "../middlewares/verifyIsAdmin.middleware";
import { idRealEstateExistsMiddleware } from "../middlewares/verifyRealEstateIdExists.middleware";
import { scheduleCreateSchema } from "../schemas/schedule.schema";

const routerSchedules: Router = Router();

routerSchedules.post(
  "",
  authMiddleware,
  validateBodyMiddleware(scheduleCreateSchema),
  createScheduleController
);
routerSchedules.get(
  "/realEstate/:id",
  idRealEstateExistsMiddleware,
  authMiddleware,
  verifyUserIsAdmin,
  listAllSchedulesController
);

export default routerSchedules;
