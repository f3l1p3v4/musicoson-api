"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateUserError = void 0;
class DuplicateUserError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DuplicateUserError';
    }
}
exports.DuplicateUserError = DuplicateUserError;
//# sourceMappingURL=DuplicateUserError.js.map