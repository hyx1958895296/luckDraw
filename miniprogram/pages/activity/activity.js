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
    isShow:true
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

  // get活动列表
  async getActivityList() {
    const res = await wx.cloud.callFunction({
      name: 'activity',
      data: {
        type: 'select',
        status:1
      },
    })
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

  //时间戳转化日期
  // formatDate(str) {
  //   //Date.now()        //时间戳
  //   let date = new Date(str); //获取系统时间
  //   let year = date.getFullYear();
  //   let month = date.getMonth() + 1;
  //   month = month < 10 ? ('0' + month) : month;
  //   let day = date.getDate();
  //   day = day < 10 ? ('0' + day) : day;
  //   let h = date.getHours();
  //   h = h < 10 ? ('0' + h) : h;
  //   let m = date.getMinutes();
  //   m = m < 10 ? ('0' + m) : m;
  //   let s = date.getSeconds();
  //   s = s < 10 ? ('0' + s) : s;

  //   return year + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s;

  // },

  // tow(n) {
  //   return n >= 0 && n < 10 ? '0' + n : '' + n;
  // },
  // // 倒计时
  // countDown(endTime) {
  //   // 活动时间的秒数
  //   let second = Math.floor((endTime - new Date().getTime()) / 1000);
  //   // console.log('second', second);
  //   // 一天的秒数是86400 活动时间的秒数 / 86400 = 活动时间的天数
  //   let day = Math.floor(second / 86400);
  //   //余数代表剩下的秒数；
  //   second = second % 86400;
  //   //整数部分代表小时；
  //   let hour = Math.floor(second / 3600);
  //   //余数代表 剩下的秒数；
  //   second %= 3600;
  //   var minute = Math.floor(second / 60);
  //   second %= 60;
  //   let str = this.tow(day) + '天' +
  //     this.tow(hour) + '小时' +
  //     this.tow(minute) + '分钟' +
  //     this.tow(second) + '秒';
  //   console.log(str)
  // 获取即将开始的活动
  // getFristActivity () {
  //   params = params.sort((a,b)=>Number(a.startTime.split('/')[0]) - Number(b.startTime.split('/')[0]))
  //   .sort((a,b)=>Number(a.startTime.split('/')[1]) - Number(b.startTime.split('/')[1]))
  //   // .sort((a,b)=>Number(a.startTime.split('/')[2]) - Number(b.startTime.split('/')[2]))
  //   console.log(params[0].startTime.split('/'));
  //   console.log(params)
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
     this.getActivityList();
    // let _this = this;
    // _this.data.timer = setInterval(() => {
    //   _this.countDown(_this.data.activityList[50].endTimeStamp)
    // }, 1000)

    // _this.setData({
    //   timer: _this.data.timer
    // })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    // clearInterval(this.data.timer);
    // this.setData({
    //   timer: null
    // });
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