// pages/home/home.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabsList: [{
      id: 0,
      value: "猜你喜欢",
    }, {
      id: 1,
      value: "推荐商品",
    }],
    isLoaded: false,
    shopList:[],
    tabListData:[],
    // merchantReview:[],
    // currentTab: 0,
    // sleft: "", //横向滚动条位置
    // isLoding:false,
    // // idLogin:true,
    // isLogin:app.globalData.isLogin,//本页面登录状态
    // loading: false, //是否展示 “正在加载” 字样
    // loaded: false //是否展示 “已加载全部” 字样
  },

  handleTabChange(e) {
    console.log(e)
    // let { current } = e.target.dataset.current;
    // if (this.data.currentTab == current || current === undefined) return;
    this.setData({
      currentTab: e.target.dataset.current,
    });
    this.getShopList(e.target.dataset.id)

  },
  handleSwiperChange(e) {
    this.setData({
      currentTab: e.detail.current,
    });
    this.getScrollLeft();
    console.log(e);
    this.getShopList(this.data.tabListData[e.detail.current]._id)
  },
  getScrollLeft() {
    const query = wx.createSelectorQuery();
    query.selectAll(".item").boundingClientRect();
    query.exec((res) => {
      let num = 0;
      for (let i = 0; i < this.data.currentTab; i++) {
        num += res[0][i].width;
      }
      this.setData({
        sleft: Math.ceil(num),
      });
    });
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
  //跳转参加活动页面
  navToActivity(e){
    wx.switchTab({
      url: '/pages/activity/activity',
    })
  },
  //跳转商家入驻页面
  navToMerchantAccess(){
    // wx.navigateTo({
    //   url: '/pages/merchantAccess/merchantAccess',
    // })
    wx.cloud.callFunction({
      name:'merchantReview',
      data:{
        type:'select',
      },
      success:res=>{
        console.log(res);
        this.setData({
          merchantReview:res.result.data
        })
      }
    })
  },
  //跳转商品详情页
  navToDetail(id){
    wx.navigateTo({
      url:'/home/pages/shop/detail?id='+id.currentTarget.dataset.id,
    })
  },

  //获取类目接口
 async getCategray(){
   const res = await wx.cloud.callFunction({
      name:'category',
       data:{
         type:'select'
        },
      })
      this.setData({
        tabListData :res.result.data,
      })
      console.log(this.data.tabListData);
  },

  //调用商品列表接口
  async getShopList(categoryId){
      let res = await wx.cloud.callFunction({
        name:'shop',
        data:{
          type:'select',
          categoryId:categoryId
        },
    })
    // if(res.result.status == 200){
       // 请求成功后停止刷新加载的动画
      wx.hideNavigationBarLoading();
      // 停止下拉刷新
      wx.stopPullDownRefresh();
      if (res.result.data.length > 0 || res.result.data.status == 1) {
        this.setData({
          shopList : res.result.data
        })
        console.log(this.data.shopList);
      } else if(res.result.data.status == 0){
        // 没有数据了
        console.log('没有数据了');
      // }
    }
     
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    await this.getCategray();
    // console.log(this.data.tabListData);
    await this.getShopList(this.data.tabListData[0]._id);
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
    this.navToMerchantAccess();
    this.setData({
      isLogin:app.globalData.isLogin
    })
    this.data.isLogin=app.globalData.isLogin
    console.log(this.data.isLogin);
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
    // 在当前页面显示导航条加载动画
    wx.showNavigationBarLoading();
    // 下拉刷新后，清空商品列表数组
    this.setData({
      shopList: [],
    });
    // 重新发起请求
    if(this.data.tabListData[0]._id){
      this.getShopList(this.data.tabListData[0]._id);
      wx.showToast({
        title: '刷新成功',
        duration: 1000,
      })
    }else{
      wx:wx.showToast({
        title: '刷新失败',
        duration: 1000,
      })
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    console.log("上拉加载....");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})