// mine/pages/userInfo/userInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options:{
      name:'一颗光芒海',
      avatarUrl:'../../../images/bgd_img.png'
    },
    sex:['男','女']
  },
  setName(e){
    wx.navigateTo({
      // url: '../../pages/setName/setName?name='+e.currentTarget.dataset.name,
      url: '../../pages/setName/setName?name='+this.data.options.name,

    })
  },
  setHobby(){
    wx.navigateTo({
      url: '../../../home/pages/userHobby/userHobby',
    })
  },
  changeImage(){
    let _this=this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为 img 标签的 src 属性显示图片
        const tempFilePaths = res.tempFilePaths;
        _this.setData({
          'options.avatarUrl':tempFilePaths
        })
      }
    })
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
    wx.showModal({
      title: '提示',
      content: '性别只能选择一次,请慎重',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    })
  },
 
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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