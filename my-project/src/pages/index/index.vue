<template>
  <view>
	<!-- 打开APP -->
	<view class="openAppBox">
		<view class="openAppMark" >
			<view>
				<image class="close" src="/static/images/img/close.png"></image>
			</view>
			<view>
				<image src="/static/images/img/logo.png" class="logo"></image>
			</view>
			<view><text>打开京东App，购物更轻松</text></view>
		</view>
		<view class="openNow">
			立即打开
		</view>
	</view>

	<!-- banner图 -->
	<view class="swiper swiper1">
		<swiper indicator-dots='true' indicator-color='rgba(51, 51, 51, .6)' indicator-active-color='#fff' autoplay='true' circular='true'>
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image mode="widthFix" :src="item"></image>
			</swiper-item>
		</swiper>
	</view>

	<!-- 选项轮播 -->
	<view class="mallBox">
		<swiper indicator-dots='true' indicator-color='#b2b2b2' indicator-active-color='#000'>
			<swiper-item>
				<view class="tabItem">
					<view>
						<image src="/static/images/img/ico1.png"></image>
						<view>京东超市</view>
					</view>
					<view>
						<image src="/static/images/img/ico2.png"></image>
						<view>数码电器</view>
					</view>
					<view>
						<image src="/static/images/img/ico3.png"></image>
						<view>京东服饰</view>
					</view>
					<view>
						<image src="/static/images/img/ico4.png"></image>
						<view>京东生鲜</view>
					</view>
					<view>
						<image src="/static/images/img/ico5.png"></image>
						<view>京东到家</view>
					</view>
				</view>
				<view class="tabItem">
					<view>
						<image src="/static/images/img/ico6.png"></image>
						<view>京东超市</view>
					</view>
					<view>
						<image src="/static/images/img/ico1.png"></image>
						<view>充值缴费</view>
					</view>
					<view>
						<image src="/static/images/img/ico7.png"></image>
						<view>9.9元拼</view>
					</view>
					<view>
						<image src="/static/images/img/ico8.png"></image>
						<view>领券</view>
					</view>
					<view>
						<image src="/static/images/img/ico9.png"></image>
						<view>赚钱</view>
					</view>
				</view>
				<view></view>
			</swiper-item>
			<swiper-item>
				<view class="tabItem">
					<view>
						<image src="/static/images/img/ico1.png"></image>
						<view>京东超市</view>
					</view>
					<view>
						<image src="/static/images/img/ico2.png"></image>
						<view>数码电器</view>
					</view>
					<view>
						<image src="/static/images/img/ico3.png"></image>
						<view>京东服饰</view>
					</view>
					<view>
						<image src="/static/images/img/ico4.png"></image>
						<view>京东生鲜</view>
					</view>
					<view>
						<image src="/static/images/img/ico5.png"></image>
						<view>京东到家</view>
					</view>
				</view>
				<view class="tabItem">
					<view>
						<image src="/static/images/img/ico6.png"></image>
						<view>京东超市</view>
					</view>
					<view>
						<image src="/static/images/img/ico1.png"></image>
						<view>充值缴费</view>
					</view>
					<view>
						<image src="/static/images/img/ico7.png"></image>
						<view>9.9元拼</view>
					</view>
					<view>
						<image src="/static/images/img/ico8.png"></image>
						<view>领券</view>
					</view>
					<view>
						<image src="/static/images/img/ico10.png"></image>
						<view>PLUS会员</view>
					</view>
				</view>
				<view></view>
			</swiper-item>
		</swiper>
	</view>

	<!-- 为你推荐 -->
	<view class="mainBox">
		<view class="recommend">
			<image mode="widthFix" src="/static/images/img/index_wntj.png"></image>
			<view class="mallListBox">
				<view class="clearfix">
					<view class="mallItem" v-for="(item,i) in mallList" :key="i" @click="goDetail(item._id)">
						<view>
							<image
              mode="widthFix"
               :src="item.picname"></image>
						</view>
						<view class="goodDetailBox">
              <view class="goodTitle">
                {{item.goods_name}} {{item.desc}}
              </view>
              <view class="goodOtherInfo">
              <view>
                <text class="price">￥{{item.price}}</text>
                <text class="tag" v-for="(val,index) in goods_tags" :key="index">{{val}}</text>
              </view>
                <text class="similar">看相似</text>
              </view>
            </view>
					</view>
          
				</view>
			</view>
		</view>

	</view>
