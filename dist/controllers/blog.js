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
class BlogController {
    static GetBlogList(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const method = ctx.method, param = method === "GET" ? ctx.query : ctx.request.body;
                const { title, page, pagesize, type, _id } = param;
                console.info(type, _id, 444, { type, _id });
                let dataer;
                if (title) {
                    dataer = type ? { $or: [{ title: { $regex: title, $options: "$i" } }], type } : { $or: [{ title: { $regex: title, $options: "$i" } }] };
                }
                else if (_id) {
                    dataer = { _id };
                }
                else {
                    dataer = type ? { type } : {};
                }
                const [count, res] = yield Promise.all([
                    index_1.BlogModel.find(dataer).count(),
                    index_1.BlogModel.find(dataer).sort({ _id: -1 }).limit(parseInt(pagesize)).skip(parseInt(pagesize) * (page - 1))
                ]);
                index_2.handleSuccess({ ctx, message: '成功!', result: { count, data: res, page: parseInt(page), pagesize } });
            }
            catch (err) {
                index_2.handleError({ ctx, err });
            }
        });
    }
    static AddBlog(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = ctx.method, param = method === 'GET' ? ctx.query : ctx.request.body;
            const { title, type, content, _id } = param;
            const addtime = new Date();
            if (!title)
                index_2.handleError({ ctx, err: '标题不能为空' });
            if (!type)
                index_2.handleError({ ctx, err: '类别不能为空' });
            if (!content)
                index_2.handleError({ ctx, err: '内容不能为空' });
            if (_id) {
                try {
                    const info = yield index_1.BlogModel.update({ '_id': _id }, { $set: { 'title': title, 'type': type, 'content': content, 'addtime': addtime } });
                    index_2.handleSuccess({ ctx, message: '添加新闻成功!' });
                }
                catch (err) {
                    if (!content)
                        index_2.handleError({ ctx, err: '添加新闻失败' });
                }
            }
            else {
                const addnew = new index_1.BlogModel({
                    title: title,
                    type: type,
                    content: content,
                    addtime: addtime
                });
                try {
                    yield addnew.save();
                    index_2.handleSuccess({ ctx, message: '新闻发布成功!' });
                }
                catch (err) {
                    index_2.handleError({ ctx, err: '添加新闻失败' });
                }
                ;
            }
        });
    }
    static DelBlog(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = ctx.method, param = method === 'GET' ? ctx.query : ctx.request.body;
            const { _id } = param;
            if (_id) {
                try {
                    const info = yield index_1.BlogModel.remove({ '_id': _id });
                    if (info)
                        index_2.handleSuccess({ ctx, message: '消息删除成功!' });
                }
                catch (err) {
                    index_2.handleSuccess({ ctx, message: '消息删除失败!' });
                }
            }
            else {
                index_2.handleSuccess({ ctx, message: '缺少必要参数!' });
            }
        });
    }
}
exports.default = BlogController;
//# sourceMappingURL=blog.js.map