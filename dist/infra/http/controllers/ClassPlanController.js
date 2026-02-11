"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassPlanController = void 0;
class ClassPlanController {
    // eslint-disable-next-line no-useless-constructor
    constructor(createClassPlanUseCase, listClassPlansUseCase, updateClassPlanUseCase) {
        this.createClassPlanUseCase = createClassPlanUseCase;
        this.listClassPlansUseCase = listClassPlansUseCase;
        this.updateClassPlanUseCase = updateClassPlanUseCase;
    }
    async create(req, res) {
        const data = req.body;
        const instructorId = req.userId; // 👈 Pegando o ID do instrutor autenticado
        if (!instructorId) {
            return res.status(403).json({ error: 'Acesso não autorizado' });
        }
        const classPlan = await this.createClassPlanUseCase.execute({
            ...data,
            instructor_id: instructorId, // 👈 Garantindo que o instructor_id seja passado
        });
        return res.status(201).json(classPlan);
    }
    async list(req, res) {
        const { group, date } = req.query;
        const defaultDate = new Date(new Date().getFullYear(), 0, 1);
        const filters = {
            group: group,
            date: date
                ? new Date(date)
                : defaultDate,
        };
        const classPlans = await this.listClassPlansUseCase.execute(filters);
        return res.json(classPlans);
    }
    async update(req, res) {
        const { id } = req.params;
        const data = req.body;
        const classPlan = await this.updateClassPlanUseCase.execute(id, data);
        if (!classPlan)
            return res.status(404).json({ error: 'Plano de aula não encontrado' });
        return res.json(classPlan);
    }
}
exports.ClassPlanController = ClassPlanController;
//# sourceMappingURL=ClassPlanController.js.map