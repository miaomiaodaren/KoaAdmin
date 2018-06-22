let utils: any = {};  
let crypto1 = require('crypto');

//微信签名认证中间件
utils.sign = function(config) {
	return async (ctx, next) => {
		config = config || {};
		let q = ctx.query,
			token = 'ffwxtoken',
			signature = q.signature,
			nonce = q.nonce,
			timestamp = q.timestamp,
			echostr = q.echostr;
		let str = [token, timestamp, nonce].sort().join('');
	    const hashCode = crypto1.createHash('sha1');
		let resultCode = hashCode.update(str, 'utf8').digest('hex');
		console.info('i am is coming', hashCode, resultCode);
    	if(ctx.method == 'GET') {
    		if(resultCode === signature) {
				ctx.body = echostr
    		} else {
                await next();
    		}
    	} else if(ctx.method == 'POST') {
    		await next();
    	}
    }
}

module.exports = utils;