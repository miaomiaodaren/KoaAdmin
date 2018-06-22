"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require('koa-router');
const user_1 = require("./user");
const blog_1 = require("./blog");
const type_1 = require("./type");
const router = new Router();
router.use('/user', user_1.default.routes(), user_1.default.allowedMethods());
router.use('/blog', blog_1.default.routes(), blog_1.default.allowedMethods());
router.use('/type', type_1.default.routes(), type_1.default.allowedMethods());
exports.default = router;
//# sourceMappingURL=index.js.map