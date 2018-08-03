"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require('koa-router');
const router = new Router();
const index_1 = require("../controllers/index");
const axios_1 = require("axios");
router.get('/', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    ctx.body = 'can i user /';
}));
router.get('/userList', index_1.User.GetUserList);
router.post('/addUser', index_1.User.addUser);
router.post('/RemoveUser', index_1.User.RemoveUser);
router.post('/login', index_1.User.Login);
router.post('/imgupload', index_1.User.ImgUpload);
const jsSHA = require('jssha');
const cachedData = {};
const expireTime = 7200 - 60;
const createNonceStr = () => Math.random().toString(36).substr(2, 15);
const createTimeStamp = () => String(new Date().getTime() / 1000);
const sign = (ticket, noncestr, timestamp, url) => {
    const str = `jsapi_ticket=${ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`;
    const shaObj = new jsSHA(str, 'TEXT');
    return shaObj.getHash('SHA-1', 'HEX');
};
const getToken = (url, ctx) => __awaiter(this, void 0, void 0, function* () {
    console.info('我进入了gettoken');
    const appID = "wxc17275a872d36e36";
    const appSecret = "726b75ce07554990ec124f31b10e1e66";
    const tokenUrl = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appID}&secret=${appSecret}`;
    console.info('gettokenurl', tokenUrl);
    try {
        const datainfo = yield axios_1.default.get(tokenUrl);
        console.info(datainfo, '我成功请求了');
    }
    catch (err) {
        console.info(err, '我请求接口出错了');
    }
});
const getTicket = (url, ctx, token) => {
    console.info('我进入了ticket', token);
    axios_1.default.get(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${token}&type=jsapi`).then(res => {
        const jsapi_ticket = res.data.ticket;
        console.info('请求ticket接口成功', res.data, res.data.jsapi_ticket);
        const timestamp = createTimeStamp();
        const nonceStr = createNonceStr();
        const signature = sign(jsapi_ticket, nonceStr, timestamp, url);
        const item = { jsapi_ticket, nonceStr, timestamp, url, signature };
        cachedData[url] = item;
        ctx.body = item;
        return false;
    }).catch(err => {
        console.info(err, '获取jsapi_ticket失败');
        ctx.body = { message: '获取jsapi_ticket失败' };
        return false;
    });
};
router.get('/getsign', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    const url = ctx.query.url;
    console.info(url, '我是url');
    const cachedItem = cachedData[url];
    console.info(cachedItem, '我是url2222');
    if (cachedItem && cachedItem.timestamp) {
        console.info('我从缓存进来了');
        const t = createTimeStamp() - cachedItem.timestamp;
        if (t < expireTime && cachedItem.url === url) {
            ctx.body = {
                jsapi_ticket: cachedItem.jsapi_ticket,
                nonceStr: cachedItem.nonceStr,
                timestamp: cachedItem.timestamp,
                url: cachedItem.url,
                signature: cachedItem.signature,
            };
            return false;
        }
    }
    getToken(url, ctx);
}));
exports.default = router;
//# sourceMappingURL=user.js.map