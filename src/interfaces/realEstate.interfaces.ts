import { z } from "zod";
import { realEstateSchema } from "../schemas/realEstate.schema";

export type IRealEstate = z.infer<typeof realEstateSchema>;

export interface IpayloadRealEstate {
  value: string | number;
  size: number;
  category?: number;
  address: {
    street: string;
    zipCode: string;
    number?: string;
    city: string;
    state: string;
  };
}
