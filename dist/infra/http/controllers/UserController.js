"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const RegisterUserUseCase_1 = require("../../../application/use-cases/RegisterUserUseCase");
const AuthenticateUserUseCase_1 = require("../../../application/use-cases/AuthenticateUserUseCase");
const UpdateUserUseCase_1 = require("../../../application/use-cases/UpdateUserUseCase");
const DeleteUserUseCase_1 = require("../../../application/use-cases/DeleteUserUseCase");
const UserRepository_1 = require("../../.../../../infra/repositories/UserRepository");
const UserSchema_1 = require("../../../application/schemas/UserSchema");
const zod_1 = require("zod");
const formatZodErrors_1 = require("../../../utils/formatZodErrors");
class UserController {
    constructor() {
        const userRepository = new UserRepository_1.UserRepository();
        this.registerUserUseCase = new RegisterUserUseCase_1.RegisterUserUseCase(userRepository);
        this.authenticateUserUseCase = new AuthenticateUserUseCase_1.AuthenticateUserUseCase(userRepository);
        this.updateUserUseCase = new UpdateUserUseCase_1.UpdateUserUseCase(userRepository);
        this.deleteUserUseCase = new DeleteUserUseCase_1.DeleteUserUseCase(userRepository);
    }
    async list(req, res) {
        try {
            const userRepository = new UserRepository_1.UserRepository();
            const users = await userRepository.findAll();
            return res.status(200).json(users);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            }
            return res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
    async register(req, res) {
        try {
            const userData = UserSchema_1.UserSchema.parse(req.body);
            const user = await this.registerUserUseCase.execute(userData);
            return res.status(201).json(user);
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                const formattedErrors = (0, formatZodErrors_1.formatZodErrors)(error.errors);
                return res.status(400).json({ errors: formattedErrors });
            }
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(400).json({ error: 'An unexpected error occurred' });
        }
    }
    async authenticate(req, res) {
        try {
            const { email, password } = req.body;
            const token = await this.authenticateUserUseCase.execute({
                email,
                password,
            });
            return res.status(200).json({ token });
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(401).json({ error: error.message });
            }
            return res.status(401).json({ error: 'An unexpected error occurred' });
        }
    }
    async findById(req, res) {
        try {
            const { id } = req.params;
            const userRepository = new UserRepository_1.UserRepository();
            const user = await userRepository.findById(id);
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            return res.status(200).json(user);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Erro inesperado' });
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const updatedUser = await this.updateUserUseCase.execute(id, data);
            return res.status(200).json(updatedUser);
        }
        catch (error) {
            console.log('Updated User:', error);
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(400).json({ error: 'An unexpected error occurred' });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            await this.deleteUserUseCase.execute(id);
            return res.status(204).send();
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(400).json({ error: 'An unexpected error occurred' });
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map