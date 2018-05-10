const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const DB_URL = 'mongodb://localhost/nodejs';
exports.DB = mongoose.connect(DB_URL, {
    useMongoClient: true,
});
//# sourceMappingURL=index.js.map