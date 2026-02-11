"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateProgramMinimumUseCase_1 = require("../../../application/use-cases/CreateProgramMinimumUseCase");
const ListProgramMinimumsUseCase_1 = require("../../../application/use-cases/ListProgramMinimumsUseCase");
const UpdateProgramMinimumUseCase_1 = require("../../../application/use-cases/UpdateProgramMinimumUseCase");
const DeleteProgramMinimumUseCase_1 = require("../../../application/use-cases/DeleteProgramMinimumUseCase");
const ProgramMinimumRepository_1 = require("../../../infra/repositories/ProgramMinimumRepository");
const programMinimumRepository = new ProgramMinimumRepository_1.ProgramMinimumRepository();
class ProgramMinimumController {
    static async createProgramMinimum(req, res) {
        try {
            const userId = req.userId;
            if (!userId) {
                return res.status(400).json({ error: 'User ID is required' });
            }
            const data = req.body;
            const createProgramMinimumUseCase = new CreateProgramMinimumUseCase_1.CreateProgramMinimumUseCase(programMinimumRepository);
            const programMinimum = await createProgramMinimumUseCase.execute(userId, data);
            res.status(201).json(programMinimum);
        }
        catch (error) {
            console.error('Error creating Program Minimum:', error); // Adiciona logging aqui
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    static async listProgramMinimums(req, res) {
        try {
            const listProgramMinimumsUseCase = new ListProgramMinimumsUseCase_1.ListProgramMinimumsUseCase(programMinimumRepository);
            const programMinimums = await listProgramMinimumsUseCase.execute();
            res.status(200).json(programMinimums);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    static async updateProgramMinimum(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const userId = req.userId;
            if (!userId) {
                return res.status(400).json({ error: 'User ID is required' });
            }
            const updateProgramMinimumUseCase = new UpdateProgramMinimumUseCase_1.UpdateProgramMinimumUseCase(programMinimumRepository);
            const updatedProgramMinimum = await updateProgramMinimumUseCase.execute(id, data);
            res.status(200).json(updatedProgramMinimum);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    static async deleteProgramMinimum(req, res) {
        try {
            const { id } = req.params;
            const userId = req.userId;
            if (!userId) {
                return res.status(400).json({ error: 'User ID is required' });
            }
            const deleteProgramMinimumUseCase = new DeleteProgramMinimumUseCase_1.DeleteProgramMinimumUseCase(programMinimumRepository);
            await deleteProgramMinimumUseCase.execute(id);
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
exports.default = ProgramMinimumController;
//# sourceMappingURL=ProgramMinimumController.js.map