"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTaskUseCase = void 0;
const NotFoundError_1 = require("../../infra/errors/NotFoundError");
class DeleteTaskUseCase {
    // eslint-disable-next-line no-useless-constructor
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async execute(id) {
        const task = await this.taskRepository.findById(id);
        if (!task) {
            throw new NotFoundError_1.NotFoundError('Task not found');
        }
        await this.taskRepository.delete(id);
    }
}
exports.DeleteTaskUseCase = DeleteTaskUseCase;
//# sourceMappingURL=DeleteTaskUseCase.js.map