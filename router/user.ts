const Router  = require('koa-router');
const router = new Router();
import { User } from '../controllers/index';

router.get('/', async(ctx, next) => {
    ctx.body = 'can i user /'
});

router.get('/userList', User.GetUserList);

export default router