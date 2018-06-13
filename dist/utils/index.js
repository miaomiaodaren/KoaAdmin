"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const path = require('path');
const BusBoy = require('busboy');
const inspect = require('util').inspect;
exports.handleError = ({ ctx, message = '请求失败', err = '' }) => {
    ctx.body = { status: 'error', message, debug: err };
};
exports.handleSuccess = ({ ctx, message = '请求成功', result = '' }) => {
    ctx.body = { status: 'success', message, result };
};
exports.isEmptyObject = (obj) => {
    for (let name in obj) {
        return false;
    }
    return true;
};
exports.getParamsDec = function (target, name, descriptor) {
    let oldValue = descriptor.value;
    descriptor.value = function () {
        const rctx = arguments && arguments[0];
        const method = rctx.method, param = method === "GET" ? rctx.query : rctx.request.body;
        oldValue.apply(this, [...arguments, param]);
    };
    return descriptor;
};
exports.mkdirsSync = (dirname) => {
    if (fs.existsSync(dirname)) {
        return true;
    }
    else {
        if (exports.mkdirsSync(path.dirname(dirname))) {
            fs.mkdirsSync(dirname);
            return true;
        }
    }
};
function getSuffixName(fileName) {
    let nameList = fileName.split('.');
    return nameList[nameList.length - 1];
}
exports.uploadSync = (ctx, options) => {
    console.info(options, 'isoptinons');
    let busboy = new BusBoy({ headers: ctx.req.headers });
    let fileType = options.fileType || 'common';
    let filePath = path.join(options.path, fileType);
    let mkdirResult = exports.mkdirsSync(filePath);
    return new Promise((resolve, reject) => {
        console.log('文件上传中...');
        let result = {
            success: false,
            formData: {},
            message: ''
        };
        busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename);
            let _uploadFilePath = path.join(filePath, fileName);
            let saveTo = path.join(_uploadFilePath);
            file.pipe(fs.createWriteStream(saveTo));
            file.on('end', function () {
                result.success = true;
                result.message = '文件上传成功';
                console.log('文件上传成功！');
                resolve(result);
            });
        });
        busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
            console.log('表单字段数据 [' + fieldname + ']: value: ' + inspect(val));
            result.formData[fieldname] = inspect(val);
        });
        busboy.on('finish', function () {
            console.log('文件上结束');
            resolve(result);
        });
        busboy.on('error', function (err) {
            console.log('文件上出错');
            reject(result);
        });
        ctx.req.pipe(busboy);
    });
};
//# sourceMappingURL=index.js.map