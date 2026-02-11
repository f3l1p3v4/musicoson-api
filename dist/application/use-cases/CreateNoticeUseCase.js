"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNoticeUseCase = void 0;
class CreateNoticeUseCase {
    // eslint-disable-next-line no-useless-constructor
    constructor(noticeRepository) {
        this.noticeRepository = noticeRepository;
    }
    async execute(instructorId, data) {
        const notice = await this.noticeRepository.create(data, instructorId);
        return notice;
    }
}
exports.CreateNoticeUseCase = CreateNoticeUseCase;
//# sourceMappingURL=CreateNoticeUseCase.js.map