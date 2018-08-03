const Router  = require('koa-router');
const router = new Router();
import { User } from '../controllers/index';
import axios from 'axios'
import { url } from 'inspector';
import { resolve } from 'dns';

router.get('/', async(ctx, next) => {
    ctx.body = 'can i user /'
});

router.get('/userList', User.GetUserList);
router.post('/addUser', User.addUser);
router.post('/RemoveUser', User.RemoveUser);
router.post('/login', User.Login);
router.post('/imgupload', User.ImgUpload);










//微信获取token的值
// router.get('/getaccesstoken', async (ctx, next) => {
//     const appID = "wxc17275a872d36e36";
//     const appSecret = "726b75ce07554990ec124f31b10e1e66";
//     const tokenUrl = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appID}&secret=${appSecret}`;
//     try{
//         const datainfo = await axios.get(tokenUrl);
//         ctx.session.accesstoken = datainfo.data.access_token
//     } catch(err) {
//         console.info(err, '获取accesstoken失败')
//     }
    
// })


const jsSHA = require('jssha');

// 缓存在服务器端，签名对象的 key 为每个页面的 url
const cachedData = {}

// 缓存 2 小时后过期
const expireTime = 7200 - 60

// 随机字符串
const createNonceStr = () => Math.random().toString(36).substr(2, 15)

// 时间戳
const createTimeStamp:any = () => String(new Date().getTime() / 1000);

// 签名
const sign = (ticket, noncestr, timestamp, url) => {
    const str = `jsapi_ticket=${ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`
    const shaObj = new jsSHA(str, 'TEXT')
    return shaObj.getHash('SHA-1', 'HEX')
}

const getToken = async(url: string, ctx) => {
    console.info('我进入了gettoken');
    const appID = "wxc17275a872d36e36";
    const appSecret = "726b75ce07554990ec124f31b10e1e66";
    const tokenUrl = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appID}&secret=${appSecret}`;
    console.info('gettokenurl', tokenUrl);

    try{
        const datainfo = await axios.get(tokenUrl);
        console.info(datainfo, '我成功请求了');
    } catch(err) {
        console.info(err, '我请求接口出错了')
    }
    
    // axios.get(tokenUrl).then(res => {
    //     console.info('请求token接口成功',res.data, res.data.access_token);
    //     const token = res.data.access_token;
    //     getTicket(url, ctx, token)
    // }).catch(err => {
    //     console.info(err, '获取accesstoken失败');
    //     ctx.body = {message: '获取accesstoken失败'}
    //     return false
    // })
}

//获取ticket
const getTicket = (url, ctx, token) => {
    console.info('我进入了ticket', token)
    axios.get(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${token}&type=jsapi`).then(res => {
        const jsapi_ticket = res.data.ticket;
        console.info('请求ticket接口成功',res.data, res.data.jsapi_ticket);
        const timestamp = createTimeStamp();
        const nonceStr = createNonceStr();
        const signature = sign(jsapi_ticket, nonceStr, timestamp, url);
        const item = { jsapi_ticket, nonceStr, timestamp, url, signature }
        cachedData[url] = item;
        ctx.body = item;
        return false
    }).catch(err => {
        console.info(err, '获取jsapi_ticket失败');
        ctx.body = {message: '获取jsapi_ticket失败'}
        return false
    })
}


//获取签名代码
router.get('/getsign', async(ctx, next) => {
    const url = ctx.query.url;
    console.info(url, '我是url')
    const cachedItem = cachedData[url];
    console.info(cachedItem, '我是url2222')
    //如果有缓存则从缓存中读取
    if (cachedItem && cachedItem.timestamp) {
        console.info('我从缓存进来了')
        const t = createTimeStamp() - cachedItem.timestamp
        // 注意：微信分享后会额外添加一些参数，url会发生变化
        if (t < expireTime && cachedItem.url === url) {
            ctx.body = {
                jsapi_ticket: cachedItem.jsapi_ticket,
                nonceStr: cachedItem.nonceStr,
                timestamp: cachedItem.timestamp,
                url: cachedItem.url,
                signature: cachedItem.signature,
            }
            return false
        }
    }
    getToken(url, ctx);
})




export default router