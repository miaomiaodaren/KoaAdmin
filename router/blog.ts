const Router  = require('koa-router');
const router = new Router();
import { Blog, Books } from '../controllers/index';

router.get('/blogList', Blog.GetBlogList);
router.post('/addBlog', Blog.AddBlog);
router.post('/delBlog', Blog.DelBlog);


//小说
router.get('getBook', Books.getBookList);

export default router