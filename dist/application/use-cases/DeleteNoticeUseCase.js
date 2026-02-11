"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteNoticeUseCase = void 0;
class DeleteNoticeUseCase {
    // eslint-disable-next-line no-useless-constructor
    constructor(noticeRepository) {
        this.noticeRepository = noticeRepository;
    }
    async execute(id) {
        await this.noticeRepository.delete(id);
    }
}
exports.DeleteNoticeUseCase = DeleteNoticeUseCase;
//# sourceMappingURL=DeleteNoticeUseCase.js.map