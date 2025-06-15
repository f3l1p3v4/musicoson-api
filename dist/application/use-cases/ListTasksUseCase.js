"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListTasksUseCase = void 0;
class ListTasksUseCase {
    // eslint-disable-next-line no-useless-constructor
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async execute(params) {
        const { studentId, group, instructorId } = params;
        if (instructorId) {
            return this.taskRepository.listByInstructor(instructorId);
        }
        if (studentId) {
            return this.taskRepository.listByStudent(studentId, group || null);
        }
        return this.taskRepository.list();
    }
}
exports.ListTasksUseCase = ListTasksUseCase;
//# sourceMappingURL=ListTasksUseCase.js.map