// createRaffle/pages/addLoopDraw/addLoopDraw.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addLoopDraw:true,
    deleteLoopDraw:true,
    listLoopDraw:[
      {
        id:1,
        periodsNumber:2,
        status:'未开始',
        startTime:'2023-02-13 10:00',
        drawPrizeTime:'2023-02-20 10:00'
      },
      {
        id:1,
        periodsNumber:1,
        status:'',
        startTime:'2023-02-13 10:00',
        drawPrizeTime:'2023-02-20 10:00'
      },
  ]
  },

  add(){
    this.setData({
      addLoopDraw:false
    })
  },
  delete(id){
    this.setData({
      deleteLoopDraw:false
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