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
const index_1 = require("./router/index");
const app = new Koa();
const staticPath = './';
app.use(bodyParser({}));
app.use(koaStatic(path.join(__dirname, staticPath)));
app.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
    console.info('is-first');
    yield next();
}));
app.use(index_1.default.routes()).use(index_1.default.allowedMethods());
app.listen(3003, () => {
    console.info('[demo] start-quick is starting at port 3003');
});
//# sourceMappingURL=app.js.map