// home/pages/sign.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo:'',
    hasUserInfo:false,
    score:'20'
  },

    //获取登录逻辑
    getUserProfile(){
      let _this = this;
      wx.getUserProfile({
        desc: '签到登录',
        success:res=>{
          this.setData({
            userInfo:res.userInfo,
            hasUserInfo:true
          })
          app.globalData.isLogin = true;
          _this.addUserInfo();
          _this.selectUserInfo();
          let loding = setTimeout(()=>{
            _this.setData({
              isLoding:false
            })
            clearTimeout(loding);
            wx.showToast({
              title: '登录成功',
              mask:true,
              duration:2000,
            });
          },2000);
        }
      })
    },
    addUserInfo(){
      wx.cloud.callFunction({
        name:"user",
        data:{
          type:"add",
          userInfo:this.data.userInfo
        }
      })
    },

    selectUserInfo(){
      let _this = this;
      wx.cloud.callFunction({
        name:'user',
        data:{
          type:'select'
        },
        success:res=>{
          console.log(res);
          if(res.result.status == 1){
            _this.setData({
               userInfo:res.result.data
             })
           }
        }
      })
    },
  //日历逻辑
    // 切换月 设置已签到的日期
    handleChangeMonth(event) {
  	// 传过来的日期格式为 2022/6
    let yearMonth = event.detail.date
    let list = []
    this.setData({
      signedList: list
    })
  },
  //签到的方法
    signIn(){
      this.data.formatSignedList.push(this.data.today);
      this.data.formatSignedList = [...new Set(this.data.formatSignedList)];
      this.setData({
        formatSignedList:this.data.formatSignedList
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getUserProfile();
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
    this.selectUserInfo();
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