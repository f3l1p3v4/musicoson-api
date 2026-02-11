"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserUseCase = void 0;
class UpdateUserUseCase {
    // eslint-disable-next-line no-useless-constructor
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(id, data) {
        const updatedUser = await this.userRepository.update(id, data);
        return updatedUser;
    }
}
exports.UpdateUserUseCase = UpdateUserUseCase;
//# sourceMappingURL=UpdateUserUseCase.js.map