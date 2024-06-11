import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    role: z.enum(['user', 'admin']),
    password: z.string(),
    phone: z.string(),
    address: z.string(),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
};
