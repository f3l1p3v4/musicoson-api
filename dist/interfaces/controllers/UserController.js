"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const RegisterUserUseCase_1 = require("../../application/use-cases/RegisterUserUseCase");
const AuthenticateUserUseCase_1 = require("../../application/use-cases/AuthenticateUserUseCase");
const UserRepository_1 = require("../.../../../infra/repositories/UserRepository");
class UserController {
    async register(req, res) {
        const { name, email, phone, password, role, instrument, group, practical_level, } = req.body;
        const userRepository = new UserRepository_1.UserRepository();
        const registerUserUseCase = new RegisterUserUseCase_1.RegisterUserUseCase(userRepository);
        try {
            const user = await registerUserUseCase.execute({
                name,
                email,
                phone,
                password,
                role,
                instrument,
                group,
                practical_level,
            });
            return res.status(201).json(user);
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async authenticate(req, res) {
        const { email, password } = req.body;
        const userRepository = new UserRepository_1.UserRepository();
        const authenticateUserUseCase = new AuthenticateUserUseCase_1.AuthenticateUserUseCase(userRepository);
        try {
            const token = await authenticateUserUseCase.execute({ email, password });
            return res.status(200).json({ token });
        }
        catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map