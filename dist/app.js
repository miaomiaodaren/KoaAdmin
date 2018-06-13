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
const Koa = require('koa');
const path = require('path');
const http = require('http');
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const logger = require('koa-logger');
const { logUtil, initLogPath } = require('./utils/log_util');
const log_config = require('./config/log_config');
require("./config/index");
const index_1 = require("./router/index");
const interceptor_1 = require("./middleWares/interceptor");
console.info(__dirname, 'is__dirname');
const app = new Koa();
const staticPath = './';
app.use(bodyParser());
app.use(koaStatic(path.join(__dirname, staticPath)));
app.use(logger());
app.use(interceptor_1.default);
app.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
    yield initLogPath(log_config);
    const start = new Date();
    let ms;
    try {
        yield next();
        ms = new Date().getTime() - start.getTime();
        logUtil.logResponse(ctx, ms);
    }
    catch (error) {
        ms = new Date().getTime() - start.getTime();
        logUtil.logError(ctx, error, ms);
    }
}));
app.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
    console.info('is-first');
    yield next();
    console.info(4);
}));
app.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield next();
        if (ctx.status === 404 || ctx.status === 405)
            ctx.body = { code: 0, message: '无效的api请求' };
    }
    catch (error) {
        ctx.body = { code: 0, message: '服务器内部错误' };
    }
}));
app.use(index_1.default.routes()).use(index_1.default.allowedMethods());
app.listen(3003, () => {
    console.info('[demo] start-quick is starting at port 3003');
});
//# sourceMappingURL=app.js.map