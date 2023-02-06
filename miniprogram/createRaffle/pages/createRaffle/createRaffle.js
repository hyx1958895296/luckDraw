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
    multiArray: [

    ],
    multiIndex: [0, 0, 0],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.time();
  },

  bindMultiPickerChange (e) {
    // console.log(e)
    // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    this.setData({
      multiIndex:e.detail.value
    })
  },

  // bindMultiPickerColumnChange: function (e) {
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     index: e.detail.value
  //   })
  // },

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
    console.log(dateArr);
    this.setData({
      multiArray: [
        dateArr,
        ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
        ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55']
      ]
    })
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