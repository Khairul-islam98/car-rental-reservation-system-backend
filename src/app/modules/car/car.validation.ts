import { z } from 'zod';

const createCarValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string().optional(),
    color: z.string().optional(),
    isElectric: z.boolean(),
    status: z.enum(['available', 'unavailable']).default('available'),
    features: z.array(z.string()),
    pricePerHour: z.number(),
    model: z.string(),
    carType: z.string(),
  }),
});
const updateCarValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    color: z.string().optional(),
    isElectric: z.boolean().optional(),
    status: z
      .enum(['available', 'unavailable'])
      .default('available')
      .optional(),
    features: z.array(z.string()).optional(),
    pricePerHour: z.number().optional(),
    model: z.string().optional(),
    carType: z.string().optional(),
  }),
});

export const CarValidations = {
  createCarValidationSchema,
  updateCarValidationSchema,
};
