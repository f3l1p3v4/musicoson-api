"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatZodErrors = formatZodErrors;
function formatZodErrors(errors) {
    return errors.map((error) => {
        const path = error.path.join('.');
        return `${path}: ${error.message}`;
    });
}
//# sourceMappingURL=formatZodErrors.js.map