import { Document, Schema, Model, model } from 'mongoose';

export interface User extends Document {
    name: string,
    psw: [string, number],
    isAdmin: Boolean
}

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    psw : [String, Number],
    isAdmin: {
        type: Boolean,
        default: false
    }
})

export const UserModel: Model<User> = model('User', UserSchema)