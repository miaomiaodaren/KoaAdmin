"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require('koa-router');
const router = new Router();
const index_1 = require("../controllers/index");
router.get('/login', index_1.Music.Login);
router.get('/getplay', index_1.Music.Getplay);
router.get('/getlist', index_1.Music.Getmusiclist);
router.get('/getlrc', index_1.Music.getLrc);
exports.default = router;
//# sourceMappingURL=music.js.map