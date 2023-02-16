import { Time } from "../../../util/time"
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
    isEnd: true,
    // 月 日 时 分  活动开始时间往后30天
    multiArrayEnd: [],
    multiIndexEnd: [0],
    // 是否同意活动协议
    checked: true,
    // 添加奖项
    drawCount: 1,
    // 滚动
    isScroll: true,
    // 上传活动封面图片
    localshowImage: '',
    activityCover: 'https://776c-wllyun-dev-3gxie2dud70a3acf-1316269736.tcb.qcloud.la/%E6%9C%AA%E6%A0%87%E9%A2%98-2.png?sign=8ce3466a1d352e26f42db1dd1c7e6d5e&t=1675411132',
    imageList: [],
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
  bindMultiPickerChange(e) {
    this.setData({
      multiIndex: e.detail.value
    });

    this.setData({
      isEnd: false,
      isStart: true,
    });

    // 选择开始时间时同时选择结束时间
    this.endTime(time.parseDate(this.data.multiArray[0][this.data.multiIndex[0]]).slice(1));

    // 将开始时间转成时间戳
    let startTimeStamp = time.parseTimeStamp(time.parseDate(this.data.multiArray[0][e.detail.value[0]]) + ' 08:00')
    console.log(startTimeStamp);
    this.setData({
      startTimeStamp: startTimeStamp,
      // endTimeStamp: timeStampEnd,
    });
  },
  bindMultiPickerChangeEnd(e) {
    this.setData({
      multiIndexEnd: e.detail.value
    });
    let year = this.data.multiArrayEnd[0][e.detail.value[0]].split('年', )[0];
    let month = this.data.multiArrayEnd[0][e.detail.value[0]].split('年', )[1].split('月')[0];
    let day = this.data.multiArrayEnd[0][e.detail.value[0]].split('年', )[1].split('月')[1].split('日')[0];
    let timeStamp = new Date(year + '-' + month + '-' + day + ' 18:00:00').getTime();
    this.setData({
      endTimeStamp: timeStamp
    });
  },

  // 是否设置了开始时间，没设置提示用户
  isSetStart() {
    if (this.data.isEnd) {
      wx.showToast({
        title: '请选择开始时间',
        icon: 'error',
        duration: 2000
      });
    }
  },

  // 结束抽奖时间
  endTime(e) {
    let arr = new Date().getHours() >= 8 ? time.format(30,time.parseDate(this.data.multiArray[0][this.data.multiIndex[0]])).slice(1) : time.format(30,time.parseDate(this.data.multiArray[0][this.data.multiIndex[0]]));
    
    this.setData({
      multiArrayEnd: [
       arr
      ]
    })
  },

  // 开始抽奖时间
  getStartTime() {
    let arr =  new Date().getHours() >= 8 ? time.format(30).slice(1) : time.format(30);

    this.setData({
      multiArray: [
        arr
      ]
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
                activityCover: res.fileID
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
                [`prizelist[${e.currentTarget.dataset.index}].img`]: res.fileID,
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
      this.createActivity();
    }
  },

  // 创建活动接口
  createActivity() {
    wx.cloud.callFunction({
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
      success(res) {
        wx.showToast({
          title: '发起成功！',
          icon: 'success',
          duration: 2000
        });

        setTimeout(() => {
          // 创建成功跳转到活动页面
          wx.switchTab({
            url: '/pages/activity/activity',
          })
        }, 1000);
      }
    })
  },

  // 获取用户信息
  getUserInfo() {
    let _this = this;
    wx.cloud.callFunction({
      name: 'user',
      data: {
        type: 'select',
      },
      success(res) {
        _this.setData({
          avatarUrl: res.result.data.avatarUrl,
          storeName: res.result.data.nickName,
        })
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