const Router  = require('koa-router');
const router = new Router();
import { Blog } from '../controllers/index';

router.get('/blogList', Blog.GetBlogList);


export default router