// pages/activity/activity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: [{
      id: 1,
      title: "未开奖",
    }, {
      id: 2,
      title: "已开始",
    }],
    showId: 1,
    activityList: [],
    activityFrist: {
      commodityImgPath: '../../images/test-activity.png',
      details: '参与抽奖就有机会获得iPhone14一台',
      business: '小鹿韩餐',
      startTime: '2023/1/31/10:00',
      endTime: '2024/2/5/22:00',
      avatorPath: '../../images/avator.png',
      activityType: '助力',
      joinType: '0'
    },
    // 优化首次进入时页面闪烁
    isLoaded: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getActivityList();

    // this.getFristActivity(this.data.activityList)
  },

  tabFn(e) {
    this.setData({
      showId: e.target.dataset.item.id,
    })
  },

  // 跳转
  navigateto(e) {
    console.log(e);
    wx.navigateTo({
      url: `/pages/activitydetalis/activitydetalis?id=${e.currentTarget.dataset.to._id}`,
    })
  },

  // get活动列表
  getActivityList() {
    wx.cloud.callFunction({
      name: 'activity',
      data: {
        type: 'select'
      },
      success: res => {
        console.log('res', res);
        this.setData({
          activityList: res.result.data,
          isLoaded: true
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

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