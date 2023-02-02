// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList:[
      {
        id:1,
        shopItemImage:"../../images/shop1.png",
        shopItemTitle:"Nike耐克AJ1男女Air Jordan",
        shopItemPrice:"34",
        yuedui:200000
      },
      {
        id:2,
        shopItemImage:"../../images/shop1.png",
        shopItemTitle:"Nike耐克AJ1男女Air Jordan",
        shopItemPrice:"2400",
        yuedui:200
      },
      {
        id:3,
        shopItemImage:"../../images/shop1.png",
        shopItemTitle:"Nike耐克AJ1男女Air Jordan",
        shopItemPrice:"2500",
        yuedui:2000
      },
      {
        id:4,
        shopItemImage:"../../images/shop1.png",
        shopItemTitle:"Nike耐克AJ1男女Air Jordan",
        shopItemPrice:"25",
        yuedui:2400
      },
    ],
    isHr:0,
  },
  hr:function(es){
    this.setData({
      isHr:es,
    })
    // console.log(this.data.isHr.target.dataset.es);
  },
  //微信签到跳转
  signIn(){
  },
  //获取更多积分
  navagitorToActivity(e){
    wx.switchTab({
      url: '/pages/activity/activity',
    })
  },
  navToSign(e){
    wx.navigateTo({
      url: '/home/pages/sign',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

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