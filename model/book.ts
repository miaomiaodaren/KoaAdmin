import { Document, Schema, Model, model } from 'mongoose';

export interface Books extends Document {
    title : String,     //小说名字
    author : String,      //作者
    jianjie: String,    //简介
    addtime: String,    //更新时间
    type: String,        //小说属于的类别
    img: String,     //头像
    titlelist: any[],  //章节列表
    bookid: Number,     //bookid
    chapter: any[],     //章节列表
}

const Book: Schema = new Schema({
    title : String,
    author : String,
    jianjie: String,
    addtime: String,
    type: String, 
    img: String,
    titlelist: Array,
    bookid: Number,
    chapter: Array,
});
export const BookModel: Model<Books> = model('Book', Book)