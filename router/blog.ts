const Router  = require('koa-router');
const router = new Router();
import { User } from '../controllers/index';

router.get('/blogList', User.GetUserList);
router.post('/addUser', User.addUser);
router.post('/RemoveUser', User.RemoveUser);

export default router