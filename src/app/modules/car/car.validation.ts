import { z } from 'zod';

const createCarValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    color: z.string(),
    isElectric: z.boolean(),
    status: z.enum(['available', 'unavailable']).default('available'),
    features: z.array(z.string()),
    pricePerHour: z.number(),
    isDeleted: z.boolean().default(false),
  }),
});

export const CarValidations = {
  createCarValidationSchema,
};
