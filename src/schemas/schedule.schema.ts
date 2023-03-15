import { z } from "zod";

const scheduleCreateSchema = z.object({
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number(),
});

const returnScheduleCreateSchema = scheduleCreateSchema.extend({
  id: z.number(),
  userId: z.number(),
});

export { scheduleCreateSchema, returnScheduleCreateSchema };
