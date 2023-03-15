import { z } from "zod";

const userCreateSchema = z.object({
  name: z.string().max(45),
  email: z.string().max(45).email(),
  password: z.string().max(120),
  admin: z.boolean().optional(),
});

const userUpdateSchema = userCreateSchema.partial();

const returnUserCreateSchema = userCreateSchema
  .extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
  })
  .omit({ password: true });

const allUsersReturn = returnUserCreateSchema.array();

export {
  userCreateSchema,
  returnUserCreateSchema,
  allUsersReturn,
  userUpdateSchema,
};
