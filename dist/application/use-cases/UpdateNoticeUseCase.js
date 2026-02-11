"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNoticeUseCase = void 0;
class UpdateNoticeUseCase {
    // eslint-disable-next-line no-useless-constructor
    constructor(noticeRepository) {
        this.noticeRepository = noticeRepository;
    }
    async execute(id, data) {
        const existingNotice = await this.noticeRepository.findById(id);
        if (!existingNotice) {
            throw new Error('Notice not found');
        }
        const updatedNotice = await this.noticeRepository.update(id, data);
        return updatedNotice;
    }
}
exports.UpdateNoticeUseCase = UpdateNoticeUseCase;
//# sourceMappingURL=UpdateNoticeUseCase.js.map