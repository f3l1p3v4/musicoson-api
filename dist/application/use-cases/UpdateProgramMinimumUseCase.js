"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProgramMinimumUseCase = void 0;
class UpdateProgramMinimumUseCase {
    // eslint-disable-next-line no-useless-constructor
    constructor(programMinimumRepository) {
        this.programMinimumRepository = programMinimumRepository;
    }
    async execute(id, data) {
        const updatedProgramMinimum = await this.programMinimumRepository.update(id, data);
        return updatedProgramMinimum;
    }
}
exports.UpdateProgramMinimumUseCase = UpdateProgramMinimumUseCase;
//# sourceMappingURL=UpdateProgramMinimumUseCase.js.map