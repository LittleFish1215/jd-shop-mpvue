
//实现index模块的所有路由二级

var express = require("express")


var fs = require("fs");
//5.引入图片处理模块

var multiparty = require('multiparty');


let router = express.Router()



var orderModel = require("../model/orderModel")
var productModel = require("../model/productModel")

// //==============================订单管理=========================================

router.get('/index',function(req,res){

//     //链接数据库
//     mongoClient.connect(DBurl, function(err, db) {
    orderModel.find({},{},{},(errs,result)=>{



            res.render('order/index',{orders:result})

        })

    });





router.get('/doEdit',function(req,res){
    let  _id =req.query.id
//     // console.log(_id)
//     //链接数据库
//     mongoClient.connect(DBurl, function(err, db) {
    let set = {
        status:2
    }
    orderModel.update({_id},set,(errs,ress)=>{
//         //先去修改
//                 //获取数据
                res.redirect('/order/index')

        })

    });



//将二级路还有暴露出去
module.exports = router

