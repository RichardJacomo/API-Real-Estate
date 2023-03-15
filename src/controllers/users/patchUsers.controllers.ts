import { Request, Response } from "express";
import { updateUserService } from "../../services/users/patchUsers.services";

const updateUsersController = async (req: Request, res: Response) => {
  const user = await updateUserService(
    Number(req.params.id),
    req.body,
    req.user
  );
  return res.status(200).json(user);
};

export { updateUsersController };
