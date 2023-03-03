import {
  Time
} from "../../../util/time"
const time = new Time();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 活动名称
    activityName: '',
    // 用户头像
    avatarUrl: '',
    // 用户头像
    storeName: '',
    // 月 日 时 分  当天往后30天
    multiArray: [],
    multiIndex: [0],
    hasEnd: true,
    // 月 日 时 分  活动开始时间往后30天
    multiArrayEnd: [],
    multiIndexEnd: [0],
    // 是否同意活动协议
    checked: false,
    // 添加奖项
    drawCount: 1,
    // 滚动
    isScroll: true,
    // 上传活动封面图片
    localshowImage: '',
    activityCover: 'https://776c-wllyun-dev-3gxie2dud70a3acf-1316269736.tcb.qcloud.la/%E6%9C%AA%E6%A0%87%E9%A2%98-2.png?sign=8ce3466a1d352e26f42db1dd1c7e6d5e&t=1675411132',
    // 添加奖品信息
    prizelist: [{
      peopleCount: '',
      prizeName: '',
      prizeCount: '',
      img: ''
    }],
    // 开始时间戳
    startTimeStamp: '',
    // 结束时间戳
    endTimeStamp: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getStartTime();
    this.endTime();
    this.getUserInfo();
  },

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

  checked(){
    this.setData({
      checked: !this.data.checked
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
      prizelist: this.data.prizelist.concat({
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
      prizelist: this.data.prizelist.splice(index, 1)
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
    let arr = this.data.prizelist;
    if (arr[e.target.id]) {
      arr[e.target.id].peopleCount = e.detail.value
    }
    this.setData({
      prizelist: arr
    });
  },
  // input  奖品
  bindKeyInputPrize(e) {
    let arr = this.data.prizelist;
    if (arr[e.target.id]) {
      arr[e.target.id].prizeName = e.detail.value
    }
    this.setData({
      prizelist: arr
    });
  },
  // input  份
  bindKeyInputCount(e) {
    let arr = this.data.prizelist;
    if (arr[e.target.id]) {
      arr[e.target.id].prizeCount = e.detail.value
    }
    this.setData({
      prizelist: arr
    });
  },

  // picker选择器  
  // 开始
  bindMultiPickerChange(e) {
    this.setData({
      multiIndex: e.detail.value
    });

    this.setData({
      hasEnd: false,
      hasStart: true,
    });

    // 选择开始时间时同时选择结束时间
    this.endTime(time.parseDate(this.data.multiArray[0][this.data.multiIndex[0]]).slice(1));

    this.setData({
      startTimeStamp: time.parseTimeStamp(time.parseDate(this.data.multiArray[0][e.detail.value[0]]) + ' 08:00'),
      endTimeStamp: time.parseTimeStamp(time.parseDate(this.data.multiArrayEnd[0][e.detail.value[0]]) + ' 16:00'),
    });
  },
  // 结束
  bindMultiPickerChangeEnd(e) {
    this.setData({
      multiIndexEnd: e.detail.value
    });

    this.setData({
      endTimeStamp: time.parseTimeStamp(time.parseDate(this.data.multiArrayEnd[0][e.detail.value[0]]) + ' 16:00'),
    });
  },

  // 是否设置了开始时间，没设置提示用户
  isSetStart() {
    if (this.data.hasEnd) {
      wx.showToast({
        title: '请选择开始时间',
        icon: 'error',
        duration: 2000
      });
    }
  },

  // 结束抽奖时间
  endTime(e) {
    let arr = new Date().getHours() >= 8 ? time.format(30, time.parseDate(this.data.multiArray[0][this.data.multiIndex[0]])).slice(1) : time.format(30, time.parseDate(this.data.multiArray[0][this.data.multiIndex[0]]));

    this.setData({
      multiArrayEnd: [
        arr
      ]
    })
  },

  // 开始抽奖时间
  getStartTime() {
    let arr = new Date().getHours() >= 8 ? time.format(30).slice(1) : time.format(30);
    this.setData({
      multiArray: [
        arr
      ]
    });
  },

  // 上传图片
  uploadFile() {
    return new Promise((resolve, reject) => {
      wx.chooseMedia({
        count: 1,
        success(res) {
          resolve(res);
        }
      })
    })
  },



  // 上传活动封面
  async upImage() {
    let _this = this;
    let res = await this.uploadFile();
      // 将文件后缀改为 .png  将文件上传到云储存
    let po = res.tempFiles[0].tempFilePath.lastIndexOf(".");
    let ext = res.tempFiles[0].tempFilePath.slice(po);
    wx.cloud.uploadFile({
      cloudPath: new Date().getTime() + ext,
      filePath: res.tempFiles[0].tempFilePath,
      success(res) {
        if (!res.fileID) return;
        _this.setData({
          activityCover: res.fileID,
        });
      }
    })
  },

  // 上传商品图片
  async upShopImage(e) {
    let _this = this;
    let res = await this.uploadFile();
    let po = res.tempFiles[0].tempFilePath.lastIndexOf(".");
    let ext = res.tempFiles[0].tempFilePath.slice(po);

    wx.cloud.uploadFile({
      cloudPath: new Date().getTime() + ext,
      filePath: res.tempFiles[0].tempFilePath,
      success(res) {
        if (!res.fileID) return;
        _this.setData({
          [`prizelist[${e.currentTarget.dataset.index}].img`]: res.fileID,
        });
      }
    })
  },


  // 创建活动
  async create() {
    let isCreate = true;
    if (!this.data.activityName) {
      wx.showToast({
        title: '请输入活动名称',
        icon: 'error',
        duration: 2000
      });
      isCreate = false;
    } else if (!this.data.hasStart) {
      wx.showToast({
        title: '请选择开始时间',
        icon: 'error',
        duration: 2000
      });
      isCreate = false;
    }else if(!this.data.checked){
      wx.showToast({
        title: '请先同意服务协议',
        icon: 'none',
        duration: 2000
      });
      isCreate = false;
    };
    for (let index = 0; index < this.data.prizelist.length; index++) {
      if (!this.data.prizelist[index].peopleCount && !this.data.prizelist[index].prizeCount && !this.data.prizelist[index].prizeName && !this.data.prizelist[index].img) {
        wx.showToast({
          title: '请填写完整奖品信息',
          icon: 'error',
          duration: 2000
        });
        isCreate = false;
      }
      if (!this.data.prizelist[index].img) {
        wx.showToast({
          title: '请上传奖品图片',
          icon: 'error',
          duration: 2000
        });
        isCreate = false;
      }
    };
    if (isCreate) {
      // 调用发起活动的接口
      await this.createActivity();
    }
  },

  // 创建活动接口
  async createActivity() {
    let res = await wx.cloud.callFunction({
      name: "activity",
      data: {
        type: "create",
        activityInfo: {
          storeName: this.data.storeName,
          avatarUrl: this.data.avatarUrl,
          activityName: this.data.activityName,
          startTimeStamp: this.data.startTimeStamp,
          endTimeStamp: this.data.endTimeStamp,
          activityCover: this.data.activityCover,
          prizelist: this.data.prizelist,
        }
      },
    })
    console.log(res);
    if (res.result.status == 1) {
      wx.switchTab({
        url: '/pages/activity/activity',
        success: function () {
          wx.showToast({
            title: '发起成功！',
            icon: 'success',
            duration: 1000,
          })
        }
      })
    }
  },

  // 获取用户信息
  async getUserInfo() {
    let res = await wx.cloud.callFunction({
      name: 'user',
      data: {
        type: 'select',
      },
    })
    if (res.result.status == 1) {
      this.setData({
        avatarUrl: res.result.data.avatarUrl,
        storeName: res.result.data.nickName,
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