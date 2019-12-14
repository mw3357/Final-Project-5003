const mongoose = require('mongoose')
// 链接mongo 并且使用imooc这个集合
//mongoose.connect('mongodb://username:password@host:port/database?options...', {useNewUrlParser: true});
const DB_URL = 'mongodb://manman:admin@34.87.52.51:27017/demo1?authSource=admin';
mongoose.connect(DB_URL,{useMongoClient: true});

mongoose.connection.on('connected', function () {
	console.log("connected successfully!!");
});

const models = {
	user:{
		'user':{type:String, 'require':true},
		'pwd':{type:String, 'require':true},
		'type':{'type':String, 'require':true},
		'avatar':{'type':String},
		'desc':{'type':String},
		'title':{'type':String},
		'company':{'type':String},
		'money': {'type':String}
	},
	chat: {}
};

for(let m in models){
	mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
	getModel:function(name){
		return mongoose.model("User", new mongoose.Schema(models['user']))
	}
};


