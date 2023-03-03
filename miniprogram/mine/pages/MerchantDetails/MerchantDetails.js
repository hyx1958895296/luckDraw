// mine/pages/MerchantDetails/MerchantDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    businessDetail:{},
    dialogReviewOk:false,
    dialogReviewNoOk:false,
    isStatus:''
  },
//获取商家详情列表接口
  getBusinessDetail(businessId){
    wx.cloud.callFunction({
      name:"business-info",
      data:{
        type:'detail',
        businessInfoId:businessId
      },success:res=>{
        this.setData({
          businessDetail:res.result.data
        })
      }
    })
  },

  dialogReviewOkNoFn(){
    this.data.dialogReviewNoOk = true;
    // this.setData({
    //   dialogReviewOk = true
    // })
  },
// 审核方法
  dialogReviewOkFn(businessId){
      wx.cloud.callFunction({
        name:"business-info",
        data:{
          type:'update',
          businessInfoId:businessId,
          status:2
        },success:(res)=>{
          this.setData({
            businessDetail:res.result.data                                            
          })
        }
      })
      if(this.data.businessDetail == 2){
        wx.showToast({
          title: '审核已通过',
          duration:1000
        })

        wx.navigateTo({
          url: '/mine/pages/reviewMerchants/reviewMerchants',
        })
      }else{
        this.data.dialogReviewNoOk = true;
      }
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