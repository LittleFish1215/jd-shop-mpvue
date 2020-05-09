// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList:[
      {
        cart_pro_name:"男装衬衫",
        cart_pro_price:99.9,
        cart_pro_num:2,
        cart_pro_img:"/assets/images/img/mall1.jpg"
      },
      {
        cart_pro_name:"男装衬衫",
        cart_pro_price:699.9,
        cart_pro_num:3,
        cart_pro_img:"/assets/images/img/mall1.jpg"

      },
    ],
    allSelect:false,//全选，默认不选中
    selectOne:false
  },
  //全选按钮事件
  allSelectChange(){
    //实现点击全选时，全部选中;取消全选时，则全部不选中
    this.setData({
      allSelect:!this.data.allSelect,
      selectOne:!this.data.allSelect
    })
    
  },
  //单选事件
  selectOne(options){
    console.log("单选事件------",options)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})