import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";

const listRealEstateService = async (id: number): Promise<Category | null> => {
  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const schedules = await categoryRepo
    .createQueryBuilder("categories")
    .innerJoinAndSelect("categories.realEstate", "realEstate")
    .where("categories.id = :id", { id })
    .getOne();

  return schedules;
};

export { listRealEstateService };
