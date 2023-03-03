// pages/activitydetalis/activitydetalis.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isListofprizes: false,
    activityId: "",
    isLuckDraw: true,
    activityInfo: {},
    isLoding: true,
    prizelist: [],
    newJackpot: {},
    timer: null,
    countDown: [],
    flag: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      activityId: options.id
    })

    this.getActivityDetails();
  },



  tow(n) {
    return n >= 0 && n < 10 ? '0' + n : '' + n;
  },
  // 倒计时
  countDown(endTime) {
    // 活动时间的秒数
    let second = Math.floor((endTime - new Date().getTime()) / 1000);
    // 一天的秒数是86400 活动时间的秒数 / 86400 = 活动时间的天数
    let day = Math.floor(second / 86400);
    //余数代表剩下的秒数；
    second = second % 86400;
    //整数部分代表小时；
    let hour = Math.floor(second / 3600);
    //余数代表 剩下的秒数；
    second %= 3600;
    var minute = Math.floor(second / 60);
    second %= 60;
    let countDownArr = [];
    countDownArr[0] = this.tow(day);
    countDownArr[1] = this.tow(hour);
    countDownArr[2] = this.tow(minute);
    countDownArr[3] = this.tow(second);
    this.setData({
      countDown: countDownArr
    })
  },

  async getActivityDetails() {
    let _this = this;
    let res = await wx.cloud.callFunction({
      name: "activity",
      data: {
        type: "detail",
        activityId: this.data.activityId
      }
    })
    if (res.result.status == 1) {
      let activityInfo = res.result.data;
      activityInfo.prizelist.sort((a, b) => {
        return a.peopleCount - b.peopleCount
      });
      let peopleNumber = activityInfo.prizelist.find(item => activityInfo.peopleCount < item.peopleCount);
      if (peopleNumber == undefined) {
        peopleNumber = activityInfo.prizelist[activityInfo.prizelist.length - 1]
      }
      _this.setData({
        activityInfo: activityInfo,
        newJackpot: peopleNumber
      });

      let loding = setTimeout(() => {
        _this.setData({
          isLoding: false
        })
        clearTimeout(loding);
      }, 1500)
    };
  },

  async isLuckDraw() {
    let _this = this;
    if (!app.globalData.isLogin) return;
    let res = await wx.cloud.callFunction({
      name: "raffleRecord",
      data: {
        type: "select",
        raffleRecordInfo: {
          activityId: this.data.activityId
        }
      },
    })
    if (res.result.status == 1) {
      _this.setData({
        isLuckDraw: true
      })
    } else {
      _this.setData({
        isLuckDraw: false
      })
    }
  },

  addUserInfo() {
    wx.cloud.callFunction({
      name: "user",
      data: {
        type: "add",
        userInfo: this.data.userInfo
      }
    })
  },

  async selectUserInfo() {
    let _this = this;
    let res = await wx.cloud.callFunction({
      name: "user",
      data: {
        type: "select",
      }
    });
    if (res.result.status == 1) {
      app.globalData.isLogin = true;
      _this.setData({
        userInfo: res.result.data
      })
    }
  },

  isLogin() {
    let _this = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting["scope.userInfo"]) {
          wx.getUserProfile({
            desc: '用户授权',
            success: (res) => {
              _this.data.userInfo = res.userInfo;
              app.globalData.isLogin = true;
              _this.addUserInfo();
              _this.isLuckDraw();
              wx.showToast({
                title: '登录成功',
                mask: true,
                duration: 2000,
              });
            }
          })
        } else {
          wx.openSetting();
        }
      }
    })
  },

  luckDraw() {
    let _this = this;
    let thrittle = this.throttle(async function () {
      if (!app.globalData.isLogin) {
        this.isLogin();
        return;
      }
      if (_this.data.activityInfo.status == 1) {
        wx.showToast({
          title: '活动还未开始',
          icon: "error"
        })
        return;
      } else if (_this.data.activityInfo.status == 3) {
        wx.showToast({
          title: '活动已经结束',
          icon: "error"
        })
        return;
      }

      if (!_this.data.isLuckDraw) {
        wx.showToast({
          title: '你已经参加过此活动',
          icon: "none"
        })
        return;
      };

      let res = await wx.cloud.callFunction({
        name: "raffleRecord",
        data: {
          type: "create",
          raffleRecordInfo: {
            activityId: _this.data.activityId
          }
        },
      });
      if (res.result.status == 1) {
        _this.setData({
          isLuckDraw: false
        })
        wx.showToast({
          title: res.result.msg,
          icon: "success"
        })
        _this.getActivityDetails();
      } else {
        wx.showToast({
          title: res.result.msg,
          icon: "none",
        })
      }
    });
    thrittle();
  },
  throttle(fn) {
    let _this = this;
    return function () {
      if (!_this.data.flag) return;
      _this.setData({
        flag: false
      })
      fn();
      let timer = setTimeout(() => {
        _this.setData({
          flag: true
        })
        clearTimeout(timer);
      }, 2000);
    }
  },
 
  showListofprizes() {
    if (this.data.isListofprizes) {
      this.setData({
        isListofprizes: false
      })
    } else {
      this.setData({
        isListofprizes: true
      })
    }
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
    this.selectUserInfo();
    this.isLuckDraw();
    setInterval(() => {
      this.countDown(this.data.activityInfo.endTimeStamp)
    }, 1000)

    this.setData({
      timer: this.data.timer
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    clearInterval(this.data.timer);
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