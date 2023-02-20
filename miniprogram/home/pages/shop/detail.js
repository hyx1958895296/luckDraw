// home/pages/shop/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopDetail:{},
    Top:true
  },
  //回到顶部
  srollViewTop(e){
    if (e.detail.scrollTop > 300) {
      this.setData({
        Top:false
      })
    } else {
      this.setData({
        Top:true
      })
    }
  },
  backTop(){
    this.setData({
      top:true
    })
  },
  tels(){
    wx.makePhoneCall({
      phoneNumber: '18803899605',
    })
  },
  onAuthLocation(){
    wx.authorize({
      scope: 'scope.userLocation',
      success: (res) => {
          console.log('成功：' , res)
      },
      fail: (res) => {
          console.log('失败：', res)
      },
    })
    this.onGetLocation();
    if(!this.onGetLocation()){
      this.gotoSetting();
    }
  },

  //地图 ————获取经纬度方法
  onGetLocation(){
    wx.getLocation({
      success: (res) => {
          console.log('成功：', res)
      },
      fail: (res) => {
          console.log('失败：', res)
      }
    })
  },

  //拒绝后再次授权，打开授权面板
  gotoSetting() {
    wx.openSetting({
        success: (res) => {
        }
    })
  },

  callPhone(){
    wx.makePhoneCall({
      phoneNumber: this.data.shopDetail.phone,
      success: function () {
      },
      fail: function () {
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getShopDetail(options.id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
   //商品详情接口
   getShopDetail(detailId){
    wx.cloud.callFunction({
      name:"shop",
      data:{
        type:'details',
        shopId:detailId
      },success:res=>{
        this.setData({
          shopDetail:res.result.data
        })
      }
    })
  },

  //兑换商品接口 
  ImmediatelyExchange(){
    wx.cloud.callFunction({

    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})