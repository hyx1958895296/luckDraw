// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList:[],
    isHr:0,
    tabListData:[],
    current:0,
  },
  hr(es){
    this.setData({
      isHr:es,
      current:es.currentTarget.dataset.es
    })
    //调用商品列表接口
    wx.cloud.callFunction({
      name:'shop',
      data:{
        type:'select',
        categoryId:this.data.current
      },
      success:res=>{
        console.log(res);
        this.setData({
          shopList:res.result.data
        })
      }
    })
  },

  //微信签到跳转
  signIn(){
  },
  //获取更多积分
  navagitorToActivity(e){
    wx.switchTab({
      url: '/pages/activity/activity',
    })
  },
  //跳转签到页面
  navToSign(e){
    wx.navigateTo({
      url: '/home/pages/sign',
    })
  },
  //跳转商品详情页
  navToDetail(id){
    wx.navigateTo({
      url: '/home/pages/shop/detail',
    })
    wx.cloud.callFunction({
      name:''
    })
  },
  // 获取商品列表接口
    getShopList(){
      wx.cloud.callFunction({
        name:'category',
        data:{
          type:'select'
        },
        success:res=>{
          console.log(res);
          this.setData({
            tabListData :res.result.data,
          })
        }
      })
    },
    //
  //获取类目接口
    getCategray(id){
      
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getShopList();
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