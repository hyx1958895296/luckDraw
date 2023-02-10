// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    optionList: [{
      id: 1,
      title: "商家入驻",
      icon: "../../images/icon-settlein.png",
      to: "/pages/merchantAccess/merchantAccess",
      isShow: true
    }, {
      id: 2,
      title: "审核商家",
      icon: "../../images/icon-examine.png",
      to: "",
      isShow: false
    }, {
      id: 3,
      title: "发起抽奖",
      icon: "../../images/icon-examine.png",
      to: "/createRaffle/pages/createRaffleType/createRaffleType",
      isShow: false
    }, {
      id: 4,
      title: "商务合作",
      icon: "../../images/icon-cooperation.png",
      to: "",
      isShow: true
    }, {
      id: 5,
      title: "意见反馈",
      icon: "../../images/icon-opinion.png",
      to: "/pages/commonTopics/commonTopics",
      isShow: true
    }],
    userInfo: {
      nickName: "未登录",
      avatarUrl: "../../images/icon-defaultavatar.png",
      goldCoin:0
    },
    hasUserInfo: false,
    examineStatus: ""
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
              _this.data.userInfo = res.userInfo;
              _this.setData({
                hasUserInfo: true
              });
              _this.getBusinessInfo();
              _this.addUserInfo();
              _this.selectUserInfo();
              wx.showToast({
                title: '登录成功',
                mask:true,
                duration:2000,
              })
            }
          })
        } else {
          wx.openSetting();
        }
      }
    })
  },

  switchTab(e){
    if (!this.data.hasUserInfo) {
      this.getUserProfile();
    } else {
      wx.switchTab({
        url: e.currentTarget.dataset.to
      })
    }
  },

  navigateto(e) {
    if (e.currentTarget.dataset.to == "/pages/merchantAccess/merchantAccess"
      && this.data.examineStatus == "正在审核中"
    ) {
      wx.showToast({
        title: '信息已在审核中',
        icon: 'error'
      })
      return;
    };
    if (!this.data.hasUserInfo) {
      this.getUserProfile();
    } else {
      wx.navigateTo({
        url: e.currentTarget.dataset.to
      })
    }
  },

  addUserInfo(){
    wx.cloud.callFunction({
      name:"user",
      data:{
        type:"add",
        userInfo:this.data.userInfo
      }
    })
  },

  selectUserInfo(){
    let _this = this;
    wx.cloud.callFunction({
      name:"user",
      data:{
        type:"select",
      },
      success(res){
           if(res.result.status == 1){
             console.log(res.result.data);
            _this.setData({
               userInfo:res.result.data
             })
           }
      }
    })
  },

  getBusinessInfo() {
    let _this = this;
    if (!this.data.hasUserInfo) return;
    wx.cloud.callFunction({
      name: "merchantReview",
      data: {
        type: "select",
      },
      success(res) {
        if (_this.data.examineStatus == "审核通过") return;
        if (res.result.status == 1) {
          if (!res.result.data.length) return;
          if (res.result.data[0].status == 1) {
            _this.setData({
              examineStatus: "正在审核中"
            })
          } else if (res.result.data[0].status == 2) {
            _this.setData({
              examineStatus: "审核通过",
              [`optionList[0].isShow`]: false,
              [`optionList[2].isShow`]: true
            })
          }
        }
      }
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
    this.getBusinessInfo();
 
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