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
const index_1 = require("../utils/index");
const crypto = require('crypto');
const axios_1 = require("axios");
const cryptoss = require('../utils/crypto');
const qs_1 = require("qs");
const request = require('request');
const rp = require('request-promise');
function randomUserAgent() {
    const userAgentList = [
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
        "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36",
        "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36",
        "Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Mobile Safari/537.36",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Mobile/14F89;GameHelper",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.4",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 10_0 like Mac OS X) AppleWebKit/602.1.38 (KHTML, like Gecko) Version/10.0 Mobile/14A300 Safari/602.1",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:46.0) Gecko/20100101 Firefox/46.0",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:46.0) Gecko/20100101 Firefox/46.0",
        "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)",
        "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)",
        "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)",
        "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Win64; x64; Trident/6.0)",
        "Mozilla/5.0 (Windows NT 6.3; Win64, x64; Trident/7.0; rv:11.0) like Gecko",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/13.10586",
        "Mozilla/5.0 (iPad; CPU OS 10_0 like Mac OS X) AppleWebKit/602.1.38 (KHTML, like Gecko) Version/10.0 Mobile/14A300 Safari/602.1"
    ];
    const num = Math.floor(Math.random() * userAgentList.length);
    return userAgentList[num];
}
function createWebAPIRequest(host, path, method, data, cookie, callback, errorcallback, ress) {
    return __awaiter(this, void 0, void 0, function* () {
        if (cookie.match(/_csrf=[^(;|$)]+;/g))
            data.csrf_token = cookie.match(/_csrf=[^(;|$)]+/g)[0].slice(6);
        else
            data.csrf_token = "";
        const proxy = cookie.split("__proxy__")[1];
        const cryptoreq = cryptoss(data);
        const options = {
            url: `http://${host}${path}`,
            method: method,
            headers: {
                Accept: "*/*",
                "Accept-Language": "zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4",
                Connection: "keep-alive",
                "Content-Type": "application/x-www-form-urlencoded",
                Referer: "http://music.163.com",
                Host: "music.163.com",
                Cookie: cookie,
                "User-Agent": randomUserAgent()
            },
            body: qs_1.stringify({
                params: cryptoreq.params,
                encSecKey: cryptoreq.encSecKey
            }),
        };
        console.log(`[request] ${options.method} ${options.url}`);
        const ssbb = yield axios_1.default.post(options.url, options.body, { headers: options.headers });
        let cookier = ress.headers["set-cookie"];
        if (Array.isArray(cookier)) {
            cookier = cookier.map(x => x.replace(/.music.163.com/g, ""))
                .sort((a, b) => a.length - b.length);
        }
        callback(ssbb, cookier);
    });
}
class MusicController {
    static Login(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cookie = ctx.get("Cookie") ? ctx.get("Cookie") : "";
                const { username, password } = ctx.query;
                const md5sum = crypto.createHash('md5');
                md5sum.update(password);
                const data = {
                    phone: username,
                    password: md5sum.digest('hex'),
                    rememberLogin: 'true'
                };
                console.info(0);
                yield createWebAPIRequest("music.163.com", "/weapi/login/cellphone", 'POST', data, cookie, (music_req, cookie = []) => {
                    const cookieStr = "appver=1.5.9;os=osx; channel=netease;osver=%E7%89%88%E6%9C%AC%2010.13.2%EF%BC%88%E7%89%88%E5%8F%B7%2017C88%EF%BC%89";
                    cookieStr.split(";").forEach(item => {
                        cookie.push(item + ";Path=/");
                    });
                    ctx.set({
                        "Set-Cookie": cookie
                    });
                    console.info('1');
                    index_1.handleSuccess({ ctx, result: music_req.data });
                    console.info('2');
                }, err => index_1.handleError({ ctx, message: '22222', err }), ctx);
            }
            catch (err) {
                console.info('loginerr', err);
                index_1.handleError({ ctx, message: '22222', err });
            }
        });
    }
    static Getplay(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let cookie = ctx.get("Cookie") ? ctx.get("Cookie") : '';
                const { offset, uid, limit } = ctx.query;
                const data = {
                    offset: offset || 0,
                    uid: uid,
                    limit: limit || 30,
                    csrf_token: ""
                };
                yield createWebAPIRequest("music.163.com", "/weapi/user/playlist", 'POST', data, cookie, (music_req) => {
                    index_1.handleSuccess({ ctx, result: music_req.data });
                }, err => index_1.handleError({ ctx, message: '22222', err }), ctx);
            }
            catch (err) {
                console.info('play', err);
                index_1.handleError({ ctx, message: '22222', err });
            }
        });
    }
    static Getmusiclist(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let cookie = ctx.get("Cookie") ? ctx.get("Cookie") : '';
                const { id } = ctx.query;
                let data = {
                    id: id,
                    csrf_token: "",
                };
                yield createWebAPIRequest("music.163.com", "/weapi/playlist/detail", 'POST', data, cookie, (music_req) => {
                    index_1.handleSuccess({ ctx, result: music_req.data });
                }, err => index_1.handleError({ ctx, message: '22222', err }), ctx);
            }
            catch (err) {
                console.info(err, 'playlist11');
                index_1.handleError({ ctx, message: '22222', err });
            }
        });
    }
    static getLrc(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let cookie = ctx.get("Cookie") ? ctx.get("Cookie") : '';
                const { id } = ctx.query;
                let data = {
                    id: id
                };
                yield createWebAPIRequest("music.163.com", "/api/song/media?id=" + id, 'GET', {}, cookie, (music_req) => {
                    index_1.handleSuccess({ ctx, result: music_req.data });
                }, err => index_1.handleError({ ctx, message: '22222', err }), ctx);
            }
            catch (err) {
                console.info(err, 'lrcerr');
                index_1.handleError({ ctx, message: '22222', err });
            }
        });
    }
}
exports.default = MusicController;
//# sourceMappingURL=music.js.map