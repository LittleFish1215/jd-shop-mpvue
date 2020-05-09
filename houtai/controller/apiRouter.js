var express = require("express")


let router = express.Router()

var cartModel = require("../model/cartModel")
var productModel = require("../model/productModel")
var typeModel = require("../model/typeModel")
var orderModel = require("../model/orderModel")



//1-3  【以下全是接口】

//返回所有类别的接口
router.get('/wxapiGetTypes',function(req,res){
    // res.send('获取所有类别');
        typeModel.find({},{},{},(errs,ress)=>{
        // db.collection('type').find({}).toArray(function(errs,ress){
            // console.log(ress)
            res.send(ress)
            // res.writeHead('200',{"Content-Type":"application/json"})
            // res.write(JSON.stringify(ress))
            // res.end()
        })

    });



// //返回指定条件的商品
router.get('/wxapiGetProducts',function(req,res){
//         //获取条件
    //   res.send(req.query)
    console.log(req.query)
    let  where = req.query  || []; // 条件

//     //     //根据条件获取数据
//     //  find({typeid:typeid,status:{$ne:3}})

//     // console.log(where)
    if(where.tag){
        //列表页面
        where.status = JSON.parse(where.status)
        delete where.tag
    }



            productModel.find(where,{},{},(errs,ress)=>{
//             // console.log(ress)
            res.send(ress)
            // res.writeHead('200',{"Content-Type":"application/json"})
            // res.write(JSON.stringify(ress))
            // res.end()
        })

    });


// //根据条件，获取一条商品信息
router.get('/wxapiGetProductDetail',function(req,res){
//         console.log(req.query)
        let id =req.query.id


        productModel.findById(id,(errs,result)=>{
//         db.collection('product').findOne({_id:id},function(errs,result){
            res.writeHead('200',{"Content-Type":"application/json"})
            res.write(JSON.stringify(result))
            res.end()
        })


    });



// //添加购物车接口
router.get('/wxapiAddCart',function(req,res){
//         // console.log(req.query)
    let  _id = req.query.id; //获取商品id
    let username = req.query.username;// 获取用户名
    let openid = req.query.openid;// 获取用户openid

	console.log(_id,username,openid,111);

    // 查询该条商品的信息
    productModel.findById(_id,(errs,result)=>{
//             // console.log(result)
//             //整理cart表所需要的字段参数数据
            let goodsname = result.goodsname;
            let picname = result.picname;
            let  goodsid = req.query.id;
            let price = result.price;
            let num = 1;
            let checked = true;// t加入购物车后，默认选择

//             //  插入购物车之前，应该先判断当前从购物车内当前用户是否买过当前此款商品，是否有该商品，如果有，则修改数量，没有则添加
            cartModel.find({goodsid,openid},(es,rs)=>{


//             db.collection('cart').findOne({goodsid:goodsid},function(es,rs){
				console.log(rs,2222222)

                if(rs.length!=0){
//                     //已经买过了
					console.log("已经买过了");

                    cartModel.update({goodsid},{num:++rs[0].num},(e,r)=>{
//                         // console.log(r,"修改")
                        res.writeHead('200',{"Content-Type":"application/json"})
                        res.write(JSON.stringify(r))
                        res.end()
                    })
                }else{
				console.log("没有买过",openid);
//                     //没有买过
                    let cart = {
                        goodsid,
                        price,
                        num,
                        checked,
                        username,
                        openid
                    }
					console.log(cart,456);
                    cartModel.create(cart,(e,r)=>{

//                         // console.log(r,"插入")
                        res.writeHead('200',{"Content-Type":"application/json"})
                        res.write(JSON.stringify(r))
                        res.end()
                    })
                }
            })



        })


    });

//2.数据库
var mongoClient = require('mongodb').MongoClient;

let DBurl = "mongodb://127.0.0.1:27017/shop"

var  ObjectId =  require('mongodb').ObjectId;
// //获取购物车信息
router.get('/wxapiGetCarts',function(req,res){
    //传递的参数 是唯一的身份
    let openid = req.query.openid;
    mongoClient.connect(DBurl, function(err, db) {
        //查询数据库中  该唯一身份的人是否有信息
        db.collection('carts').find({openid}).toArray(function(errs,result){
            // res.send(result)
            // 购物车  有一个商品的id属性
            result.forEach((item,index)=>{
                //item.goodsid
                db.collection('products').findOne({_id:ObjectId(item.goodsid)},function (e,r) {
                    // console.log(r,"123")
                    result[index].goodsname = r.goodsname;
                    result[index].picname = r.picname;
                    result[index].goods_num = r.num;
                })
            })
            setTimeout(()=>{

                res.writeHead('200',{"Content-Type":"application/json"})
                res.write(JSON.stringify(result))
                res.end()

            },100)

        })

    });



    });




