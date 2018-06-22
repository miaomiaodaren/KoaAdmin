var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let utils = {};
let crypto1 = require('crypto');
utils.sign = function (config) {
    return (ctx, next) => __awaiter(this, void 0, void 0, function* () {
        config = config || {};
        let q = ctx.query, token = 'ffwxtoken', signature = q.signature, nonce = q.nonce, timestamp = q.timestamp, echostr = q.echostr;
        let str = [token, timestamp, nonce].sort().join('');
        const hashCode = crypto1.createHash('sha1');
        let resultCode = hashCode.update(str, 'utf8').digest('hex');
        console.info('i am is coming', hashCode, resultCode);
        if (ctx.method == 'GET') {
            if (resultCode === signature) {
                ctx.body = echostr;
            }
            else {
                yield next();
            }
        }
        else if (ctx.method == 'POST') {
            yield next();
        }
    });
};
module.exports = utils;
//# sourceMappingURL=wxutil.js.map