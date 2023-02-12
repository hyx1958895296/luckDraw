// home/pages/userHobby/userHobby.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hobbyList:[
      {
        id:1,
        iconUrl:'../../../images/icon-star.png',
        title:'明星',
        isSelected:false
      },
      {
        id:2,
        iconUrl:'../../../images/icon-film.png',
        title:'影视',
        isSelected:false
      },
      {
        id:3,
        iconUrl:'../../../images/icon-musical.png',
        title:'音乐',
        isSelected:false
      },
      {
        id:4,
        iconUrl:'../../../images/icon-parental.png',
        title:'亲子',
        isSelected:false
      },
      {
        id:5,
        iconUrl:'../../../images/icon-parental.png',
        title:'声控',
        isSelected:false
      },
      {
        id:6,
        iconUrl:'../../../images/icon-parental.png',
        title:'读书',
        isSelected:false
      },
      {
        id:7,
        iconUrl:'../../../images/icon-parental.png',
        title:'街舞',
        isSelected:false
      },
    ],
    sexIndex:'0',
    pathChoose:false
  },
  sexSelect(e){
    this.setData({sexIndex:e.currentTarget.dataset.sexindex})
  },
  
  hobbySelect(e){
    var index=e.currentTarget.dataset.index;
    var item=this.data.hobbyList[index];
    item.isSelected=!item.isSelected;
    this.setData({
      hobbyList:this.data.hobbyList
    })
    
  },
  save(){
    wx.navigateBack({
      delta: 1
    })
  },
  skip(){
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
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