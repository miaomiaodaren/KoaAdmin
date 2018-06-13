const Router  = require('koa-router');
const router = new Router();
import { User } from '../controllers/index';

router.get('/', async(ctx, next) => {
    ctx.body = 'can i user /'
});

router.get('/userList', User.GetUserList);
router.post('/addUser', User.addUser);
router.post('/RemoveUser', User.RemoveUser);
router.post('/login', User.Login);
router.post('/imgupload', User.ImgUpload);

export default router