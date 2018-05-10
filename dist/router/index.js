"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require('koa-router');
const UserRouter = require('./user');
const router = new Router();
router.use('/user', UserRouter.routes(), UserRouter.allowedMethods());
exports.default = router;
//# sourceMappingURL=index.js.map