"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserUseCase = void 0;
class DeleteUserUseCase {
    // eslint-disable-next-line no-useless-constructor
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(id) {
        await this.userRepository.delete(id);
    }
}
exports.DeleteUserUseCase = DeleteUserUseCase;
//# sourceMappingURL=DeleteUserUseCase.js.map