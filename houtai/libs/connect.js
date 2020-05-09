//引入包

let mongoose = require("mongoose")

//连接本地的数据库  mongodb://127.0.0.1:27107/my_blog
// (node:2524) DeprecationWarning: current URL string parser is deprecated, and wil
// l be removed in a future version. To use the new parser, pass option { useNewUrl
// Parser: true } to MongoClient.connect.
// (node:2524) DeprecationWarning: current Server Discovery and Monitoring engine i
// s deprecated, and will be removed in a future version. To use the new Server Dis
// cover and Monitoring engine, pass option { useUnifiedTopology: true } to the Mon
// goClient constructor.

//{ useNewUrlParser:true}消除警告
mongoose.connect("mongodb://127.0.0.1:27017/shop",{ useNewUrlParser:true,useUnifiedTopology: true })


