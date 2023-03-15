import { compare } from "bcryptjs";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";
import { IPayloadLogin } from "../../interfaces/login.interfaces";

const loginServices = async (payload: IPayloadLogin): Promise<string> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const findUser = await userRepo.findOne({
    where: { email: payload.email },
  });

  let pwdMatch: boolean = true;
  if (findUser && payload.password)
    pwdMatch = await compare(payload.password, findUser.password);

  if (!pwdMatch || !findUser) throw new AppError("Invalid credentials", 401);

  const token: string = jwt.sign(
    {
      admin: findUser.admin,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
      subject: String(findUser.id),
    }
  );

  return token;
};

export { loginServices };
