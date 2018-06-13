const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// const DB_URL = 'mongodb://localhost/nodejs';
const DB_URL = 'mongodb://47.96.114.115/nodejs';

mongoose.connection
.once('error', err => console.info(`mongodb connect error: ${err}`))
.once('open', () => {
    console.info(`mongodb connect sueecss`)
})

//连接mongodb数据库, {user: 'nodejs', pass: '123456'}
mongoose.connect(DB_URL).then().catch(e => console.log(e));

export {
    mongoose,
}