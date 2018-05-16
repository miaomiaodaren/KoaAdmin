const Router  = require('koa-router');
const router = new Router();
import { Type } from '../controllers/index';

router.get('/Gettype', Type.GetTypeList);


export default router