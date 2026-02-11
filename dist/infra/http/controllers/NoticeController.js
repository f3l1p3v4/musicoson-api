"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateNoticeUseCase_1 = require("../../../application/use-cases/CreateNoticeUseCase");
const ListNoticesUseCase_1 = require("../../../application/use-cases/ListNoticesUseCase");
const UpdateNoticeUseCase_1 = require("../../../application/use-cases/UpdateNoticeUseCase");
const DeleteNoticeUseCase_1 = require("../../../application/use-cases/DeleteNoticeUseCase");
const NoticeRepository_1 = require("../../../infra/repositories/NoticeRepository");
const noticeRepository = new NoticeRepository_1.NoticeRepository();
class NoticeController {
    static async createNotice(req, res) {
        try {
            const userId = req.userId;
            if (!userId) {
                return res.status(400).json({ error: 'User ID is required' });
            }
            const data = req.body;
            const createNoticeUseCase = new CreateNoticeUseCase_1.CreateNoticeUseCase(noticeRepository);
            const notice = await createNoticeUseCase.execute(userId, data);
            res.status(201).json(notice);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    static async listNotices(req, res) {
        try {
            const listNoticesUseCase = new ListNoticesUseCase_1.ListNoticesUseCase(noticeRepository);
            const notices = await listNoticesUseCase.execute();
            res.status(200).json(notices);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    static async updateNotice(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const userId = req.userId;
            if (!userId) {
                return res.status(400).json({ error: 'User ID is required' });
            }
            const updateNoticeUseCase = new UpdateNoticeUseCase_1.UpdateNoticeUseCase(noticeRepository);
            const updatedNotice = await updateNoticeUseCase.execute(id, data);
            res.status(200).json(updatedNotice);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    static async deleteNotice(req, res) {
        try {
            const { id } = req.params;
            const userId = req.userId;
            if (!userId) {
                return res.status(400).json({ error: 'User ID is required' });
            }
            const deleteNoticeUseCase = new DeleteNoticeUseCase_1.DeleteNoticeUseCase(noticeRepository);
            await deleteNoticeUseCase.execute(id);
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
exports.default = NoticeController;
//# sourceMappingURL=NoticeController.js.map