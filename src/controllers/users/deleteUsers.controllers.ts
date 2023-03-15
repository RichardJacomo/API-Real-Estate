import deleteUserService from "../../services/users/deleteUsers.services";
import { Request, Response } from "express";

const deleteUserController = async (req: Request, res: Response) => {
  await deleteUserService(parseInt(req.params.id));

  return res.status(204).send();
};

export { deleteUserController };
