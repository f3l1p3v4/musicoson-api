"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListClassPlansUseCase = void 0;
class ListClassPlansUseCase {
    // eslint-disable-next-line no-useless-constructor
    constructor(classPlanRepository) {
        this.classPlanRepository = classPlanRepository;
    }
    async execute(filters) {
        return this.classPlanRepository.findAll(filters);
    }
}
exports.ListClassPlansUseCase = ListClassPlansUseCase;
//# sourceMappingURL=ListClassPlansUseCase.js.map