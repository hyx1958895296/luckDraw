// home/pages/shop/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopDetail:[]
  },
  //回到顶部
  srollViewTop(e){
    // console.log(e.detail.scrollTop);
    if (e.detail.scrollTop > 300) {
      this.setData({
        Top:false
      })
    } else {
      this.setData({
        Top:true
      })
    }
  },
  backTop(){
    this.setData({
      top:true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.id);
    this.getShopDetail(options.id);
    // const eventChannel = this.getOpenerEventChannel()
    // eventChannel.on('acceptDataFromOpenerPage', function(data) {
    //   console.log(data)
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
   //商品详情接口
   getShopDetail(detailId){
    wx.cloud.callFunction({
      name:"shop",
      data:{
        type:'details',
        shopId:detailId
      },success:res=>{
        this.setData({
          shopDetail:res.result.data
        })
      }
    })
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