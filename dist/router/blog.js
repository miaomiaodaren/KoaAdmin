"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require('koa-router');
const router = new Router();
const index_1 = require("../controllers/index");
router.get('/blogList', index_1.Blog.GetBlogList);
router.post('/addBlog', index_1.Blog.AddBlog);
router.post('/delBlog', index_1.Blog.DelBlog);
exports.default = router;
//# sourceMappingURL=blog.js.map