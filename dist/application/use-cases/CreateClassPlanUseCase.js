"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateClassPlanUseCase = void 0;
class CreateClassPlanUseCase {
    // eslint-disable-next-line no-useless-constructor
    constructor(classPlanRepository) {
        this.classPlanRepository = classPlanRepository;
    }
    async execute(data) {
        if (!data.date || isNaN(new Date(data.date).getTime())) {
            throw new Error('Data inválida fornecida.');
        }
        if (!data.instructor_id) {
            throw new Error('Instructor ID é obrigatório.');
        }
        return this.classPlanRepository.create(data); // 🔥 Agora `date` já é `Date`
    }
}
exports.CreateClassPlanUseCase = CreateClassPlanUseCase;
//# sourceMappingURL=CreateClassPlanUseCase.js.map