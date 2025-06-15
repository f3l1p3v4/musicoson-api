"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserUseCase = void 0;
const User_1 = require("../../domain/entities/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class RegisterUserUseCase {
    // eslint-disable-next-line no-useless-constructor
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(data) {
        const userExists = await this.userRepository.findByEmail(data.email);
        if (userExists) {
            throw new Error('User already exists.');
        }
        const password_hash = await bcryptjs_1.default.hash(data.password, 8);
        const user = new User_1.User('', data.name, data.email, data.phone, password_hash, data.role, new Date(), new Date(), data.instrument, data.group, data.practical_level);
        return await this.userRepository.save(user);
    }
}
exports.RegisterUserUseCase = RegisterUserUseCase;
//# sourceMappingURL=RegisterUserUseCase.js.map