import { Request, Response } from "express";
import { listAllSchedulesService } from "../../services/schedules/getListSchedules.services";

const listAllSchedulesController = async (req: Request, res: Response) => {
  const schedules = await listAllSchedulesService(Number(req.params.id));

  return res.json(schedules);
};

export { listAllSchedulesController };
