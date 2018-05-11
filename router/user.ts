const Router  = require('koa-router');
const router = new Router();
import { User } from '../controllers/index';

router.get('/', async(ctx, next) => {
    ctx.body = 'can i user /'
});

router.get('/userList', User.GetUserList);
router.post('/addUser', User.addUser);

export default router