// pages/commonTopics/commonTopics.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    localShowImage: [],
    imageList :[],
    msg:"",
    phoneValue:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  setMsg(e){
    this.setData({
      msg:e.detail.value
    })
  },

  setPhoneInput(e){
    this.setData({
      phoneValue:e.detail.value
    })
  },

  upImage() {
    let _this = this;
    let   arr     = [];
    wx.chooseMedia({
      count: 5,
      success(res) {
        _this.setData({
          localShowImage: res.tempFiles
        })
        res.tempFiles.forEach(image => {
          let po = image.tempFilePath.lastIndexOf(".");
          let ext = image.tempFilePath.slice(po);
          wx.cloud.uploadFile({
            cloudPath: new Date().getTime() + ext,
            filePath:  image.tempFilePath,
            success(res) {
               if(!res.fileID) return;
               arr.push(res.fileID)
               _this.setData({
                 imageList:arr
               })
            }
          })
        });
      }
    })
  },

  submit(){
     wx.cloud.callFunction({
       name:"feedBack",
       data:{
         type:"create",
         feedBackInfo:{
          comments:this.data.msg,
          phone:this.data.phoneValue,
          image:this.data.imageList
         }
       },
       success(res){
          if(res.result.status==1){
            wx.showToast({
              title: res.result.msg,
              icon:"none",
              duration:2000
            })
          }else{
            wx.showToast({
              title: res.result.msg,
              icon:"none",
              duration:2000
            })
          }
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