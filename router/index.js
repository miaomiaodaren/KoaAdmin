const Router  = require('koa-router');
const UserRouter = require('./user');

const router = new Router();

router.use('/user', UserRouter.routes(), UserRouter.allowedMethods());

module.exports = router