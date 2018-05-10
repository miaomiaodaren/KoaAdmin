import { UserModel } from '../model/index';
import { isEmptyObject } from '../utils/index';

class UserController {
    constructor() {}
    async GetUserList(ctx, next) {
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

    async addUser(ctx, next) {
        const method = ctx.method, param = method === "GET" ? ctx.query : ctx.request.body;
    }
}

export default new UserController()