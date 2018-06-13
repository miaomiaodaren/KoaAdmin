"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require('koa-router');
const router = new Router();
const index_1 = require("../controllers/index");
router.get('/Gettype', index_1.Type.GetTypeList);
exports.default = router;
//# sourceMappingURL=type.js.map