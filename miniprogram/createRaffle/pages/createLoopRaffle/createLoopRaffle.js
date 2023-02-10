// createRaffle/pages/createRaffle/createRaffle.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 活动名称
    activityName: '',
    // 是否同意活动协议
    checked: true,
    // 添加奖项
    drawCount: 1,
    // 滚动
    isScroll: true,
    // 上传图片
    localshowImage: '',
    replaceImg: 'https://776c-wllyun-dev-3gxie2dud70a3acf-1316269736.tcb.qcloud.la/%E6%9C%AA%E6%A0%87%E9%A2%98-2.png?sign=8ce3466a1d352e26f42db1dd1c7e6d5e&t=1675411132',
    imageList: [],
    // 添加奖品信息
    from: [{
      peopleCount: '',
      prizeName: '',
      prizeCount: '',
      img: ''
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  // 获取焦点事件
  bindfocus(e) {
    this.setData({
      isScroll: false
    })
  },
  // 失去焦点事件
  closeblur(e) {
    this.setData({
      isScroll: true
    })
  },

  // 跳转
  navigateto(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.to,
    })
  },

  // 添加奖品
  add() {
    let count = this.data.drawCount + 1;
    this.setData({
      drawCount: count,
      from: this.data.from.concat({
        peopleCount: '',
        prizeName: '',
        prizeCount: '',
        img: ''
      })
    })
  },

  // 减少奖品
  reduce(index) {
    let count = this.data.drawCount - 1;
    this.setData({
      drawCount: count,
      from: this.data.from.splice(index, 1)
    })
  },

  // input name
  bindKeyInputName(e) {
    this.setData({
      activityName: e.detail.value
    })
  },

  // input  人数
  bindKeyInputPeople(e) {
    let arr = this.data.from;
    if (arr[e.target.id]) {
      arr[e.target.id].peopleCount = e.detail.value
    }
    this.setData({
      from: arr
    });
  },

  // input  奖品
  bindKeyInputPrize(e) {
    let arr = this.data.from;
    if (arr[e.target.id]) {
      arr[e.target.id].prizeName = e.detail.value
    }
    this.setData({
      from: arr
    });
  },

  // input  份
  bindKeyInputCount(e) {
    let arr = this.data.from;
    if (arr[e.target.id]) {
      arr[e.target.id].prizeCount = e.detail.value
    }
    this.setData({
      from: arr
    });
  },

  // 上传活动封面
  upImage() {
    let _this = this;
    let arr = [];
    wx.chooseMedia({
      count: 1,
      success(res) {
        _this.setData({
          localshowImage: res.tempFiles,
        });
        res.tempFiles.forEach(image => {
          let po = image.tempFilePath.lastIndexOf(".");
          let ext = image.tempFilePath.slice(po);
          wx.cloud.uploadFile({
            cloudPath: new Date().getTime() + ext,
            filePath: image.tempFilePath,
            success(res) {
              if (!res.fileID) return;
              arr.push(res.fileID);
              _this.setData({
                replaceImg: res.fileID
              });
            }
          })
        })
      }
    })
  },
  // 上传商品图片
  upShopImage(e) {
    let _this = this;
    let arr = [];
    wx.chooseMedia({
      count: 1,
      success(res) {
        _this.setData({
          localshowImage: res.tempFiles,
        });
        res.tempFiles.forEach(image => {
          let po = image.tempFilePath.lastIndexOf(".");
          let ext = image.tempFilePath.slice(po);
          wx.cloud.uploadFile({
            cloudPath: new Date().getTime() + ext,
            filePath: image.tempFilePath,
            success(res) {
              if (!res.fileID) return;
              arr.push(res.fileID);
              _this.setData({
                [`from[${e.currentTarget.dataset.index}].img`]: res.fileID,
              });
            }
          })
        })
      }
    })
  },

  // 创建活动
  create() {
    let isCreate = true;
    if (!this.data.activityName) {
      wx.showToast({
        title: '请输入活动名称',
        icon: 'error',
        duration: 2000
      });
      isCreate = false;
    } else if (!this.data.isStart) {
      wx.showToast({
        title: '请选择开始时间',
        icon: 'error',
        duration: 2000
      });
      isCreate = false;
    };
    for (let index = 0; index < this.data.from.length; index++) {
      if (!this.data.from[index].peopleCount && !this.data.from[index].prizeCount && !this.data.from[index].prizeName && !this.data.from[index].img) {
        wx.showToast({
          title: '请填写完整奖品信息',
          icon: 'error',
          duration: 2000
        });
        isCreate = false;
      }
      if (!this.data.from[index].img) {
        wx.showToast({
          title: '请上传奖品图片',
          icon: 'error',
          duration: 2000
        });
        isCreate = false;
      }
    };
    if (isCreate) {
      this.createActivity()
    }
  },

  // 创建活动接口
  createActivity(options) {
    wx.cloud.callFunction({
      name: "activity",
      data: {
        type: "create"
      },
      success(res) {
        console.log(res);
        console.log('创建了活动');
      }
    })
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