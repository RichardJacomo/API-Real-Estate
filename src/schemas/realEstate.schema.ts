import { z } from "zod";

const addressEstateSchema = z.object({
  street: z.string(),
  zipCode: z.string().max(8),
  number: z.string().nullable().optional(),
  city: z.string(),
  state: z.string().max(2),
});

const valueSchema = z.union([z.string(), z.number()]);

const realEstateSchema = z.object({
  value: valueSchema,
  size: z
    .number()
    .refine((value) => value > 0, { message: "Number must be greater than 0" }),
  address: addressEstateSchema,
  category: z.number().optional(),
});

const returnRealEstate = realEstateSchema.extend({
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
});

export { addressEstateSchema, realEstateSchema, returnRealEstate };
