import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";

const verifyUserIsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isAdmin = req.user.admin;

  if (isAdmin) next();
  if (!isAdmin) throw new AppError("Insufficient permission", 403);
};

export { verifyUserIsAdmin };
