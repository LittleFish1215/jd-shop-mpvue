//实现index模块的所有路由二级

var express = require("express")


var fs = require("fs");
//5.引入图片处理模块

var multiparty = require('multiparty');


let router = express.Router()



var typeModel = require("../model/typeModel")
var productModel = require("../model/productModel")

// //==============================================================
// //=========================商品管理模块=========================
router.get('/index',function(req,res){
//     //链接数据库，获取商品信息
    productModel.find({},{},{},(err,result)=>{

//             //保留处理类别名称的问题

            // res.send(_id)
            result.forEach((item,index)=>{
                let  _id = result[index].typeid;
                typeModel.findById({_id},function(err,res){
                    console.log(res);
                    console.log(res.typename)
                    result[index].typename = res.typename
                })

            })

            setTimeout(()=>{
                res.render("product/index",{products:result})
            },10)

        })

    });



router.get('/add',function(req,res){
    //加载添加商品页面之前，需要获取所有的商品类别

        typeModel.find({},{},{},function(err,ress){

            // console.log(ress)
            //加载添加页面
            res.render("product/add",{types:ress})
      
    });
});



router.post('/doAdd',function(req,res){
//     //执行商品添加操作
    var form = new multiparty.Form();
    form.uploadDir = "upload"
    form.parse(req, function(err, fields, files) {
//         //获取相应的数据
        fields.goodsname =  fields.goodsname[0]
        fields.typeid =  fields.typeid[0]
        fields.num =  fields.num[0]
        fields.price =  fields.price[0]
        fields.desc =  fields.desc[0]
        fields.status =  fields.status[0]

        fields.picname = files.picname[0].path;



        console.log(fields);

//             db.collection('product').insertOne({
        productModel.create(fields,(errs,ress)=>{
//            

                if(ress){
                    //添加成功
                    //是否有上传文件
                    if(files.picname[0].size == 0){
                        //证明没有图片
                        fs.unlink(picname,function(){})
                    }

                    res.render("wait", {
                        wait: 3,
                        content: "添加成功",
                        href: "/product/index"
                    })

                }else{
                    //添加失败
                    // 数据库添加失败时，需要删除上传的图片
                    if(picname)fs.unlink(picname,function(){});

                    res.render("wait", {
                        wait: 3,
                        content: "添加失败",
                        href: "/product/index"
                    })
                }
              
            })
        })
    })
       




router.get('/edit',function(req,res){
//         //加载修改页面
//         //1.获取参数
            let  _id = req.query.id;
//         //2.根据参数，获取对应的商品信息
//            
//                 //  获取商品信息

            productModel.findById({_id},(errs,ress)=>{
//                     //获取所有的类别
                typeModel.find({},{},{},(errss,resss)=>{

                res.render('product/edit',{product:ress,types:resss})
            })



                })

            });





router.post('/doEdit',function(req,res){
//         // 执行修改
//     //1.获取参数
    var form = new multiparty.Form();
    form.uploadDir = "upload"
//     // res.send('执行修改')
    form.parse(req, function(err, fields, files) {
//         // fields   正常的post请求数据

//         // files     图片信息
        console.log(fields,333)
        console.log(files,444)

//         // 获取对应的信息  == 其他的正常的数据
        fields.goodsname =  fields.goodsname[0]
        fields.typeid =  fields.typeid[0]
        fields.num =  fields.num[0]
        fields.price =  fields.price[0]
        fields.desc =  fields.desc[0]
        fields.status =  fields.status[0]

//         //隐藏域的
        let  oldPic = fields.oldPic[0]      // 原来的图片
        let  _id = fields.id[0]   //条件id


//         //进行修改

//             //没有新的上传图片的情况
            // console.log(files.picname[0].size,22222222222222222222);
            // console.log(typeof files.picname[0].size,222222222222222);
            if(files.picname[0].size == 0){
                
                // console.log(fields,1111111111111111);
                productModel.update({_id},fields,(errs,ress)=>{

                    if(ress){
                        //修改成功
                        res.render("wait", {
                            wait: 3,
                            content: "修改成功",
                            href: "/product/index"
                        })
                    }else{
                        //修改失败
                        res.render("wait", {
                            wait: 3,
                            content: "修改失败",
                            href: "/product/index"
                        })
                    }
//              
                })
            }else{
//                 //有新的上传图片
        //         //新的图片信息
       fields.picname = files.picname[0].path;  //新的图片
            productModel.update({_id},fields,(errs,ress)=>{

                if(ress){
                    //修改成功
                    fs.unlink(oldPic,function(){})

                    res.render("wait", {
                        wait: 3,
                        content: "修改成功",
                        href: "/product/index"
                    })
                }else{
                    //修改失败
                    fs.unlink(picname,function(){})

                    res.render("wait", {
                        wait: 3,
                        content: "修改失败",
                        href: "/product/index"
                    })
                }                
                })

            }


        });

    });



router.get('/doDel',function(req,res){
//         //1.获取参数
//         //2.执行删除
//         // res.send('执行删除');
//     //1.获取参数
    let  _id = req.query.id;
    let picname = req.query.picname;

    productModel.deleteOne({_id},(errs,ress)=>{
            if(errs) throw  errs;

            if(ress){

                       //        删除失败
                       res.render("wait", {
                        wait: 3,
                        content: "删除失败",
                        href: "/product/index"
                    })
               
            }else{

                 //删除成功
                 if(picname){
                    //证明没有图片
                    fs.unlink(picname,function(){})
                }

                res.render("wait", {
                    wait: 3,
                    content: "删除成功",
                    href: "/product/index"
                })
         
            }


        })
    })




//将二级路还有暴露出去
module.exports = router