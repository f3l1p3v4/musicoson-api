"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProgramMinimumUseCase = void 0;
class DeleteProgramMinimumUseCase {
    // eslint-disable-next-line no-useless-constructor
    constructor(programMinimumRepository) {
        this.programMinimumRepository = programMinimumRepository;
    }
    async execute(id) {
        await this.programMinimumRepository.delete(id);
    }
}
exports.DeleteProgramMinimumUseCase = DeleteProgramMinimumUseCase;
//# sourceMappingURL=DeleteProgramMinimumUseCase.js.map