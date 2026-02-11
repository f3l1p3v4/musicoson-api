"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListNoticesUseCase = void 0;
class ListNoticesUseCase {
    // eslint-disable-next-line no-useless-constructor
    constructor(noticeRepository) {
        this.noticeRepository = noticeRepository;
    }
    async execute() {
        const notices = await this.noticeRepository.findAll();
        return notices;
    }
}
exports.ListNoticesUseCase = ListNoticesUseCase;
//# sourceMappingURL=ListNoticesUseCase.js.map