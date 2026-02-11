"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateUserUseCase = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthenticateUserUseCase {
    // eslint-disable-next-line no-useless-constructor
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(data) {
        const user = await this.userRepository.findByEmail(data.email);
        if (!user) {
            throw new AuthenticationError('Invalid email or password.');
        }
        const passwordMatch = await bcryptjs_1.default.compare(data.password, user.password_hash);
        if (!passwordMatch) {
            throw new AuthenticationError('Invalid email or password.');
        }
        const tokenPayload = {
            userId: user.id,
            email: user.email,
            role: user.role,
        };
        const token = jsonwebtoken_1.default.sign(tokenPayload, process.env.JWT_SECRET, {
            expiresIn: '8h',
        });
        return {
            token,
            role: user.role,
            name: user.name,
            instrument: user.instrument ?? undefined,
            id: user.id ?? undefined,
        };
    }
}
exports.AuthenticateUserUseCase = AuthenticateUserUseCase;
class AuthenticationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AuthenticationError';
    }
}
//# sourceMappingURL=AuthenticateUserUseCase.js.map