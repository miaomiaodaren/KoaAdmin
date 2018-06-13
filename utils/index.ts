const fs = require('fs');
const path = require('path');
const BusBoy = require('busboy');       //文件上传插件
const inspect = require('util').inspect;

//统一错误处理
export interface handParams {
    ctx: any,
    message?: string
    err?: any
    result?: any
}

export const handleError = ({ ctx, message = '请求失败', err = '' }: handParams) => {
    ctx.body = { status: 'error', message, debug: err }
}

export const handleSuccess = ({ctx, message ='请求成功', result=''}: handParams) => {
    ctx.body = { status: 'success', message, result }
}

export const isEmptyObject = (obj: any) => {
    for(let name in obj) {
        return false;
    }
    return true;
}


export const getParamsDec = function(target, name, descriptor) {
    let oldValue = descriptor.value;
    descriptor.value = function() {
        const rctx = arguments && arguments[0];
        const method = rctx.method, param = method === "GET" ? rctx.query : rctx.request.body;
        oldValue.apply(this, [...arguments, param]);
    }
    return descriptor
}

//同步新建目录
export const mkdirsSync = (dirname) => {
    if(fs.existsSync(dirname)) {                //判断这个路径是否存在
        return true
    } else {
        if(mkdirsSync(path.dirname(dirname))) {     //path.dirname是返回一个path的目录名  path.dirname('/foo/bar/baz/asdf/quux');   返回: '/foo/bar/baz/asdf'
            fs.mkdirSync(dirname)
            return true
        }
    }
}

function getSuffixName( fileName ) {
    let nameList = fileName.split('.')
    return nameList[nameList.length - 1]
}

//同步上传文件
export const uploadSync = (ctx, options) => {
    let busboy = new BusBoy({headers: ctx.req.headers, limits: {fileSize: 200, files: 1}})
    let fileType = options.fileType || 'common'
    let filePath = path.join( options.path,  fileType)
    let mkdirResult = mkdirsSync( filePath );
    return new Promise((resolve, reject) => {
        console.log('文件上传中...');
        let islimit = true;
        let result = { 
            success: false,
            formData: {},
            message: '',
            imgpath: ''
        }
        // 解析请求文件事件
        busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
            let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename)
            let _uploadFilePath = path.join( filePath, fileName )
            let saveTo = path.join(_uploadFilePath);

            // 文件保存到制定路径
            file.pipe(fs.createWriteStream(saveTo))

            file.on('limit', function() {
                fs.unlinkSync(saveTo);
                result.success = false;
                result.message = '文件上传失败';
                reject(result)
            })
            file.on('end', function() {
                console.info(3, result.message);
            })
    
            // 文件写入事件结束
            // file.on('end', function() {
            //     result.success = true
            //     result.message = '文件上传成功'
            //     result.imgpath = saveTo
            //     console.log('文件上传成功！')
            //     resolve(result)
            // })
        })
    
        // 解析表单中其他字段信息
        busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
            console.log('表单字段数据 [' + fieldname + ']: value: ' + inspect(val));
            result.formData[fieldname] = inspect(val);
        });
        
        // 解析结束事件
        busboy.on('finish', function( ) {
            console.log('文件上结束', ...arguments)
            resolve(result)
        })
    
        // 解析错误事件
        busboy.on('error', function(err) {
            console.log('文件上出错')
            reject(result)
        })
    
        ctx.req.pipe(busboy)
    })
}