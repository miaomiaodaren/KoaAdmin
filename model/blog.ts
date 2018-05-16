import { Document, Schema, Model, model } from 'mongoose';

export interface Blog extends Document {
    title: string,
    type: string,
    content: string,
    addtime: string,
}

const BlogSchema: Schema = new Schema({
    title : String,
    type : String,
    content: String,
    addtime: String,
});
export const BlogModel: Model<Blog> = model('News', BlogSchema)