"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListProgramMinimumsUseCase = void 0;
class ListProgramMinimumsUseCase {
    // eslint-disable-next-line no-useless-constructor
    constructor(programMinimumRepository) {
        this.programMinimumRepository = programMinimumRepository;
    }
    async execute() {
        const programMinimums = await this.programMinimumRepository.findAll();
        return programMinimums;
    }
}
exports.ListProgramMinimumsUseCase = ListProgramMinimumsUseCase;
//# sourceMappingURL=ListProgramMinimumsUseCase.js.map