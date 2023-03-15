import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import { returnUserCreateSchema } from "../../schemas/users.schema";
import { IUsersReturn } from "../../interfaces/users.interfaces";
import { AppError } from "../../errors";

const updateUserService = async (
  id: number,
  payload: any,
  user: any
): Promise<IUsersReturn> => {
  const userId: string = user.ID;
  const userAdmin: string = user.admin;
  let updatedUser: User | null;
  const userRepo = AppDataSource.getRepository(User);

  const findUserByEmail = await userRepo.findOne({
    where: { email: payload.email },
    withDeleted: true,
  });

  updatedUser = await userRepo.findOneBy({ id: Number(userId) });

  if (userAdmin) {
    if (findUserByEmail && findUserByEmail.id !== id && payload.email)
      throw new AppError("Email already exists", 409);

    await userRepo.update(
      { id },
      {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        admin: payload.admin,
      }
    );
    updatedUser = await userRepo.findOneBy({ id: id });
  } else if (!userAdmin && user.ID === id) {
    if (findUserByEmail && payload.email)
      throw new AppError("Email already exists", 409);

    await userRepo.update(
      { id },
      { name: payload.name, email: payload.email, password: payload.password }
    );

    updatedUser = await userRepo.findOneBy({ id: id });
  } else if (!userAdmin && user.ID !== id)
    throw new AppError("Insufficient permission", 403);

  const newUser = returnUserCreateSchema.parse(updatedUser);
  return newUser;
};

export { updateUserService };
