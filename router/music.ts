const Router  = require('koa-router');
const router = new Router();
import { Music } from '../controllers/index';
router.get('/login', Music.Login);
router.get('/getplay', Music.Getplay);
router.get('/getlist', Music.Getmusiclist);
router.get('/getlrc', Music.getLrc);

export default router