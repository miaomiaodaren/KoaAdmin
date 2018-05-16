import { TypeModel } from '../model/index';
import { isEmptyObject, handleError, handleSuccess } from '../utils/index';

export default class TypeController {
    // @getParamsDec
    public static async GetTypeList(ctx, next) {
        try{
            const method = ctx.method, param = method === "GET" ? ctx.query : ctx.request.body;
            const [count, res] = await Promise.all([TypeModel.find({}).count(), TypeModel.find({...param}).sort( {"_id": 1, "name": 1, "sort": 1})]);
            handleSuccess({ctx, message: '成功!', result: {res, count}})
        } catch(err) {
            handleError({ctx, err})
        }    
    }
}