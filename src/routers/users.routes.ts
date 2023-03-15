import { Router } from "express";
import { deleteUserController } from "../controllers/users/deleteUsers.controllers";
import { listUsersController } from "../controllers/users/getListUsers.controllers";
import { updateUsersController } from "../controllers/users/patchUsers.controllers";
import { createUserController } from "../controllers/users/postCreateUsers.controllers";
import { authMiddleware } from "../middlewares/authorization.middleware";
import { validateBodyMiddleware } from "../middlewares/validateBody.middlewares";
import { emailExistsMiddleware } from "../middlewares/validateEmailExists.middlewares";
import { idExistsMiddleware } from "../middlewares/validateIdExists.middleware";
import { verifyUserIsAdmin } from "../middlewares/verifyIsAdmin.middleware";
import { userCreateSchema, userUpdateSchema } from "../schemas/users.schema";

const router: Router = Router();

router.post(
  "",
  emailExistsMiddleware,
  validateBodyMiddleware(userCreateSchema),
  createUserController
);

router.get("", authMiddleware, verifyUserIsAdmin, listUsersController);
router.patch(
  "/:id",
  idExistsMiddleware,
  authMiddleware,
  validateBodyMiddleware(userUpdateSchema),
  updateUsersController
);

router.delete(
  "/:id",
  idExistsMiddleware,
  authMiddleware,
  verifyUserIsAdmin,
  deleteUserController
);

export default router;
