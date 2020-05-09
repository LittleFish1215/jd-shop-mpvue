// userModel mongose

//Schema 模板
//model 模型
//instance示例
//查询 和创建

var mongoose =  require("mongoose")
//定义模板
var  schema = new mongoose.Schema({

    goodsid:{type:String},


    num:Number,  //购买数量
    price:Number,
    username:String,
    openid:String,//购买用户的唯一身份标识
    statue:String,
	checked:Boolean



})

//定义模型

var model = mongoose.model("cart",schema)


//查询数据  find(条件,字段，{})

function find(condition,fiels,options,callback){

    model.find(condition,fiels,options,(err,docs)=>{

        if(err){
            callback(err)
        }else{
            callback(null,docs)
        }

    })

}

//创建数据的方法


function  create(post,callback){

    model.create(post,function(err,docs){


        if(err){
            callback(err)
        }else{
            callback(null,docs)
        }
    })

}





//类型列表中 /list/:aa
//通过id进行查询  findById
function  findById(id,callback){

    model.findById(id,(err,docs)=>{


        if(err){
            callback(err)
        }else{
            callback(null,docs)
        }

    })



}


function  update(condition,update,options,callback){

    model.update(condition,update,options,(err,docs)=>{




        if(err){
            callback(err);
        }else{
            callback(null,)
        }


})



}



function  update(condition,update,options,callback){

    model.update(condition,update,options,(err,docs)=>{




        if(err){
            callback(err);
        }else{
            callback(null,)
        }


})



}





// myModel.remove(condition,(err)=>{


    function deleteOne(condition,callback){


        model.remove(condition,function(err){


            if(err){
                callback(err);
            }else{
                callback(null,)
            }


        })


    }

    function deleteMany(condition,callback){


        model.remove(condition,function(err){


            if(err){
                callback(err);
            }else{
                callback(null,)
            }


        })


    }


//暴露数据模型创建的find和create方法

module.exports = {

    find:find,
    create,
    findById,
    update,
    deleteOne,
    deleteMany
}


