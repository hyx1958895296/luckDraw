// home/pages/redeemPrizes/redeemPrizes.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsName:'小熊玩偶',
    exchangeCode:'49995270120',
    receiveAddress:'上城区钱潮路369号智谷人才广场一楼大厅（含江干区）',
    exchangeDate:'2021.06.04 00:00至2021.07.04 00:00',
    phoneNumber:'15233633902'
  },
  callPhone(){
    wx.makePhoneCall({
      phoneNumber: this.data.phoneNumber
    });
    // wx.chooseContact();
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