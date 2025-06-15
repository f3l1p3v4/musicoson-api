"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTaskUseCase = void 0;
const AppError_1 = require("../../infra/errors/AppError");
class CreateTaskUseCase {
    // eslint-disable-next-line no-useless-constructor
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async execute(instructorId, data) {
        if (!data.studentId && !data.group) {
            throw new AppError_1.AppError('You must specify either a studentId or a group', 400);
        }
        if (data.studentId && data.group) {
            throw new AppError_1.AppError('You can only specify a studentId or a group, not both', 400);
        }
        const task = await this.taskRepository.create(data, instructorId);
        return task;
    }
}
exports.CreateTaskUseCase = CreateTaskUseCase;
//# sourceMappingURL=CreateTaskUseCase.js.map