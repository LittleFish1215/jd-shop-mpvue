//实现index模块的所有路由二级

var express = require("express")


var fs = require("fs");
//5.引入图片处理模块

var multiparty = require('multiparty');


let router = express.Router()



var typeModel = require("../model/typeModel")
var productModel = require("../model/productModel")

//1.类别显示页面路由
router.get('/index',function(req,res){
    //使用数据库获取当前的类别内容

    // typeModel.connect(DBurl, function(err, db) {

        typeModel.find({},{},{},(err,result)=>{
            
            if(err){

                res.render("wait",{href:"/",wait:3,content:"未知错误"})
            }else{
    
                res.render("type/index",{types:result}) 
            }
            
        })
     
    });



// })
// //2.类别添加页面路由
router.get('/add',function(req,res){

    res.render('type/add')
})


// //3.执行添加操作
// //html中涉及文件上传  method 方法  post
router.post('/doAdd',function(req,res){

//     // res.send('执行添加')
    var form = new multiparty.Form();

     //不允许跨设备rename
    form.uploadDir = "upload"


    form.parse(req, function(err, fields, files) {

        console.log(fields)
        console.log(files)

        // 获取对应的信息
        fields.typename =  fields.typename[0]
        fields.picname = files.picname[0].path;

        console.log(fields,222);

        typeModel.create(fields, (err, result) => {
           
        if(err){

            //添加失败
            // 数据库添加失败时，需要删除上传的图片
            if(picname)fs.unlink(picname,function(){});
    
                res.render("wait", {
                    wait: 3,
                    content: "商品类别添加失败！",
                    href: "/type/index"
                })

        }else{

            
                //添加成功
                //是否有上传文件
                if(files.picname[0].size == 0){
                    //证明没有图片
                    fs.unlink(picname,function(){})
                }


                res.render("wait", {
                    wait: 3,
                    content: "商品类别添加成功！",
                    href: "/type/index"
                })

        }
    }) 
    
    })

});



// //4.加载修改页面
router.get('/edit/:id',function(req,res){
    //1.获取参数
    let  id = req.params.id

    console.log(id,222);

    
    //2.根据参数 获取相应的信息
    typeModel.findById(id, function(err, db) {

    
            res.render('type/edit',{type:db})
           
        })

    });
  





// //5.执行修改操作
// //html中涉及文件上传  method 方法  post
router.post('/doEdit',function(req,res){
    //1.获取参数
    var form = new multiparty.Form();
    form.uploadDir = "upload"
    // res.send('执行修改')
    form.parse(req, function(err, fields, files) {
        // fields   正常的post请求数据

        // files     图片信息
        console.log(fields)
        console.log(files)

        // 获取对应的信息
        let typename =  fields.typename[0]
        let  oldPic = fields.oldPic[0]
        let  _id = fields.id[0]
        //新的图片信息
        let  picname = files.picname[0].path;

        //进行修改
       
            //没有新的上传图片的情况
            if(files.picname[0].size == 0){
                fs.unlink(picname,function(){})
               typeModel.update({_id},{typename},{},function(err,result){
                    if(err){
                        //修改失败

                        res.render("wait", {
                            wait: 3,
                            content: "商品类别修改失败！",
                            href: "/type/index"
                        })
                    }else{
                        //修改成功

                        res.render("wait", {
                            wait: 3,
                            content: "商品类别修改成功！",
                            href: "/type/index"
                        })
                        
                    }
                   
                })
            }else{
                //有新的上传图片
                // fs.unlink(picname,function(){})
                // res.send('有新的上传图片')
                typeModel.update({_id},{typename,picname},{},function(err,result){
                    if(err){
                        //修改成功

                                                //修改失败
                    fs.unlink(picname,function(){})

                    res.render("wait", {
                        wait: 3,
                        content: "商品类别修改失败！",
                        href: "/type/index"
                    })
                        
                    }else{

                        fs.unlink(oldPic,function(){})

                        res.render("wait", {
                            wait: 3,
                            content: "商品类别修改成功！",
                            href: "/type/index"
                        })

                    }
                
                })

            }


        });

    });

// //6.执行删除操作
router.get('/doDel',function(req,res){
//     //1.获取参数
    let  _id = req.query.id;

    
    let picname = req.query.picname;

    console.log(_id,picname,22);
//     // res.send(id)
//     // res.send('执行删除')
// 
//         //执行删除之前，判断一下当前类别下面是否有商品，如果有，提示不能删除，没有可以删除
        productModel.findById({typeid:_id}, function(err, db) {


            if(db){
//                 //当前类别下有商品，不能删除

                res.render("wait", {
                    wait: 3,
                    content: "当前分类下有商品",
                    href: "/type/index"
                })
                return;
            }else{
                typeModel.deleteOne({_id},function(err){


                    //null 没有错误
                    if(err){

                        res.render("wait", {
                            wait: 3,
                            content: "删除成功",
                            href: "/type/index"
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
                        href: "/type/index"
                    })

                     
                    
                    }




                })

            }
        })




    });





//将二级路还有暴露出去
module.exports = router

