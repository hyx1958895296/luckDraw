// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    optionList: [{
      id: 1,
      title: "商家入驻",
      icon: "../../images/icon-settlein.png"
    }, {
      id: 2,
      title: "审核商家",
      icon: "../../images/icon-examine.png"
    }, {
      id: 3,
      title: "商务合作",
      icon: "../../images/icon-cooperation.png"
    }, {
      id: 4,
      title: "常见问题",
      icon: "../../images/icon-problem.png"
    }, {
      id: 5,
      title: "意见反馈",
      icon: "../../images/icon-opinion.png"
    }],
    userInfo: {
      nickName: "未登录",
      avatarUrl: "../../images/icon-defaultavatar.png"
    },
    hasUserInfo: false,
  },

  getUserProfile() {
    let _this = this;
    if (this.data.hasUserInfo) return;
    wx.getSetting({
      success(res) {
        if (res.authSetting["scope.userInfo"]) {
          wx.getUserProfile({
            desc: '用户授权',
            success: (res) => {
              console.log(res);
              _this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
              })
            }
          })
        } else {
          wx.openSetting();
        }
      }
    })
  },

  getUserinfo(){
    wx.cloud.callFunction({
      name: 'activity',
      data: {
       type:"select"
      },
      success: res => {
        console.log(res.result);
      },
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
        this.getUserinfo();
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