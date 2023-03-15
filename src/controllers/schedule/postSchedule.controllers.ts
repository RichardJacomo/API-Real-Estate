import { Request, Response } from "express";
import { createScheduleService } from "../../services/schedules/postSchedule.services";

const createScheduleController = async (req: Request, res: Response) => {
  const userId = req.user.ID;
  const schedule = await createScheduleService(req.body, userId);
  return res.status(201).json(schedule);
};

export { createScheduleController };
