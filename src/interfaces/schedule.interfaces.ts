import { z } from "zod";
import {
  returnScheduleCreateSchema,
  scheduleCreateSchema,
} from "../schemas/schedule.schema";

export interface ScheduleCreationResult {
  message: string;
}

export type ISchedule = z.infer<typeof scheduleCreateSchema>;

export type IScheduleReturn = z.infer<typeof returnScheduleCreateSchema>;
