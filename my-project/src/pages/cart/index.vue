<template>
  <view>
	<block v-if="cartList.length==0">
		<view class="cart_message" >{{hintInfo}}</view>
	</block>

	<view class="cart_container">
		<view class='cart_item' v-for="(item,index) in cartList" :key="index">
			<checkbox :checked="item.checked"  @click="selectOne(index)"></checkbox>
			<image :src='item.picname'></image>
			<view class='cart_info'>
				<view class='cart_info_hd'>
					<view class='cart_pro_name'>{{item.goodsname}}</view>
					<view class='cart_pro_price'>￥{{item.price}}</view>
				</view>
				<view class='cart_info_bd'>
					<text @click="reduceNum(index)">-</text>
					<text>{{item.num}}</text>
					<text @click="addNum(index)">+</text>
					<text @click="del(index)">X</text>
				</view>
			</view>
		</view>
	</view>

	<view class='cart_bottom'>
  <checkbox-group @click="allSelectChange">
		<label>
      <checkbox value="全选" :checked="allSelect"></checkbox>全选
		</label>
  </checkbox-group>
		<view>
			￥{{sumPrice}} 去付款
		</view>
	</view>

</view>
</template>
<script>
export default {
  data() {
    return {
      cartList:[],//购物车列表数据
      allSelect:true,//全选，默认选中
      hintInfo:"您还没登录呀，请前往个人中心登录~",
      sumPrice:"0"//总价
    }
  },
  methods: {
    //删除本条数据
    del(index){
      let cartList =this.cartList
      let id =  cartList[index]._id
      //删除展示的数据
      cartList.splice(index,1)
      if(cartList.length==0){
        this.allSelect=false
      }

      //更新数据库
      this.deleteById(id)
      //更新总价
      this.tatalPrice()
      //更新页面data中的cartList
      this.cartList=cartList
    },
     //定义删除数据库的操作
    deleteById(id){
        wx.request({
          
          url:"http://localhost:3000/wxapiDeleteCart",
          data:{
            id:id
          },
          success:()=>{
            wx.showToast({
              title:"删除成功"
            })
          } 
        })


      },
    //修改数据库
    updateDb(obj){
      wx.request({
        url:"http://localhost:3000/wxapiChangeCart" ,
        data:obj,//需要提交的参数
        
      })
    },
    //增加数量
    addNum(index){
      let cartList =this.cartList
      cartList[index].num ++
      if(cartList[index].num>cartList[index].goods_num){
        cartList[index].num=cartList[index].goods_num
         wx.showToast({
          title:"超出库存",
          icon:"none"
        })
      }
      // console.log(cartList,"------cartList")
      //修改数据库
      let obj ={
        cartid:cartList[index]._id,
        num:cartList[index].num
      }
      // console.log(obj,"-----obj")
      this.updateDb()

      //修改总价
      this.tatalPrice()
      this.cartList= cartList
    },
     //减少数量
    reduceNum(index){
      let cartList =this.cartList
      cartList[index].num --
      if(cartList[index].num<1){
        cartList[index].num=1
      }
      //修改数据库
      
      let obj ={
        cartid:cartList[index]._id,
        num:cartList[index].num
      }
      this.updateDb()
      //修改总价
      this.tatalPrice()
      this.cartList= cartList
    },
     //全选按钮事件
    allSelectChange(){
      //实现点击全选时，全部选中;取消全选时，则全部不选中
      this.allSelect=!this.allSelect;
      this.cartList = this.cartList.map(item =>{
        item.checked = this.allSelect
        return item
      })
      //计算总价
      this.tatalPrice()
      //更新数据库

    },
    //单选事件
    selectOne(index){
      //当前选中的单选框取反
      this.cartList[index].checked= !this.cartList[index].checked
      //处理全选事件
      let arr=this.cartList.map(val => val.checked)
      let flag = arr.some(val=>val==false)
      if(flag){
        //单选中至少有一个没有选中
        this.allSelect=false
      }else this.allSelect=true
      //计算总价
      this.tatalPrice()
      //更新数据库
    },
    //计算总价
    tatalPrice(){
      let cartList = this.cartList
      let price =0
      cartList.forEach(item =>{
        if(item.checked) {
          price += item.price*item.num
        }    
      })
      this.sumPrice=price
    }
  },
  onShow(){
    wx.showLoading({
      title: 'Loading...'      
    });
    //查询是否登录
    let openid = wx.getStorageSync('userInfo').openid;
    if(openid){
      //登录 查询购物车中的信息

      //修改购物车页面的提示信息 hintInfo
      this.hintInfo="您的购物车空空如也~"
      //查询用户的购物车信息
      wx.request({
        url: 'http://127.0.0.1:3000/wxapiGetCarts',
        data: {
          openid
        }, //请求的参数",
        method: 'GET',
        success: res => {
          wx.hideLoading();
          if(res.statusCode==200){
            let newArr = res.data.map(item=>{
              item.picname = "http://127.0.0.1:3000/"+item.picname.replace("\\","/")
              return item
            })
            this.cartList =newArr
            //计算总价
            this.tatalPrice()
          }
        },
        fail: err => {
          console.log(err,"购物车信息查询失败")
        },
      });
    }else{
      //未登录状态 跳转到个人中心页面
      wx.showModal({
        title: '您还未登录', //提示的标题,
        content: '您还没有登录哦，即将跳转到登录页', //提示的内容,
        showCancel: true, //是否显示取消按钮,
        cancelText: '取消', //取消按钮的文字，默认为取消，最多 4 个字符,
        cancelColor: '#000000', //取消按钮的文字颜色,
        confirmText: '确定', //确定按钮的文字，默认为取消，最多 4 个字符,
        confirmColor: '#3CC51F', //确定按钮的文字颜色,
        success: res => {
          if (res.confirm) {
            //跳转到登录页
          wx.switchTab({ url: '/pages/mine/main' });

          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      });

    }
  }
  

}
</script>
<style scoped>
  /* pages/cart/cart.wxss */
.cart_container{
  padding-bottom: 120rpx;
}
.cart_message{
   width:75%;
   height: 80rpx;
   line-height: 80rpx;
  text-align: center;
  background:#eee;
 
  margin:30px auto;
  border-radius: 40rpx;
}
.cart_item{
  display: flex;
  align-items: center;
  padding: 20rpx;
  border-bottom: 1rpx solid #eee;
}

.cart_item image{
  width: 150rpx;
  height: 150rpx;
  margin: 0 15rpx;
}

.cart_pro_name{
   overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;  /*多行*/
    -webkit-box-orient: vertical;
    word-break: break-word;
    font-size: 30rpx;
}

.cart_info{
  width:500rpx;
  height: 150rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.cart_info_hd,.cart_info_bd{
  display: flex;
  justify-content: space-between;
}

.cart_bottom{
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 90rpx;
  background: red;
  color: white;
}
.cart_bottom label{
  margin-left: 15rpx;
}
.cart_bottom view{
  margin-right: 15rpx;
}
.cart_pro_price{
  color: red;
}
</style>