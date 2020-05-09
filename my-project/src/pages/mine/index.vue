<template>
  <div class="mineBox">
    <!-- 顶部 -->
    <div class="top">
      <div class="tit">
        <div class="title">
          <van-icon name="setting-o" />
          <span>个人中心</span>
          <van-icon name="chat-o" />
        </div>
       
        <div class="imageBox">
          <div class="userImgBox">
            <div class="userImg" >
              <img :src="userInfo.avatarUrl" alt />
            </div>
          </div>
        </div>
        <p class="userName">{{userInfo.nickName}}</p>
         <div v-if="!userInfo">
          <button open-type="getUserInfo" @getuserinfo="getUserInfo" lang="zh_CN" id="loginBtn">点击登录</button>
        </div>
      </div>
    </div>
    <!-- 收藏 -->
    <div class="collectBox">
      <div class="collect">
        <van-icon name="like-o" />
        <span class="mycoll">我的收藏（5）</span>
      </div>
    </div>
    <!-- 订单 -->
    <div class="orderBox">
      <div class="orderTit clearfix">
        <div class="left">我的订单</div>
        <div class="right">查看全部订单</div>
      </div>
      <div class="orderCont">
        <li>
          <!-- <van-icon name="pending-payment" badge="5" /> -->
          <icon type="waiting" color="#ccc"></icon>
          <p>待付款</p>
        </li>
        <li>
          <icon type="waiting" color="#ccc"></icon>

          <p>待发货</p>
        </li>
        <li>
          <icon type="waiting" color="#ccc"></icon>

          <p>待收货</p>
        </li>
        <li>
          <icon type="waiting" color="#ccc"></icon>
          <p>待评价</p>
        </li>
        <li>
          <icon type="info" color="#ccc"></icon>
          <p>退货/售后</p>
        </li>
      </div>
    </div>
    <!-- 收货地址 -->
    <div class="addressBox">
      <p @click="addressEdit">收货地址管理</p>
    </div>
  </div>
</template>
<script>
// import api from '../../util/axios'
export default {
  data() {
    return {
      userInfo: {
        // img: '',
        // userName: ''
      }
    }
  },
  methods: {
    addressEdit() {},
    getUserInfo(e) {
      //获取的用户信息 仅限于昵称 城市 头像 性别等
      let userLoginInfo = e.mp.detail
      if(userLoginInfo.errMsg=="getUserInfo:ok"){
        //如果授权成功
        //获取用户唯一信息 openID
        //将用户完整的信息（包括openid）赋值给data中的userInfo
        let userInfo ={}
        wx.login({
          success: res => {
            if(res.errMsg =="login:ok"){

              //小程序的appid
              let appid = "wx9ee391a46b66bfc4"
              //小程序的秘钥
              let secret="e05fd040f00200d4584c35115df2dc7b"
              //用户的凭证   作为获取唯一openid的必须条件
              let js_code = res.code
              //授权码
              let grant_type = "authorization_code"

              wx.request({
                url: 'https://api.weixin.qq.com/sns/jscode2session', //开发者服务器接口地址",
                data: {
                  //请求的参数"
                  appid,
                  secret,
                  js_code,
                  grant_type
                }, 
                method: 'GET',
                success: res => {
                  userInfo =userLoginInfo.userInfo
                  userInfo.openid = res.data.openid
                  userInfo.session_key = res.data.session_key
                  //赋值给data中的userInfo
                  this.userInfo=userInfo
                  //将用户信息存储到本地存储中
                  wx.setStorageSync('userInfo',userInfo)
                },
                fail: err => {
                  console.log(err,"请求openid有误")
                },
                complete: () => {}
              });
            }
          },
          fail: (err) => {
            console.log(err)
          },
          complete: () => {}
        });
       
      }else{
        //拒绝授权
        wx.showToast({
          title: '你未成功授权', //提示的内容,
          icon: 'none', //图标,
          duration: 1000, //延迟时间,
          mask: true, //显示透明蒙层，防止触摸穿透,
          success: res => {}
        });
      }
    },
   
  },
  mounted() {
    //获取本地存储中用户信息
    this.userInfo=wx.getStorageSync('userInfo');
  },
  onshow(){
    
  }
}
</script>
<style lang="" scoped>
/* 顶部 */
.mineBox {
  height: 100%;
  background-color: #efeeee;
}
.top {
  position: relative;
  height:150px /* 300/75 */;
  background-color: #ff0000;
  color: #fff;
}
.tit {
  padding-top: 0.4rem /* 30/75 */;
}
.title {
  display: flex;
  justify-content: space-between;
  margin: 0 0.4rem /* 30/75 */;
  font-size: 22px;
}
/* 用户图片 */
.imageBox {
  position: absolute;
  bottom: -52px /* 110/75 */;
  left: 50%;
  transform: translate(-50%, 0);
}
.userImgBox {
  position: relative;
  width: 105px /* 210/75 */;
  height: 105px /* 182/75 */;
  border-radius: 50%;
  background-color: #fff;
}
.userImg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.userImg,
.userImg img {
  width: 2.43rem /* 182/75 */;
  height: 2.43rem /* 182/75 */;
  border-radius: 50%;
}
.userName {
  position: absolute;
  bottom: -100px;
  left: 50%;
  transform: translate(-50%, 0);
  font-size: 16px;
  color: #000;
  font-size: 18px;
}
/* 收藏 */
.collectBox {
  height: 3.49rem /* 262/75 */;
  background-color: #fafafa;
}
.collect {
  padding-top: 2.4rem /* 180/75 */;
  font-size: 0.4rem /* 30/75 */;
}
.collect .van-icon-like-o {
  margin: 0 0.27rem /* 20/75 */ 0 0.47rem /* 35/75 */;
  font-size: 0.48rem /* 36/75 */;
  color: #ec5b57;
}
/* 订单 */
.orderBox {
  margin: 0.21rem 0 0.21rem /* 16/75 */;
  background-color: #fafafa;
  font-size: 14px;
}
.orderTit {
  height: 1.63rem /* 122/75 */;
  line-height: 1.63rem /* 122/75 */;
  font-size: 16px;
  border-bottom: 1px solid #b3b3b3;
}
.orderTit .left {
  margin-left: 0.61rem /* 46/75 */;
  float: left;
}
.orderTit .right {
  margin-right: 5px;
  color: #999;
  float: right;
}
.orderCont {
  display: flex;
  height: 2.53rem /* 190/75 */;
  justify-content: space-around;
  align-items: center;
  text-align: center;
}
.orderCont li {
  list-style: none;
}
.orderCont li .van-icon {
  font-size: 0.64rem /* 48/75 */;
  color: #aaaaaa;
}
.orderCont li p {
  color: #666;
  font-size: 14px;
}
/* 收货地址 */
.addressBox {
  height: 1.73rem /* 130/75 */;
  line-height: 1.73rem;
  background-color: #fafafa;
  color: #999;
  border-bottom: 1px solid #eee;
  font-size: 16px;
}
.addressBox p {
  margin-left: 0.59rem /* 44/75 */;
}
/* 登录按钮 */
#loginBtn{
  position: relative;
  top: 150px;
  width: 80%;
}
</style>
