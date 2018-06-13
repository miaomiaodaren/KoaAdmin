const log4js = require('log4js');
const fs = require('fs');
const log_config = require('../config/log_config');
log4js.configure(log_config);
const logUtil = {};
const errorLogger = log4js.getLogger('errorLogger');
const resLogger = log4js.getLogger('resLogger');
logUtil.logError = function (ctx, error, resTime) {
    if (ctx && error) {
        errorLogger.error(formatError(ctx, error, resTime));
    }
};
logUtil.logResponse = function (ctx, resTime) {
    if (ctx) {
        resLogger.info(formatRes(ctx, resTime));
    }
};
const formatRes = function (ctx, resTime) {
    let logText = new String();
    logText += "\n" + "*************** response log start ***************" + "\n";
    logText += formatReqLog(ctx.request, resTime);
    logText += "response status: " + ctx.status + "\n";
    logText += "response body: " + "\n" + JSON.stringify(ctx.body) + "\n";
    logText += "*************** response log end ***************" + "\n";
    return logText;
};
const formatError = function (ctx, err, resTime) {
    let logText = new String();
    logText += "\n" + "*************** error log start ***************" + "\n";
    logText += formatReqLog(ctx.request, resTime);
    logText += "err name: " + err.name + "\n";
    logText += "err message: " + err.message + "\n";
    logText += "err stack: " + err.stack + "\n";
    logText += "*************** error log end ***************" + "\n";
    return logText;
};
const formatReqLog = function (req, resTime) {
    let logText = new String();
    const method = req.method;
    logText += "request method: " + method + "\n";
    logText += "request originalUrl:  " + req.originalUrl + "\n";
    logText += "request client ip:  " + req.ip + "\n";
    let startTime;
    if (method === 'GET') {
        logText += "request query:  " + JSON.stringify(req.query) + "\n";
    }
    else {
        logText += "request body: " + "\n" + JSON.stringify(req.body) + "\n";
    }
    logText += "response time: " + resTime + "\n";
    return logText;
};
const confirmPath = (pathStr) => {
    if (!fs.existsSync(pathStr)) {
        fs.mkdirSync(pathStr);
        console.log('createPath: ' + pathStr);
    }
};
const initLogPath = (ptahConfig) => {
    if (ptahConfig.baseLogPath) {
        confirmPath(ptahConfig.baseLogPath);
        for (var i = 0, len = ptahConfig.appenders.length; i < len; i++) {
            if (ptahConfig.appenders[i].path) {
                confirmPath(ptahConfig.baseLogPath + ptahConfig.appenders[i].path);
            }
        }
    }
};
module.exports = { logUtil, initLogPath };
//# sourceMappingURL=log_util.js.map