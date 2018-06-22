"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
exports.mongoose = mongoose;
mongoose.Promise = global.Promise;
const DB_URL = 'mongodb://47.96.114.115/nodejs';
mongoose.connection
    .once('error', err => console.info(`mongodb connect error: ${err}`))
    .once('open', () => {
    console.info(`mongodb connect sueecss`);
});
mongoose.connect(DB_URL).then().catch(e => console.log(e));
//# sourceMappingURL=index.js.map