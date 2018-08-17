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
let crypto1 = require('crypto');
const cachedData = {};
const expireTime = 7200 - 60;
const createNonceStr = () => Math.random().toString(36).substr(2, 15);
const createTimeStamp = () => String(parseInt(`${new Date().getTime() / 1000}`, 0));
const sign = (ticket, noncestr, timestamp, url) => {
    console.info(ticket, noncestr, timestamp, url, '我进入了生成签名');
    const str = `jsapi_ticket=${ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`;
    const hashCode = crypto1.createHash('sha1');
    let resultCode = hashCode.update(str, 'utf8').digest('hex');
    return resultCode;
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
        return datainfo;
    }
    catch (err) {
        console.info(err, '我请求接口出错了');
        return err;
    }
});
const getTicket = (url, ctx, token) => __awaiter(this, void 0, void 0, function* () {
    console.info('我进入了ticket', token);
    try {
        const datainfo = yield axios_1.default.get(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${token}&type=jsapi`);
        const jsapi_ticket = datainfo.data.ticket;
        console.info('请求ticket接口成功', datainfo.data.ticket, jsapi_ticket);
        const timestamp = createTimeStamp();
        const nonceStr = createNonceStr();
        const signature = sign(jsapi_ticket, nonceStr, timestamp, url);
        const item = { jsapi_ticket, nonceStr, timestamp, url, signature };
        cachedData[url] = item;
        return item;
    }
    catch (err) {
        console.info(err, '获取jsapi_ticket失败');
        return { message: '获取jsapi_ticket失败' };
    }
});
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
    let tokens;
    try {
        const datainfo = yield getToken(url, ctx);
        tokens = datainfo.data.access_token;
        console.info(tokens, '我是在初始方法中的token');
    }
    catch (err) {
        console.info(err, '我是初始方法中的错误token');
    }
    try {
        const datainfo2 = yield getTicket(url, ctx, tokens);
        console.info(datainfo2, '我是初始方法中的ticket');
        ctx.body = { status: 'success', data: Object.assign({}, datainfo2, { appId: 'wxc17275a872d36e36' }) };
    }
    catch (err) {
        console.info(err, '我是初始方法中的错误ticket');
        ctx.body = { status: 'error' };
    }
}));
exports.default = router;
//# sourceMappingURL=user.js.map