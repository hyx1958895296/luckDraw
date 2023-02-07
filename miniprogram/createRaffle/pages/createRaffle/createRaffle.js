// createRaffle/pages/createRaffle/createRaffle.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 1,
    tab: [{
      id: 1,
      title: '定时开奖',
    }, {
      id: 2,
      title: '满人开奖',
    }, {
      id: 3,
      title: '即抽即开',
    }, {
      id: 4,
      title: '手动开奖',
    }, ],
    // 月 日 时 分  当天往后30天
    multiArray: [],
    multiIndex: [0, 0, 0],
    // 是否开启循环抽奖
    loopChecked: false,
    // 是否同意活动协议
    checked: true,
    fristPrizeName: '奖品名称',
    prizeLevel: 0,
    prizeLevelTow: 0,
    // 添加奖项
    drawCount: 1,
    // 滚动
    isScroll: true,
    // 上传图片
    localshowImage:'',
    replaceImg:'https://776c-wllyun-dev-3gxie2dud70a3acf-1316269736.tcb.qcloud.la/%E6%9C%AA%E6%A0%87%E9%A2%98-2.png?sign=8ce3466a1d352e26f42db1dd1c7e6d5e&t=1675411132',
    imageList:[],
    from:[{
      peopleCount:'',
      prizeName:'',
      prizeCount:'',
    }],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.time();
  },

  // 是否循环抽奖
  setChecked() {
    this.setData({
      loopChecked: !this.data.loopChecked
    })
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
      url: e.currentTarget.dataset.to ,
    })
  },

  // 添加奖品
  add() {
    let count = this.data.drawCount + 1;
    this.setData({
      drawCount: count,
      from:this.data.from.concat({
        peopleCount:'',
        prizeName:'',
        prizeCount:'',
      })
    })
  },

  // input
  bindKeyInput(e){
    console.log(e)
    this.data.from.forEach((item,index) => {
      console.log(this.data.from[e.target.id]);
      console.log(e.target.id);
      this.data.from[e.target.id] == e.detail.value
    });
    console.log(this.data.from)
    this.setData({
        from:this.data.from
    });
  },

  // picker选择器
  bindMultiPickerChange(e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },

  // 抽奖时间
  time() {
    let nowDate = new Date();
    let dateArr = [];
    dateArr.push(nowDate.getMonth() + 1 + '月' + nowDate.getDate() + '日')
    for (let i = 0; i < 30; i++) {
      let tempDate = nowDate.setDate(nowDate.getDate() + 1);
      tempDate = new Date(tempDate);
      let ri = tempDate.getDate();
      let yue = tempDate.getMonth() + 1;
      let yueRi = yue + '月' + ri + "日";
      dateArr.push(yueRi);
    }
    this.setData({
      multiArray: [
        dateArr,
        ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
        ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55']
      ]
    })
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
            success(res){
              if(!res.fileID) return;
              arr.push(res.fileID);
              _this.setData({
                replaceImg:res.fileID
              });
              console.log(1)
              console.log(res);
            }
          })
        })
      }
    })
  },
  // 上传商品图片
  upShopImage(index) {
  console.log(index)
  },

  // tab切换
  tab(e) {
    this.setData({
      active: e.currentTarget.dataset.id
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