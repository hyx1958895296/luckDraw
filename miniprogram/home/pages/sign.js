// home/pages/sign.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      avatarUrl: "../../images/icon-defaultavatar.png",
      score:20
    },
  },

  //日历逻辑
    // 切换月 设置已签到的日期
  handleChangeMonth(event) {
  	// 传过来的日期格式为 2022/6
    let yearMonth = event.detail.date
    let list = []

    this.setData({
      signedList: list
    })
  },
  //签到的方法
    signIn(){
      this.data.formatSignedList.push(this.data.today);
      this.data.formatSignedList = [...new Set(this.data.formatSignedList)];
      this.setData({
        formatSignedList:this.data.formatSignedList
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