import { z } from "zod";
import {
  allUsersReturn,
  returnUserCreateSchema,
} from "../schemas/users.schema";

export interface IUsersPayload {
  name: string;
  email: string;
  password: string;
  admin: boolean;
}

export type IUsersReturn = z.infer<typeof returnUserCreateSchema>;

export type IUsersListReturn = z.infer<typeof allUsersReturn>;
