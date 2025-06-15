"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    // eslint-disable-next-line no-useless-constructor
    constructor(id, name, email, phone, password_hash, role, createdAt, updatedAt, instrument, group, practical_level) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.password_hash = password_hash;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.instrument = instrument;
        this.group = group;
        this.practical_level = practical_level;
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map