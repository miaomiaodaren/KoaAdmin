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
const index_1 = require("../model/index");
const index_2 = require("../utils/index");
class UserController {
    constructor() { }
    static GetUserList(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = ctx.method, param = method === "GET" ? ctx.query : ctx.request.body;
            let params = {};
            if (!index_2.isEmptyObject(param)) {
                let selparams = {
                    _id: param._id || '',
                    isAdmin: param.isAdmin || '',
                    name: param.name || '',
                };
                for (let v in selparams) {
                    selparams[v] !== '' ? params[v] = selparams[v] : '';
                }
            }
            const userList = yield index_1.UserModel.find(params, { '_id': 1, 'isAdmin': 1, 'name': 1 }).sort({ _id: -1 });
            ctx.body = {
                statue: 'success',
                list: userList,
            };
        });
    }
    static addUser(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = ctx.method, param = method === "GET" ? ctx.query : ctx.request.body;
            const { name, psw, isAdmin, _id } = param;
            let hasUser = !!name ? yield index_1.UserModel.find({ name: name }, { '_id': 1, 'name': 1 }) : void 0;
            if (_id) {
                if (hasUser && hasUser.length) {
                    const info = yield index_1.UserModel.update({ '_id': _id }, { $set: { 'name': name, 'isAdmin': isAdmin } });
                    if (info) {
                        index_2.handleSuccess({ ctx, message: '更新用户成功！' });
                    }
                }
                else {
                    index_2.handleError({ ctx, message: '更新用户不存在！' });
                    return false;
                }
            }
            else {
                if (hasUser && hasUser.length) {
                    index_2.handleError({ ctx, message: '用户名已存在！' });
                    return false;
                }
                else if (!psw) {
                    index_2.handleError({ ctx, message: '密码不能为空' });
                    return false;
                }
                const user = new index_1.UserModel({ name, psw, isAdmin });
                const addusers = user.save();
                ctx.body = addusers ? index_2.handleSuccess({ ctx, message: '注册成功' }) : index_2.handleError({ ctx, message: '注册失败' });
            }
        });
    }
    static RemoveUser(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = ctx.request.body;
            if (id) {
                try {
                    let hasUser = yield index_1.UserModel.findOne({ _id: id });
                    if (hasUser) {
                        let rmUser = yield index_1.UserModel.remove({ _id: id });
                        if (rmUser) {
                            index_2.handleSuccess({ ctx, message: '用户删除成功' });
                        }
                    }
                    else {
                        index_2.handleError({ ctx, message: '用户不存在' });
                        return false;
                    }
                }
                catch (err) {
                    index_2.handleError({ ctx, err });
                    return false;
                }
            }
            else {
                index_2.handleError({ ctx, message: '缺少必要参数' });
                return false;
            }
        });
    }
    static Login(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userName, passWord } = ctx.request.body;
            try {
                const dataInfo = yield index_1.UserModel.findOne({ name: userName, psw: passWord });
                if (dataInfo) {
                    index_2.handleSuccess({ ctx, message: '用户登录成功' });
                }
                else {
                    index_2.handleError({ ctx, message: '账号密码出错' });
                }
            }
            catch (err) {
                index_2.handleError({ ctx, message: '缺少必要参数', err });
            }
        });
    }
    static ImgUpload(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let serverFilePath = path.join(__dirname, 'upload-files');
            console.info(222);
            try {
                const result = yield index_2.uploadSync(ctx, {
                    fileType: 'album',
                    path: serverFilePath
                });
                console.info(result, 'siresult');
                ctx.body = result;
            }
            catch (err) {
                console.info(222);
                console.info(err);
            }
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=user.js.map