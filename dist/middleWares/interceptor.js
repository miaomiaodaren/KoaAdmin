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
exports.default = (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    ctx.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild',
        'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS'
    });
    if (ctx.request.method === 'OPTIONS') {
        console.info('isoptions');
        ctx.status = 200;
        return false;
    }
    yield next();
});
//# sourceMappingURL=interceptor.js.map