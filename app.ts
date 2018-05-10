const Koa = require('koa');
const path = require('path');                        //node path
const http = require('http');                       //node http
const koaStatic = require('koa-static');            //配置koa静态资源目录
const bodyParser = require('koa-bodyparser');         //http request or resepon
const Router = require('koa-router');               //koa-router
import './config/index';

import route from './router/index';

const app = new Koa();
const staticPath = './'                             //此处路径是以启动的app.js做为相对路径

app.use(bodyParser())                               //use ctx.body 解析中间件 GET请求使用ctx.query,POST使用ctx.request.body
app.use(koaStatic(path.join( __dirname,  staticPath)))


app.use(async(ctx, next) => {
    console.info('is-first');
    await next()
})

app.use(route.routes()).use(route.allowedMethods())

app.listen(3003, () => {
    console.info('[demo] start-quick is starting at port 3003')
})