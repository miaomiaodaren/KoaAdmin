const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const DB_URL = 'mongodb://localhost/nodejs';

mongoose.connection
.once('error', err => console.info(`mongodb connect error: ${err}`))
.once('open', () => {
    console.info(`mongodb connect sueecss`)
})

//连接mongodb数据库
mongoose.connect(DB_URL).then().catch(e => console.log(e));

export {
    mongoose,
}