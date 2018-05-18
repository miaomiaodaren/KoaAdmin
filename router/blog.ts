const Router  = require('koa-router');
const router = new Router();
import { Blog } from '../controllers/index';

router.get('/blogList', Blog.GetBlogList);
router.post('/addBlog', Blog.AddBlog);
router.post('/delBlog', Blog.DelBlog);


export default router