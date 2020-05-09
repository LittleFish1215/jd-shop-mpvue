
//整个后台项目的入口文件
//1.express操作
//1-1 引入express

let  express =  require('express')

//引入模板引擎

var ejs = require("ejs")

//引入文件模块

var path = require("path")

//1-2 实例化express
let app =  new express()


//2.ejs的操作
//2-1  直接给当前app设置模板引擎  (ejs模板 默认目录  views)
// app.set('view engine','ejs')
app.set("view engine","html")
app.engine("html",ejs.__express)

//3.处理静态文件目录问题（处理css  js的文件路径）
//设置静态文件目录
app.use(express.static(path.join(__dirname,"static")))

app.use('/upload',express.static('upload'))
// app.use(express.static(path.join(__dirname,"upload")))


//4-1 连接数据库

require("./libs/connect")



//6.引入文件模块
let  fs =  require('fs')


//7.引入相关路由模块 

var typeRouter = require("./controller/typeRouter")
var productRouter = require("./controller/productRouter")
var cartRouter = require("./controller/cartRouter")
var orderRouter = require("./controller/orderRouter")
var apiRouter = require("./controller/apiRouter")


//===========================首页模块=======================

app.get("/",(req,res)=>{

    res.render("index")
})

//===========================商品类别模块=======================


app.use("/type",typeRouter);

//===========================商品模块=======================

app.use("/product",productRouter);

//===========================购物车模块=======================

app.use("/cart",cartRouter);

//===========================订单模块=======================

app.use("/order",orderRouter);


//接口模块

app.use(apiRouter)





//使用中间件处理404异常模块
// app.use((req,res)=>{
    
//     // res.render("wait",{content:"您要找的东西去火星了",wait:3,href:"/"})
//     res.status(404).render("wait",{content:"您要找的东西去火星了",wait:3,href:"/type/index"})
// })


//监听3000
app.listen(3000,()=>{
    console.log("请在浏览器中输入http://127.0.0.1:3000");
})
