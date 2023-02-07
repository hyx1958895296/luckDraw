// createRaffle/pages/loopDraw/loopDraw.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiArray: [

    ],
    multiIndex: [0, 0],
    dateList:['每周一','每周二','每周三','每周四','每周五','每周六','每周日'],
  },

  // 弹窗
  showModal() {
    this.setData({
      show: true
    })
  },
  hideModal() {
    this.setData({
      show: false
    })
  },


  // picker选择器
  bindMultiPickerChange(e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },

  // 处理时间选择器的数据
  time() {
    let hours = [];
    for (let index = 0; index < 24; index++) {
      hours.push(index + '时')
    };
    let minutes = [];
    for (let index = 0; index < 60; index++) {
      minutes.push(index + '分')
    }
    this.setData({
      multiArray: [
        hours,
        minutes
      ]
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.time()
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