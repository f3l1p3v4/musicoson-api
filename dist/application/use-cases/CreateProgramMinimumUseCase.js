"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProgramMinimumUseCase = void 0;
class CreateProgramMinimumUseCase {
    // eslint-disable-next-line no-useless-constructor
    constructor(programMinimumRepository) {
        this.programMinimumRepository = programMinimumRepository;
    }
    async execute(instructorId, data) {
        if (!data.instrument) {
            throw new Error('Instrument is required');
        }
        if (!data.meetings && !data.cults && !data.officialization) {
            throw new Error('At least one of meetings, cults or officialization must be provided');
        }
        const programMinimum = await this.programMinimumRepository.create(data, instructorId);
        return programMinimum;
    }
}
exports.CreateProgramMinimumUseCase = CreateProgramMinimumUseCase;
//# sourceMappingURL=CreateProgramMinimumUseCase.js.map