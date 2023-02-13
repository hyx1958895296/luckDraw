// createRaffle/pages/createRaffleType/createRaffleType.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [{ 
      url:'https://776c-wllyun-dev-3gxie2dud70a3acf-1316269736.tcb.qcloud.la/c486e9a4e70284630d4d54f5978f845.png?sign=7630e397aaf28a7abd85fd636de5d85b&t=1675391270',
      title:'普通抽奖',
      jumpUrl:'/createRaffle/pages/createRaffle/createRaffle'
    },
      {
        url:'https://776c-wllyun-dev-3gxie2dud70a3acf-1316269736.tcb.qcloud.la/c486e9a4e70284630d4d54f5978f845.png?sign=7630e397aaf28a7abd85fd636de5d85b&t=1675391270',
        title:'循环抽奖',
        jumpUrl:'/createRaffle/pages/createLoopRaffle/createLoopRaffle'
      },
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 2000,
    duration: 500,                                                                                                                                                                   
    active:0
  },

  // swiper 滑动事件
  eventhandle(e){
    this.setData({
      active:e.detail.current
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  // 跳转
  navigateto(e) {
    console.log(e)
    wx.navigateTo({
      url: e.currentTarget.dataset.to,
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