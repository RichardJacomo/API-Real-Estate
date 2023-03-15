import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../../entities";
import { AppError } from "../../errors";
import { IpayloadRealEstate } from "../../interfaces/realEstate.interfaces";

const createRealEstateService = async (
  payload: IpayloadRealEstate
): Promise<RealEstate | null> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);
  const addressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const existingAddress = await addressRepository.findOne({
    where: {
      street: payload.address.street,
      zipCode: payload.address.zipCode,
      city: payload.address.city,
      state: payload.address.state,
    },
  });

  if (existingAddress) throw new AppError("Address already exists", 409);
  const addressBody: Address | any = addressRepository.create(payload.address);
  await addressRepository.save(addressBody);

  let category: Category | any;
  if (payload.category) {
    category = await categoryRepository.findOne({
      where: { id: payload.category },
    });
    if (!category) throw new AppError("Category do not exists", 404);
  }

  const realEstate: RealEstate = realEstateRepository.create({
    value: payload.value,
    size: payload.size,
    address: addressBody,
    category: category,
  });

  await realEstateRepository.save(realEstate);

  return realEstate;
};

export { createRealEstateService };
