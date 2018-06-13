"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require('koa-router');
const router = new Router();
const index_1 = require("../controllers/index");
router.get('/', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    ctx.body = 'can i user /';
}));
router.get('/userList', index_1.User.GetUserList);
router.post('/addUser', index_1.User.addUser);
router.post('/RemoveUser', index_1.User.RemoveUser);
router.post('/login', index_1.User.Login);
router.post('/imgupload', index_1.User.ImgUpload);
exports.default = router;
//# sourceMappingURL=user.js.map