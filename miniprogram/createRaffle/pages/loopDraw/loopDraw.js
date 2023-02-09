// createRaffle/pages/loopDraw/loopDraw.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 开奖时间
    multiArray: [],
    multiIndex: [0, 0],
    //  循环次数
    multiArrayCount: [],
    multiIndexCount: '',
    dateList: [{
        active: false,
        title: '每周一',
      },
      {
        active: false,
        title: '每周二',
      },
      {
        active: false,
        title: '每周三',
      },
      {
        active: false,
        title: '每周四',
      },
      {
        active: false,
        title: '每周五',
      },
      {
        active: false,
        title: '每周六',
      },
      {
        active: false,
        title: '每周日',
      },
      {
        active: false,
        title: '全选',
      },
    ],
    activeText: '',
    activeArr: [],
    endDate: ''
  },

  // 计算循环抽奖结束时间
  endDate() {
    let num = this.data.activeArr.length * this.data.multiIndexCount;
    console.log(num);
    let nowDate = new Date();
    let dateArr = [];
    let yueRi = '';
    dateArr.push(nowDate.getMonth() + 1 + '月' + nowDate.getDate() + '日')
    for (let i = 0; i < num; i++) {
      let tempDate = nowDate.setDate(nowDate.getDate() + 1);
      tempDate = new Date(tempDate);
      let ri = tempDate.getDate();
      let yue = tempDate.getMonth() + 1;
      let nian = tempDate.getFullYear();
      yueRi = nian + '年' + yue + '月' + ri + "日";
    }
    console.log(yueRi);
    this.setData({
      endDate:yueRi
    })
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

  // 选择item
  active(e) {
    let index = e.target.dataset.item;
    let item = this.data.dateList[index];
    let arr = [];
    let allIndex = 0;
    this.data.dateList.forEach((item, index) => {
      if (item.title == "全选") {
        allIndex = index;
      }
    });
    if (item.title != "全选") {
      arr = [item.title]
      if (item.active) {
        this.setData({
          [`dateList[${index}].active`]: false,
          [`dateList[${allIndex}].active`]: false,
          activeArr: this.data.activeArr.filter(item => item != arr[0])
        })
      } else {
        this.setData({
          [`dateList[${index}].active`]: true,
          activeArr: this.data.activeArr.concat(arr)
        })
        let is = this.data.dateList.find(item => item.active == false && item.title != '全选');
        if (is == undefined) {
          this.setData({
            [`dateList[${allIndex}].active`]: true,
          })
        }
      }
    } else {
      if (item.active) {
        arr = []
        this.data.dateList.forEach((item, index) => {
          this.setData({
            [`dateList[${index}].active`]: false,
            activeArr: []
          })
        });
      } else {
        this.data.dateList.forEach(item => {
          arr.push(item.title)
        });
        this.data.dateList.forEach((item, index) => {
          this.setData({
            [`dateList[${index}].active`]: true,
            activeArr: [...new Set(this.data.activeArr.concat(arr))].filter(item => item != '全选'),
          })
        });
      }
    }
    this.setData({
      activeArr: this.sortWeeks(this.data.activeArr)
    })
  },

  // 展示给用户看的
  getActiveText() {
    let text = '';
    if (this.data.activeArr.length == 7) {
      text = '每周每天';
    } else {
      this.data.activeArr.forEach(item => {
        text += item.slice(2, 3) + '、';
      })
      text = '每周' + text;
    }
    this.setData({
      activeText: text.replace(/、$/, '')
    })
  },

  // 排序星期
  sortWeeks(weeks) {
    var _weeks = []; //创建临时排序的数组
    for (var i = 0; i < weeks.length; i++) {
      if (weeks[i] == "每周一") {
        var _week = {};
        _week["id"] = 1;
        _week["name"] = "每周一";
        _weeks.push(_week);
      }
      if (weeks[i] == "每周二") {
        var _week = {};
        _week["id"] = 2;
        _week["name"] = "每周二";
        _weeks.push(_week);
      }
      if (weeks[i] == "每周三") {
        var _week = {};
        _week["id"] = 3;
        _week["name"] = "每周三";
        _weeks.push(_week);
      }
      if (weeks[i] == "每周四") {
        var _week = {};
        _week["id"] = 4;
        _week["name"] = "每周四";
        _weeks.push(_week);
      }
      if (weeks[i] == "每周五") {
        var _week = {};
        _week["id"] = 5;
        _week["name"] = "每周五";
        _weeks.push(_week);
      }
      if (weeks[i] == "每周六") {
        var _week = {};
        _week["id"] = 6;
        _week["name"] = "每周六";
        _weeks.push(_week);
      }
      if (weeks[i] == "每周日") {
        var _week = {};
        _week["id"] = 7;
        _week["name"] = "每周日";
        _weeks.push(_week);
      }
    }
    _weeks.sort(function (a, b) {
      return a.id - b.id;
    });
    //将weeks清空并将排序好的值赋给weeks
    weeks = [];
    for (var i = 0; i < _weeks.length; i++) {
      weeks.push(_weeks[i].name);
    }
    return weeks;
  },

  keep() {
    this.hideModal();
    this.getActiveText();

  },

  // 跳转
  navigateto(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.to,
    })
  },

  // picker选择器
  bindMultiPickerChange(e) {
    this.setData({
      multiIndex: e.detail.value,
    })
  },
  bindMultiPickerChangeCount(e) {
    console.log(e)
    this.setData({
      multiIndexCount: Number(e.detail.value) + 2
    });
    this.endDate()
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
    let count = [];
    for (let index = 2; index < 29; index++) {
      count.push(index + '次')
    }
    this.setData({
      multiArray: [
        hours,
        minutes
      ],
      multiArrayCount: [
        count
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