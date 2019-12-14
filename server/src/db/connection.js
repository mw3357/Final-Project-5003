const mongoose = require('mongoose')
// 链接mongo 并且使用imooc这个集合
//mongoose.connect('mongodb://username:password@host:port/database?options...', {useNewUrlParser: true});
const DB_URL = 'mongodb://manman:admin@34.87.52.51:27017/demo1?authSource=admin';
mongoose.connect(DB_URL,{useMongoClient: true});

mongoose.connection.on('connected', function () {
	console.log("connected successfully!!");
});

module.exports = {
    mongoose: mongoose
};