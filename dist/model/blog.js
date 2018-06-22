"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BlogSchema = new mongoose_1.Schema({
    title: String,
    type: String,
    content: String,
    addtime: String,
});
exports.BlogModel = mongoose_1.model('News', BlogSchema);
//# sourceMappingURL=blog.js.map