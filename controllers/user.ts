import { UserModel } from '../model/index';
import { isEmptyObject, handleError, handleSuccess } from '../utils/index';

export default class UserController {
    constructor() {}
    public static async GetUserList(ctx, next) {
        const method = ctx.method, param = method === "GET" ? ctx.query : ctx.request.body;
        let params = {};
        if(!isEmptyObject(param)) {
            let selparams = {
                _id:  param._id || '',
                isAdmin: param.isAdmin || '', 
                name: param.name || '',
            };
            for(let v in selparams) {
                selparams[v] !== '' ? params[v] = selparams[v] : ''; 
            }
        }
        const userList = await UserModel.find(params, {'_id': 1, 'isAdmin': 1, 'name': 1}).sort({_id: -1});
        ctx.body = {
            statue: 'success',
            list: userList,
        }
    }

    public static async addUser(ctx, next) {
        const method = ctx.method, param = method === "GET" ? ctx.query : ctx.request.body;
        const {name, psw, isAdmin, _id} = param;
        let hasUser = !!name ? await UserModel.find({name: name}, {'_id': 1, 'name': 1}) : void 0;
        if(_id) {
            if (hasUser && hasUser.length) {
                const info = await UserModel.update({'_id': _id}, {$set: {'name': name, 'isAdmin': isAdmin}});
                if(info) {
                    handleSuccess({ctx, message:'更新用户成功！'})
                }
            } else {
                handleError({ctx, message:'更新用户不存在！'})
                return false
            }
        } else {
            if(hasUser && hasUser.length) {
                handleError({ctx, message:'用户名已存在！'})
                return false
            } else if(!psw) {
                handleError({ctx, message:'密码不能为空'})
                return false
            }
            const user = new UserModel({name, psw, isAdmin});
            const addusers = user.save();
            ctx.body = addusers ? handleSuccess({ctx, message:'注册成功'}) : handleError({ctx, message:'注册失败'})
        }
    }

    public static async RemoveUser(ctx, next) {
        const { id } = ctx.request.body;
        if(id) {
            try {
                let hasUser = await UserModel.findOne({_id: id});
                if(hasUser) {
                    let rmUser = await UserModel.remove({_id: id});
                    if(rmUser) {
                        handleSuccess({ctx, message:'用户删除成功'})
                    }
                } else {
                    handleError({ctx, message:'用户不存在'})
                    return false
                }
            } catch(err) {
                handleError({ctx, err})
                return false
            }
        } else {
            handleError({ctx, message: '缺少必要参数'})
            return false
        }
    }
}


