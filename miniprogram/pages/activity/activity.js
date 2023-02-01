// pages/activity/activity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityList: [{
      commodityImgPath: '../../images/test-activity.png',
      details: '参与抽奖就有机会获得iPhone14一台',
      business: '小鹿韩餐',
      startTime: '2024/2/3/22:00',
      endTime: '2024/2/5/22:00',
      avatorPath: '../../images/avator.png',
      activityType: '助力',
      joinType:'0'
      
    },
    {
      commodityImgPath: '../../images/test-activity.png',
      details: '参与抽奖就有机会获得iPhone14一台',
      business: '小鹿韩餐',
      startTime: '2023/1/31/22:00',
      endTime: '2023/2/1/22:00',
      avatorPath: '../../images/avator.png',
      activityType: '助力',
      joinType:'1'
      
    },
      {
      commodityImgPath: '../../images/test-activity.png',
      details: '参与抽奖就有机会获得iPhone14一台',
      business: '小鹿韩餐',
      startTime: '2023/1/31/10:00',
      endTime: '2024/2/5/22:00',
      avatorPath: '../../images/avator.png',
      activityType: '助力',
      joinType:'0'
      
    },
    ],
    activityFrist: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getFristActivity(this.data.activityList)
  },

  // 获取即将开始的活动
  getFristActivity: function (params) {
    params = params.sort((a,b)=>Number(a.startTime.split('/')[0]) - Number(b.startTime.split('/')[0]))
    .sort((a,b)=>Number(a.startTime.split('/')[1]) - Number(b.startTime.split('/')[1]))
    // .sort((a,b)=>Number(a.startTime.split('/')[2]) - Number(b.startTime.split('/')[2]))
    console.log(params[0].startTime.split('/'));
    console.log(params)
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