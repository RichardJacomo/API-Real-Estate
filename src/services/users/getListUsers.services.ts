import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import { IUsersListReturn } from "../../interfaces/users.interfaces";
import { allUsersReturn } from "../../schemas/users.schema";

const listUsersService = async (): Promise<IUsersListReturn> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const findUsers: Array<User> = await userRepo.find();

  const users = allUsersReturn.parse(findUsers);

  return users;
};

export { listUsersService };