// //处理购物车信息内容   改变状态（checked）  改变 数量（num）
router.get('/wxapiChangeCart',function(req,res) {

    let _id = req.query.cartid// 购物车信息的id

    let params = req.query; //所有的参数
    delete params.cartid;

    console.log(params)//{}
    let checked = req.query.checked;  //修改之后的状态
    let  num =  req.query.num;
//     //更改的该条数据 所有信息
    cartModel.update({_id},params,(e,r)=>{
//         db.collection('cart').updateOne({_id}, {$set: params}, function (e,r) {
            res.writeHead('200',{"Content-Type":"application/json"})
            res.write(JSON.stringify(r))
            res.end()
        })
    })



	// /清空理购物车信息内容
router.get('/wxapiDeleteCart',function(req,res) {

     let id = req.query.id;//sam





    cartModel.deleteOne({_id:id},(e)=>{
//         db.collection('cart').updateOne({_id}, {$set: params}, function (e,r) {
            res.writeHead('200',{"Content-Type":"application/json"})
            res.write(JSON.stringify({}))
            res.end()
        })
    })






	// 修改购物车
router.get('/wxapiChangeAllCart',function(req,res){
    let id = req.query.id;
    let params = req.query;  //

    console.log(params,1234);



//     console.log(checked,username)
//     //需要修改条件
        cartModel.update({_id:id},params,(e,r)=>{

            res.writeHead('200',{"Content-Type":"application/json"})
            res.write(JSON.stringify(r))
            res.end()
        })
    })


// //插入订单
router.get('/wxapiInsertOrder',function(req,res){
//         // console.log(req.query)
//     //获取所有参数
    let  params = req.query;
    params.status = 1; //添加订单状态

    orderModel.create({params},(e,r)=>{
//         db.collection('order').insertOne(params,function (e,r) {
//                 // r  就是插入的返回的结果
//                 // console.log(r)
//                 //获取订单id，在获取当前订单下的所有的商品信息，一次的加入的订单详情里面

//                 //1. 插入订单详情（忽略）

//                // 2.修改购买商品的库存
//                   //获取要修改的商品信息（商品id， 当前商品购买的数量，原来的数量）
                        cartModel.find({username:params.username,checked:"1"},{},{},()=>{
//                     db.collection('cart').find({username:params.username,checked:"1"}).toArray(function(es,rs){
//                             console.log(rs) //  goodsid  num
//                         // console.log(123)
                            rs.forEach((item,index)=>{
                                    let  goodsid = item.goodsid;
//                                 console.log(456)
                                    productModel.findById({goodsid},(err,res)=>{
//                                     db.collection('product').findOne({_id:goodsid},function (ess,rss) {
//                                             // console.log(rss.num,rs.num) // 商品信息（包含了原来的库存）
                                                productModel.update({goodsid},{num:parseFloat(rss.num) -parseFloat(rs[index].num)},()=>{
                                                    cartModel.deleteMany({username:params.username,checked:"1"},(errss,ress)=>{
//                                                 db.collection('cart').removeMany({username:params.username,checked:"1"},function(errss,ress){
                                                    res.writeHead('200',{"Content-Type":"application/json"})
                                                    res.write(JSON.stringify(ress))
                                                    res.end()
                                                })


                                            })
                                    })
                            })

                    })

//                 //3.删除购物车内的信息




        })
    })



// //查询订单的方法
router.get('/wxapiGetOrders',function(req,res){

//         console.log(req.query)
    let  username = req.query.username;


    orderModel.find({username},{},{},(errs,ress)=>{

//         db.collection('order').find({username}).toArray(function(errs,ress){
//             // console.log(ress)
//             // res.send(ress)
            res.writeHead('200',{"Content-Type":"application/json"})
            res.write(JSON.stringify(ress))
            res.end()
        })
        // db.close();
    });




router.get('/wxapiChangeOrderStatus',function(req,res){
        // let status = req.query.status;
        let  _id = req.query.id

            //先去修改
            orderModel.update(_id,{status:3},(errs,ress)=>{
            // db.collection('order').updateOne({_id},{$set:{status:3}},function(errs,ress){
                //获取数据
                res.writeHead('200',{"Content-Type":"application/json"})
                res.write(JSON.stringify(ress))
                res.end()

            })

        });



//将二级路还有暴露出去
module.exports = router