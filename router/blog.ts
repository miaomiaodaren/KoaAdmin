const Router  = require('koa-router');
const router = new Router();
import { Blog } from '../controllers/index';

router.get('/blogList', Blog.GetBlogList);
router.get('/types')


export default router