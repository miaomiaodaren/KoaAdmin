const Router  = require('koa-router');
import UserRouter from './user';
import BlogRouter from './blog';
import TypeRouter from './type';

const router = new Router();
const router2 = new Router();

router.use('/user', UserRouter.routes(), UserRouter.allowedMethods());
router.use('/blog', BlogRouter.routes(), BlogRouter.allowedMethods());
router.use('/type', TypeRouter.routes(), TypeRouter.allowedMethods());



//测试在外面又包了一层
router2.use('/api', router.routes(), router.allowedMethods());

export default router2



