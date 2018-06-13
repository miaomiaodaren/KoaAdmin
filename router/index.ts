const Router  = require('koa-router');
import UserRouter from './user';
import BlogRouter from './blog';
import TypeRouter from './type';

const router = new Router();

router.use('/user', UserRouter.routes(), UserRouter.allowedMethods());
router.use('/blog', BlogRouter.routes(), BlogRouter.allowedMethods());
router.use('/type', TypeRouter.routes(), TypeRouter.allowedMethods());

export default router



