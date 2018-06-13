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
class TypeController {
    static GetTypeList(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const method = ctx.method, param = method === "GET" ? ctx.query : ctx.request.body;
                const [count, res] = yield Promise.all([index_1.TypeModel.find({}).count(), index_1.TypeModel.find(Object.assign({}, param)).sort({ "_id": 1, "name": 1, "sort": 1 })]);
                index_2.handleSuccess({ ctx, message: '成功!', result: { res, count } });
            }
            catch (err) {
                index_2.handleError({ ctx, err });
            }
        });
    }
}
exports.default = TypeController;
//# sourceMappingURL=type.js.map