// pages/activity/activity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabsList: [{
      id: 0,
      value: "未开始",
    }, {
      id: 1,
      value: "已开始",
    }, {
      id: 2,
      value: "已结束",
    }],
    showId: 1,
    activityList: [],
    // 优化首次进入时页面闪烁
    isLoaded: false,
    // 定时器
    timer: null,
    // loding
    isLoding:true,
    // 是否有数据
    isShow:true,
    // 获取活动列表的status
    status:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
   onLoad(options) {
     this.getActivityList();
     
  },

  tabFn(e) {
    this.setData({
      showId: e.target.dataset.item.id,
    })
  },

  // 跳转
  navigateto(e) {
    wx.navigateTo({
      url: `/pages/activitydetalis/activitydetalis?id=${e.currentTarget.dataset.to._id}`,
    })
  },

  // 子组件传的参 
  onMyEvent(options){
    this.setData({
      status:options.detail
    });
    this.getActivityList();
  },

  // get活动列表
  async getActivityList() {
    const res = await wx.cloud.callFunction({
      name: 'activity',
      data: {
        type: 'select',
        status:this.data.status
      },
    });
    this.setData({
      activityList: res.result.data,
      isLoaded: true
    })
                    
    let lodingTimer = setTimeout(()=>{
      this.setData({
        isLoding:false
      })      
      clearTimeout(lodingTimer)
    },1000)
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
     this.getActivityList();
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