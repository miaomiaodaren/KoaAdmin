import { Document, Schema, Model, model } from 'mongoose';

export interface Type extends Document {
    type: Number,
}

const TypeSchema: Schema = new Schema({
    name : String,
    sorts : {
        type: Number,
        default: 0
    },
})

export const TypeModel: Model<Type> = model('TypeInfo', TypeSchema)


