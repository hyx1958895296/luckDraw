// createRaffle/pages/createRaffleType/createRaffleType.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [{ 
      url:'https://776c-wllyun-dev-3gxie2dud70a3acf-1316269736.tcb.qcloud.la/c486e9a4e70284630d4d54f5978f845.png?sign=7630e397aaf28a7abd85fd636de5d85b&t=1675391270',
      title:'普通活动',
      jumpUrl:'/createRaffle/pages/createRaffle/createRaffle',
      detail:'在指定时间内按照人数开奖，如果指定时间内未到达人数系统也会开奖，如果到达人数则立马开奖。'
    },
      {
        url:'https://776c-wllyun-dev-3gxie2dud70a3acf-1316269736.tcb.qcloud.la/c486e9a4e70284630d4d54f5978f845.png?sign=7630e397aaf28a7abd85fd636de5d85b&t=1675391270',
        title:'循环抽奖',
        jumpUrl:'/createRaffle/pages/createLoopRaffle/createLoopRaffle',
        detail:'循环开奖，是指发起人可以设置多次定期开奖，一个周期开一次奖。例如一个月4期抽奖，每周1开。'
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
    // 该页面禁止分享
    wx.hideShareMenu({
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  // 跳转
  navigateto() {
    wx.navigateTo({
      url: this.data.swiperList[this.data.active].jumpUrl
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