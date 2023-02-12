// pages/activitydetalis/activitydetalis.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isListofprizes: false,
    activityId: "",
    isLuckDraw: true,
    activityInfo:{},
    isLoding:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.data.activityId = options.id;
    this.isLuckDraw();
    this.getActivityDetails();
  },

  getActivityDetails() {
    let _this = this;
    wx.cloud.callFunction({
      name: "activity",
      data: {
        type: "detail",
        activityId: this.data.activityId
      }, success(res) {
        console.log(res);
        _this.setData({
          activityInfo:res.result.data
        })
        let loding = setTimeout(()=>{
            _this.setData({
               isLoding:false
            },2000)
            clearTimeout(loding);
        })
      }
    })
  },

  isLuckDraw() {
    let _this = this;
    wx.cloud.callFunction({
      name: "raffleRecord",
      data: {
        type: "select",
        raffleRecordInfo: {
          activityId: this.data.activityId
        }
      },
      success(res) {
        if (res.result.status == 1) {
          _this.setData({
            isLuckDraw: true
          })
        } else {
          _this.setData({
            isLuckDraw: false
          })
        }
      }
    })
  },

  luckDraw() {
    let _this = this;
    if (!this.data.isLuckDraw) {
      wx.showToast({
        title: '你已经参加过此活动',
        icon: "none"
      })
      return;
    };
    wx.cloud.callFunction({
      name: "raffleRecord",
      data: {
        type: "create",
        raffleRecordInfo: {
          activityId: this.data.activityId
        }
      },
      success(res) {
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
            icon: "error"
          })
        }
      }
    })
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