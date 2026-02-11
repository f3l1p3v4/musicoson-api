"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskStatusUseCase = void 0;
class UpdateTaskStatusUseCase {
    // eslint-disable-next-line no-useless-constructor
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async execute(taskId, data) {
        const { status } = data;
        return this.taskRepository.updateStatus(taskId, status);
    }
}
exports.UpdateTaskStatusUseCase = UpdateTaskStatusUseCase;
//# sourceMappingURL=UpdateTaskStatusUseCase.js.map