import { BlogModel } from '../model/index';
import { getParamsDec } from '../utils/index';
import { isEmptyObject, handleError, handleSuccess } from '../utils/index';

export default class BlogController {
    // @getParamsDec
    public static async GetBlogList(ctx, next) {
        try{
            const method = ctx.method, param = method === "GET" ? ctx.query : ctx.request.body;
            const [count, res] = await Promise.all([BlogModel.find({}).count(), BlogModel.find({...param}).sort({_id: -1})]);
            handleSuccess({ctx, message: '成功!', result: {count, data: res}})
        } catch(err) {
            handleError({ctx, err})
        }    
    }
}