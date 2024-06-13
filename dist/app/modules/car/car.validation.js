"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarValidations = void 0;
const zod_1 = require("zod");
const createCarValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        description: zod_1.z.string(),
        color: zod_1.z.string(),
        isElectric: zod_1.z.boolean(),
        status: zod_1.z.enum(['available', 'unavailable']).default('available'),
        features: zod_1.z.array(zod_1.z.string()),
        pricePerHour: zod_1.z.number(),
        isDeleted: zod_1.z.boolean().default(false),
    }),
});
const updateCarValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        color: zod_1.z.string().optional(),
        isElectric: zod_1.z.boolean().optional(),
        status: zod_1.z
            .enum(['available', 'unavailable'])
            .default('available')
            .optional(),
        features: zod_1.z.array(zod_1.z.string()).optional(),
        pricePerHour: zod_1.z.number().optional(),
        isDeleted: zod_1.z.boolean().default(false).optional(),
    }),
});
exports.CarValidations = {
    createCarValidationSchema,
    updateCarValidationSchema,
};
