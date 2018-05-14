const Router  = require('koa-router');
import UserRouter from './user';
import BlogRouter from './blog';

const router = new Router();

router.use('/user', UserRouter.routes(), UserRouter.allowedMethods());
router.use('/blog', BlogRouter.routes(), BlogRouter.allowedMethods());

export default router