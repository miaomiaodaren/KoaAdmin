const Router  = require('koa-router');
const router = new Router();
import { User } from '../controllers/index';
import axios from 'axios'

router.get('/', async(ctx, next) => {
    ctx.body = 'can i user /'
});

router.get('/userList', User.GetUserList);
router.post('/addUser', User.addUser);
router.post('/RemoveUser', User.RemoveUser);
router.post('/login', User.Login);
router.post('/imgupload', User.ImgUpload);



//微信获取token的值
router.get('/getaccesstoken', async (ctx, next) => {
    const appID = "wxc17275a872d36e36";
    const appSecret = "726b75ce07554990ec124f31b10e1e66";
    const tokenUrl = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appID}&secret=${appSecret}`;
    try{
        const datainfo = await axios.get(tokenUrl);
        ctx.session.accesstoken = datainfo.data.access_token
    } catch(err) {
        console.info(err, '获取accesstoken失败')
    }
    
})


//获取签名代码
router.get('/getsign', async(ctx, next) => {
    
})




export default router