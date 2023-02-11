// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList:[],
    tabListData:[],
  },

  hr(shopId){
    this.getShopList(shopId.currentTarget.dataset.id);
    this.setData({
      id:shopId.currentTarget.dataset.id
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
    // let _this = this;
    wx.navigateTo({
      url:'/home/pages/shop/detail?id='+id.currentTarget.dataset.id,
      // events: {
      //   // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
      //   acceptDataFromOpenedPage: function(data) {
      //     console.log(data)
      //   },
      //   someEvent: function(data) {
      //     console.log(data)
      //   }
      // },
      // success: function(res) {
      //   // 通过 eventChannel 向被打开页面传送数据
      //   res.eventChannel.emit('acceptDataFromOpenerPage', { shopDetail: _this.data.shopDetail})
      // }
    })
    // console.log(id.currentTarget.dataset.id);
    // this.getShopDetail(id.currentTarget.dataset.id);
  },

  //获取类目接口
  getCategray(){
    wx.cloud.callFunction({
      name:'category',
       data:{
         type:'select'
        },
        success:res=>{
          console.log(res)
          this.setData({
            tabListData :res.result.data,
          })
        }
    })
  },

  //调用商品列表接口
  getShopList(categoryId){
    wx.cloud.callFunction({
      name:'shop',
      data:{
        type:'select',
        categoryId:categoryId
      },
      success:res=>{
        this.setData({
          shopList:res.result.data
        })
      }
    })
  },

  //商品详情接口
  // getShopDetail(detailId){
  //   wx.cloud.callFunction({
  //     name:"shop",
  //     data:{
  //       type:'details',
  //       shopId:detailId
  //     },success:res=>{
  //       this.setData({
  //         shopDetail:res.result.data
  //       })
  //       console.log(res);
  //     }
  //   })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getCategray();
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