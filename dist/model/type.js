"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TypeSchema = new mongoose_1.Schema({
    name: String,
    sorts: {
        type: Number,
        default: 0
    },
});
exports.TypeModel = mongoose_1.model('TypeInfo', TypeSchema);
//# sourceMappingURL=type.js.map