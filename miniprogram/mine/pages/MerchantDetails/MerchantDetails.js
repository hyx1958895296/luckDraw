// mine/pages/MerchantDetails/MerchantDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    businessDetail:[],
    dialogReviewOk:false,
    dialogReviewNoOk:false
  },
//获取商家详情列表接口
  getBusinessDetail(id){
    wx.cloud.callFunction({
      name:"business-info",
      data:{
        type:'select',
        openid:''
      },success:res=>{
        this.setData({
          businessDetail:res.result.data
        })
        console.log(res);
      }
    })
  },

  dialogReviewOkNoFn(){
    this.data.dialogReviewNoOk = true;
    // this.setData({
    //   dialogReviewOk = true
    // })
  },

  dialogReviewOkFn(){
    console.log(111);
    // wx.showToast({
    //   title: '审核已通过',
    //   duration:1000
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getBusinessDetail(options.id);
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