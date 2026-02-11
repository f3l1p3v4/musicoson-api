"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaskSchema = void 0;
const zod_1 = require("zod");
exports.createTaskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    description: zod_1.z.string().min(1, 'Description is required'),
    observation: zod_1.z.string().optional(),
    delivery_date: zod_1.z
        .string()
        .optional()
        .refine((value) => {
        if (value === undefined)
            return true; // Permite que `undefined` passe pela validação
        const date = new Date(value);
        return !isNaN(date.getTime()); // Verifica se a string pode ser convertida em uma data válida
    }, 'Invalid date format')
        .transform((value) => (value ? new Date(value) : undefined)), // Transforma para Date apenas se `value` não for `undefined`
    status: zod_1.z.enum(['PENDING', 'COMPLETED']).optional(),
    category: zod_1.z.enum(['MSA', 'METODO', 'HINOS']),
    studentId: zod_1.z.string().uuid().optional(),
    group: zod_1.z.enum(['GROUP_01', 'GROUP_02', 'GROUP_03', 'GROUP_04']).optional(),
});
//# sourceMappingURL=CreateTaskSchema.js.map