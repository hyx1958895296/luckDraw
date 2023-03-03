// mine/pages/reviewMerchants/reviewMerchants.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    businuessList:[],
  },

  navigateToReviewDetail(id){
    wx.navigateTo({
      url:'/mine/pages/MerchantDetails/MerchantDetails?id='+id.currentTarget.dataset.id,
    })
  },

  businuessListFn(){
    wx.cloud.callFunction({
          name:"business-info",
          data:{
            type:'select',
          },success:res=>{
            this.setData({
              businuessList:res.result.data
            })
          }
        })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.businuessListFn();
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