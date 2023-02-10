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
    id:'',
  },
  hr(shopId){
    // this.setData({
    //   isHr:shopId,
    //   // current:es.currentTarget.dataset.es
    // })
    console.log(shopId);
    this.getShopList(shopId.currentTarget.dataset.es);
    this.setData({
      current:shopId.currentTarget.dataset.index,
      id:shopId.currentTarget.dataset.es
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
   //获取类目接口
   async getCategray(){
     console.log(22);
     let res=await wx.cloud.callFunction({
       name:'category',
       data:{
         type:'select'
        },
      })
      if(res){
        console.log(res)
          this.setData({
            tabListData :res.result.data,
          })
          this.getShopList(res.result.data[0]._id)
          return res.result
      }
    },
   
    //调用商品列表接口 
  async getShopList(id){
     let res= wx.cloud.callFunction({
        name:'shop',
        data:{
          type:'select',
          categoryId:id
        },
      })
      
        this.setData({
          // shopList:res.result.data
        })
        return res.result
    },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    let _this  = this;
    let res=await this.getCategray();
    await this.getShopList(res.data[0]._id)
    wx.cloud.callFunction({
      name:'shop',
      data:{
        type:'select',
        categoryId:_this.data.id
      },
      success:res=>{
        console.log(res.result.data);
        _this.setData({
          shopList:res.result.data
        })
      }
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