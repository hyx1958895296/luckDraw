// pages/participateInTheLottery/participateInTheLottery.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     showId:1,
     tabList:[{
       id:1,
       title:"普通抽奖",
     },{
       id:2,
       title:"其他抽奖",
     }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  tabFn(e){
    this.setData({
      showId:e.target.dataset.item.id,
    })
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