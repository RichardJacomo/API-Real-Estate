import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";

const deleteUserService = async (idUser: number): Promise<void> => {
  const userRepos: Repository<User> = AppDataSource.getRepository(User);

  const user = await userRepos.findOne({
    where: {
      id: idUser,
    },
  });

  await userRepos.softRemove(user!);
};

export default deleteUserService;
