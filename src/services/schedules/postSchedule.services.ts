import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule } from "../../entities";
import { AppError } from "../../errors";
import { ScheduleCreationResult } from "../../interfaces/schedule.interfaces";

const createScheduleService = async (
  payload: any,
  userId: any
): Promise<ScheduleCreationResult> => {
  const parts = payload.date.split("-");
  const year = parts[0];
  const day = parts[1];
  const month = parts[2];
  const newDateString = `${year}-${month}-${day}`;

  const scheduleRepo = AppDataSource.getRepository(Schedule);
  const realEstateRepo = AppDataSource.getRepository(RealEstate);

  if (payload.hour < "08:00" || payload.hour > "18:00")
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);

  const dayOfWeek = new Date(payload.date).getDay();

  if (dayOfWeek === 0 || dayOfWeek === 6)
    throw new AppError("Invalid date, work days are monday to friday", 400);

  const verifyAvaiability = await scheduleRepo
    .createQueryBuilder("schedules_users_properties")
    .where("schedules_users_properties.realEstate.id = :realEstate", {
      realEstate: payload.realEstateId,
    })
    .andWhere("schedules_users_properties.hour = :hour", { hour: payload.hour })
    .andWhere("schedules_users_properties.date = :date", {
      date: newDateString,
    })
    .getOne();

  if (verifyAvaiability) {
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }

  const existingScheduleToUser = await scheduleRepo
    .createQueryBuilder("schedules")
    .where("schedules.user = :user", { user: userId })
    .andWhere("schedules.hour = :hour", { hour: payload.hour })
    .andWhere("schedules.date = :date", {
      date: newDateString,
    })
    .getOne();

  if (existingScheduleToUser) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }

  const findRealEstate: RealEstate | null = await realEstateRepo.findOne({
    where: { id: payload.realEstateId },
  });

  let schedules;
  if (!findRealEstate) throw new AppError("RealEstate not found", 404);

  if (findRealEstate) {
    schedules = scheduleRepo.create({
      date: newDateString,
      hour: payload.hour,
      realEstate: payload.realEstateId,
      user: userId,
    });
    await scheduleRepo.save(schedules);
  }

  return { message: "Schedule created" };
};

export { createScheduleService };
