<template>
  <view>
	<view>
		<view class="imgBox">
			<image mode="widthFix" :src="goodsDetail.picname"></image>
		</view>
		<view class="goods_detail_box">
			<view class="goods_stock">{{goodsDetail.num}}个</view>
			<view class="goods_name">
				{{goodsDetail.desc}}
			</view>
			<view class="goods_price">
				￥{{goodsDetail.price}}
			</view>
		</view>
	</view>
	<view class="bottom_Bar">
		<view class="navItemBox">
			<image class="navImg" mode="widthFix" src="/static/images/img/my.png"></image>
			<view>客服</view>
		</view>
		<view class="navItemBox">
			<image class="navImg" mode="widthFix" src="/static/images/img/ico10.png"></image>
			<view>店铺</view>
		</view>
		<view class="navItemBox ">
			<view class="navCart">
				<image class="navImg" mode="widthFix" src="/static/images/img/cart.png"></image>
				<view class="cartTag" v-if="cartNumTag">{{cartNumTag}}</view>
			</view>
			<view>购物车</view>
		</view>
		<view class="addCart">
			<button class="navBtn" @click="addCart(goodsDetail._id)">加入购物车</button>
		</view>
		<view>
			<button class="navBtn goBuy">立即购买</button>
		</view>
	</view>
</view>
</template>
<script>
export default {
  data() {
    return {
      goodsDetail:{},
      cartNumTag:""//购物车总数
    }
  },
  methods: {
    //加入购物车事件
    addCart(id){
      console.log(id,"商品IDD，加入购物车被点击了")
      //判断是否登录
      let openid = wx.getStorageSync('userInfo').openid;
      let username = wx.getStorageSync('userInfo').nickName;
      if(openid){
        //已经登录状态 则加入购物车
        console.log("已经登录了，可以直接加入购物车")
        wx.request({
          url: 'http://127.0.0.1:3000/wxapiAddCart', //开发者服务器接口地址",
          data: {
            id,
            username,
            openid
          }, 
          method: 'GET',
          success: res => {
            // console.log(res,"加入购物车成功的res")
            wx.showToast({
              title: '成功加入购物车哦~', //提示的内容,
              icon: 'success', //图标,
              duration: 2000, //延迟时间,
              mask: true, //显示透明蒙层，防止触摸穿透,
              success: res => {
                wx.switchTab({ url: '/pages/cart/main' });
              }
            });
          },
          fail: err => {
            console.log(err,"加入购物车失败的信息")
          }
        });
      }else{
        //没有登录 跳转到登录页面,进行登录
        wx.switchTab({ url: '/pages/mine/main' });
      }
    },
    //获取购物车商品的数量
    getCartNum(){
      let openid = wx.getStorageSync('userInfo').openid;
      if(openid){
        //成功登录状态
        wx.request({
          url: 'http://127.0.0.1:3000/wxapiGetCarts', //开发者服务器接口地址",
          data: {
            openid
          }, 
          method: 'GET',
          success: res => {
            if(res.statusCode==200){
              let num = res.data.length
              if(num>99){
                num = "99+"
              }
              this.cartNumTag= num
            }
          }
          
        });
      }
    }
  },
  mounted() {
    
  },
  onLoad(options){
    let id = options.id ||"5ea555ee3e07a636b8203694"
    //获取商品的详情
    wx.request({
      url: 'http://127.0.0.1:3000/wxapiGetProductDetail', //开发者服务器接口地址",
      data: {id}, //请求的参数",
      method: 'GET',
      success: res => {
        res.data.picname="http://127.0.0.1:3000/"+res.data.picname.replace("\\","/")
        this.goodsDetail = res.data
      },
      fail: (err) => {
        console.log(err,"请求商品详情失败")
      },
      complete: () => {}
    });
    this.getCartNum();
  }
 
}
</script>
<style scoped>
  /* pages/detail/detail.wxss */
.imgBox {
  width: 750rpx;
}

.imgBox image {
  width: 100%;
}

.goods_detail_box {
  margin: 10px;
}

.goods_stock {
  margin-bottom: 10px;
  color: #ff0000;
}

.goods_name {
  font-size: 15px;
  /* 显示两行文本，超出显示省略号 */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.goods_price {
  height: 30px;
  color: #ff0000;
  font-size: 18px;
  line-height: 30px;
}

.bottom_Bar {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 750rpx;
  height: 60px;
  border-top: 1px solid #ccc;
  z-index: 9999;
  /* padding-top: 5px; */
  display: flex;
  align-items: center;
}
.navCart{
  position: relative;
  width: 25px;
  left: 12px;
}
.navCart .cartTag{
  position: absolute;
  top: 0;
  left: 100%;
  display: inline-block;
  background: #fff;
  color: #e4393c;
  font-size: 7px;
  margin-left: -10px;
  line-height: 9px;
  border: 1px solid #e4393c;
  border-radius: 10px;
  padding: 1px 3px;
  font-weight: 700;
  z-index: 99999;
}

.navItemBox {
  width: 52px;
  text-align: center;
  font-size: 14px;
}

.bottom_Bar .navImg {
  width: 25px;
  height: 25px;
}

.addCart {
  margin-right: 5px;
}

.navBtn {
  width: 103px !important;
  height: 38px;
  line-height: 38px;
  background-color: #ff0000;
  color: #fff;
  font-size: 14px;
  padding:0 10px;
  border-radius: 10px !important;
}

.goBuy {
  background-color: #ffba0d;
}
</style>