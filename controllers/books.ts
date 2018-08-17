import { BookModel } from '../model/index';

export default class BookController {
    static async getBookList(ctx, next) {
        console.info(2);
    }
}

BookController.getBookList(1, 2);