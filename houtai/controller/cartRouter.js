
//实现index模块的所有路由二级

var express = require("express")


var fs = require("fs");
//5.引入图片处理模块

var multiparty = require('multiparty');


let router = express.Router()



var cartModel = require("../model/cartModel")
var productModel = require("../model/productModel")


// //==============================购物车管理模块===================================
router.get('/index',function(req,res){

//     //链接数据库
            cartModel.find({},{},{},(errs,result)=>{
//                 // res.send(result)
            result.forEach((item,index)=>{
//                     //item.goodsid
                    productModel.findById(item.goodsid,(e,r)=>{
//                             // console.log(r,"123")
                            result[index].goodsname = r.goodsname;
                            result[index].picname = r.picname;
                    })
            })
            setTimeout(()=>{
                res.render("cart/index",{carts:result})
            },20)

        })
    })







//将二级路还有暴露出去
module.exports = router