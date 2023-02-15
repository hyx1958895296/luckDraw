// home/pages/shop/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopDetail:{},
    Top:false
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
  
  onAuthLocation(){
    wx.authorize({
      scope: 'scope.userLocation',
      success: (res) => {
          console.log('成功：' , res)
      },
      fail: (res) => {
          console.log('失败：', res)
      },
    })
    this.onGetLocation();
    if(!this.onGetLocation()){
      this.gotoSetting();
    }
  },

  //地图 ————获取经纬度方法
  onGetLocation(){
    wx.getLocation({
      success: (res) => {
          console.log('成功：', res)
      },
      fail: (res) => {
          console.log('失败：', res)
      }
    })
  },

  //拒绝后再次授权，打开授权面板
  gotoSetting() {
    wx.openSetting({
        success: (res) => {
            console.log(res)
        }
    })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(options.id);
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
    console.log(111);
    wx.cloud.callFunction({
      name:"shop",
      data:{
        type:'details',
        shopId:detailId
      },success:res=>{
        // console.log(res);
        // console.log(this);
        // this.data.shopDetail=res.result.data;
        // console.log(this.data.shopDetail);
        // console.log(res.result.data);
        this.setData({
          shopDetail:res.result.data
        })
        console.log(this.data.shopDetail);
        // console.log(res);
      }
    })
    console.log(1111);
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