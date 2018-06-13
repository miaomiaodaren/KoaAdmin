"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    psw: [String, Number],
    isAdmin: {
        type: Boolean,
        default: false
    }
});
exports.UserModel = mongoose_1.model('User', UserSchema);
//# sourceMappingURL=user.js.map