const Koa = require('koa');
const path = require('path');                        //node path
const http = require('http');                       //node http
const koaStatic = require('koa-static');            //配置koa静态资源目录
const bodyParser = require('koa-bodyparser');         //http request or resepon
const Router = require('koa-router');               //koa-router
const logger = require('koa-logger');               //koa-logger
const {logUtil, initLogPath} = require('./utils/log_util');        //node-log4js 
const log_config = require('./config/log_config');
import './config/index';

import route from './router/index';
import interceptor from './middleWares/interceptor';

console.info(__dirname, 'is__dirname', path.join( __dirname,  './'));

const app = new Koa();
const staticPath = './'                             //此处路径是以启动的app.js做为相对路径

app.use(bodyParser())                               //use ctx.body 解析中间件 GET请求使用ctx.query,POST使用ctx.request.body
app.use(koaStatic(path.join( __dirname,  staticPath)))
app.use(logger());
app.use(interceptor);
app.use(async (ctx, next) => {
    await initLogPath(log_config);           //logger 初始化,创建文件
    const start = new Date();  //响应开始时间
    let ms: any;    //响应间隔时间
    try {
        await next(); //开始进入到下一个中间件
        ms = new Date().getTime() - start.getTime();
        logUtil.logResponse(ctx, ms);  //记录响应日志
    } catch (error) {
        ms = new Date().getTime() - start.getTime();
        logUtil.logError(ctx, error, ms);   //记录异常日志
    }
});

app.use(async(ctx, next) => {
    console.info('is-first');
    await next()
    console.info(4);
})

app.use(async (ctx, next) => {
    try {
        await next()
        if (ctx.status === 404 || ctx.status === 405) ctx.body = { code: 0, message: '无效的api请求'}
    } catch (error) {
        ctx.body = { code: 0, message: '服务器内部错误' }
        // ctx.redirect(path);  koa 转发到某页面
    }
})

app.use(route.routes()).use(route.allowedMethods())


app.listen(3003, () => {
    console.info('[demo] start-quick is starting at port 3003')
})