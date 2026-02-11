"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateClassPlanUseCase = void 0;
class UpdateClassPlanUseCase {
    // eslint-disable-next-line no-useless-constructor
    constructor(classPlanRepository) {
        this.classPlanRepository = classPlanRepository;
    }
    async execute(id, data) {
        return this.classPlanRepository.update(id, data);
    }
}
exports.UpdateClassPlanUseCase = UpdateClassPlanUseCase;
//# sourceMappingURL=UpdateClassPlanUseCase.js.map