import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import { IUsersPayload, IUsersReturn } from "../../interfaces/users.interfaces";
import { returnUserCreateSchema } from "../../schemas/users.schema";

const createUserService = async (
  payload: IUsersPayload
): Promise<IUsersReturn> => {
  const userRepo = AppDataSource.getRepository(User);
  const user = userRepo.create(payload);

  await userRepo.save(user);

  const newUser = returnUserCreateSchema.parse(user);

  return newUser;
};

export { createUserService };
