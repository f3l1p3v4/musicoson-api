"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const zod_1 = require("zod");
exports.UserSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    email: zod_1.z.string().email('Invalid email address'),
    phone: zod_1.z.string().regex(/^\d{9}$/, 'Invalid phone number'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters long'),
    role: zod_1.z
        .enum(['INSTRUCTOR', 'STUDENT'])
        .refine((val) => ['INSTRUCTOR', 'STUDENT'].includes(val), {
        message: 'Invalid role',
    }),
    instrument: zod_1.z.string().optional(),
    group: zod_1.z.enum(['GROUP_01', 'GROUP_02', 'GROUP_03', 'GROUP_04']).optional(),
    practical_level: zod_1.z.enum(['C_JOVEM', 'C_OFICIAL', 'OFICIALIZACAO']).optional(),
});
//# sourceMappingURL=UserSchema.js.map