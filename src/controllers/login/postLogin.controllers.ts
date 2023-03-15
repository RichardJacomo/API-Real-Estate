import { Request, Response } from "express";
import { loginServices } from "../../services/login/postLogin.services";

const loginController = async (req: Request, res: Response) => {
  const token = await loginServices(req.body);

  return res.status(200).json({ token });
};

export { loginController };
