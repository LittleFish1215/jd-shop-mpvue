### 一、启动方式

进入houtai文件夹下，在命令行输入npm install，安装项目需要的依赖；同理进入my-project，在命令行输入npm install

后台启动：npm start （或者node app/node app.js）启动后浏览器输入http://127.0.0.1:3000/

前台启动：npm start

数据库连接：mongo db--path xxx 或者studio-3T连接



文件介绍：
demo_static:小程序静态页
houtai:node搭建的后台
my-project:mpvue框架搭建的jd页面

img：各页面的效果图

​	--pages:前端页面的效果图

​	--back:后台管理系统的页面

### 二、接口介绍

#### 2.1 查询所有商品类别

地址：http://127.0.0.1:3000/wxapiGetTypes
请求方式：get
参数：无

#### 2.2 查询指定条件的商品

地址：http://127.0.0.1:3000/wxapiGetProducts
请求方式：get
参数：可无

#### 2.3 查询指定条件的商品详情

地址：http://127.0.0.1:3000/wxapiGetProductDetail
请求方式：get
参数：
    id 类型：string 必填

#### 2.4 添加购物车接口

地址：http://127.0.0.1:3000/wxapiAddCart
请求方式：get
参数：
    id 类型：string 必填
    username 类型：string 必填
    openid 类型：string 必填

#### 2.5 查询指定条件的商品详情

地址：http://127.0.0.1:3000/wxapiGetProductDetail
请求方式：get
参数：
    id 类型：string 必填

#### 2.6 获取购物车信息  

地址：http://127.0.0.1:3000/wxapiGetCarts
请求方式：get
参数：
    openid 类型：string  用户唯一的身份 必填


#### 2.7 处理购物车信息内容   改变状态（checked）  改变 数量

地址：http://127.0.0.1:3000/wxapiChangeCart
请求方式：get
参数：
    cartid 类型：string  购物车信息的id 必填
    query 类型：string  购物车信息的所有的参数 必填

#### 2.8 清空理购物车信息内容  

地址：http://127.0.0.1:3000/wxapiDeleteCart
请求方式：get
参数：
    id 类型：string  购物车的id 必填

#### 2.9 处理购物车信息内容   改变状态（checked）  改变 数量

地址：http://127.0.0.1:3000/wxapiChangeCart
请求方式：get
参数：
    cartid 类型：string  购物车信息的id 必填
    query 类型：string  购物车信息的所有的参数 必填