</view>
</template>
<script>
export default {
 
    data() {
      return {
        goods_tags:["满减","新品"],
        swiperList:["/static/images/slider/slider1.jpg","/static/images/slider/slider2.jpg","/static/images/slider/slider3.jpg"],
        mallList:[]
      }
    },
    methods: {
      //获取加载首页列表事件
      getMallList(){
		  wx.showLoading({
			title: 'Loading...', //提示的内容,
			mask: true, //显示透明蒙层，防止触摸穿透,
			success: res => {}
		  });
        wx.request({
          url: 'http://localhost:3000/wxapiGetProducts', //查询商品
          method: 'GET',
          success: res => {
			wx.hideLoading();
            let listData = res.data
            listData.map(val =>{
              let newpic= val.picname.replace('\\',"/");
              val.picname ="http://localhost:3000/"+newpic;
            })
            this.mallList = listData
            // console.log(listData,"成功请求的数据") 

          },
          fail: err => {
            console.log(err,"失败请求")
          },
          complete: () => {}
        });
	  },
	  //去详情页
	  goDetail(id){
		  wx.navigateTo({ 
			  url: `/pages/detail/main?id=${id}` ,
			  success:()=>{
				  wx.showToast({
					title: '即将跳转到详情页', //提示的内容,
					// icon: 'success', //图标,
					duration: 1000, //延迟时间,
					mask: true, //显示透明蒙层，防止触摸穿透,
					success: res => {}
				  });
			  }
		});
	  }
    },
    mounted() {
      this.getMallList()
    },
  
 
}
</script>
<style scoped>
  .clearfix:after{
  display: block;
  content: "";
  clear: both;
}
.openAppBox {
  display: flex;
  height: 40px;
  line-height: 40px;
  background-color: #ff0000;
  color: #fff;
}

.openAppMark {
  display: flex;
  justify-items: center;
  justify-content: space-around;
  width: 75%;
  height: 40px;
  background-color: rgba(51, 51, 51, .6);
  font-size: 14px;
}

.close {
  width: 18px;
  height: 18px;
}

.logo {
  width: 30px;
  height: 30px;
  margin-top: 5px;
}

.openNow {
  flex: 1;
  text-align: center;
  font-size: 16px;
}

.swiper,
swiper-item,
swiper {
  width: 100%;
}

.swiper1 swiper-item image {
  width: 100%;
  /* height: auto; */
}
.tabItem{
  display: flex;
  justify-content: space-around;
  text-align: center;
  font-size: 12px;
  margin-top: 20px;
}
.tabItem>view{
  min-width: 54px;
}
.tabItem image{
  width:70rpx;
  height: 70rpx;
}
.recommend image{
  width: 100%;
}
.mainBox{
  margin-top: 20px;
}
.mallListBox{
  padding-top: 10px;
  background-color: #f1f2f6;
}

.mallItem{
  float: left;
  margin: 10.5rpx;
  width: 352rpx;
  height: 255px;
  background-color: #fff;
}

.mallItem image{
  width: 100%;
}
.mallItem .goodTitle{
  width: 100%;
  margin: 5px;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.mallItem .goodOtherInfo{
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color:#ff0000;
  padding-bottom: 10px;
}

.mallItem .goodOtherInfo .tag{
  margin-left: 5px;
  padding: 3px;
  border: 1px solid #ff0000;
}
.mallItem .goodOtherInfo .similar{
  margin-right: 5px;
  padding: 3px;
  border: 1px solid #eee;
  color: #888;
}
</style>