import { BlogModel } from '../model/index';
import { getParamsDec } from '../utils/index';
import { isEmptyObject, handleError, handleSuccess } from '../utils/index';



export default class BlogController {
    // @getParamsDec
    public static async GetBlogList(ctx, next) {
        try{
            const method = ctx.method, param = method === "GET" ? ctx.query : ctx.request.body;
            const { title, page, pagesize, type , _id} = param; 
            console.info(type, _id, 444, {type, _id});
            let dataer: object;
            if(title) {
                dataer = type ? {$or: [{title: {$regex: title, $options: "$i"}}], type} : {$or: [{title: {$regex: title, $options: "$i"}}]}
            } else if(_id) {
                dataer = {_id}
            } else {
                dataer = type ? {type} : {}
            }
            const [count, res] = await Promise.all([
                BlogModel.find(dataer).count(), 
                BlogModel.find(dataer).sort({_id: -1}).limit(parseInt(pagesize)).skip(parseInt(pagesize) * (page -1))
            ]);
            handleSuccess({ctx, message: '成功!', result: {count, data: res, page: parseInt(page), pagesize}})
        } catch(err) {
            handleError({ctx, err})
        }    
    }

    public static async AddBlog(ctx, next) {
        const method = ctx.method, param = method === 'GET' ? ctx.query : ctx.request.body;
        const {title, type, content, _id} = param; const addtime = new Date();
        if(!title) handleError({ctx, err: '标题不能为空'})
        if(!type) handleError({ctx, err: '类别不能为空'})
        if(!content) handleError({ctx, err: '内容不能为空'})
		if(_id) {
            try{
                const info = await BlogModel.update({'_id': _id}, {$set: {'title': title, 'type': type, 'content': content, 'addtime': addtime}});
                handleSuccess({ctx, message: '添加新闻成功!'})
            } catch(err) {
                if(!content) handleError({ctx, err: '添加新闻失败'})
            }
		} else {
			const addnew = new BlogModel({
				title: title,
				type: type,
				content: content,
				addtime: addtime
			});
			try {
				await addnew.save();
                handleSuccess({ctx, message: '新闻发布成功!'})
			} catch(err) {
                handleError({ctx, err: '添加新闻失败'})
			};
		}
    }

    public static async DelBlog(ctx, next) {
        const method = ctx.method, param = method === 'GET' ? ctx.query : ctx.request.body;
        const { _id } = param;
        if(_id) {
            try{
                const info = await BlogModel.remove({'_id': _id});
                if(info) handleSuccess({ctx, message: '消息删除成功!'})
            } catch(err) {
                handleSuccess({ctx, message: '消息删除失败!'})
            }
        } else {
            handleSuccess({ctx, message: '缺少必要参数!'})
        }
    }
}