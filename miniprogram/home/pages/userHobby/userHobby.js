// home/pages/userHobby/userHobby.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户兴趣列表
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
    // 用户性别
    sexIndex:'0',
    // 判断路径
    pathChoose:true
  },
  // 选择性别
  sexSelect(e){
    this.setData({sexIndex:e.currentTarget.dataset.sexindex})
  },
  // 选择兴趣
  hobbySelect(e){
    let index=e.currentTarget.dataset.index;
    let item=this.data.hobbyList[index];
    // 选中状态与未选中状态切换
    item.isSelected=!item.isSelected;
    this.setData({
      hobbyList:this.data.hobbyList
    })
  },
  // 保存
  save(){
    // 返回上一级页面
    wx.navigateBack({
      delta: 1
    })
  },
  // 返回
  returnPage(){
    wx.navigateBack({
      delta: 1
    })
  },
  // 跳过
  skip(){
    // 跳转
    wx.switchTab({
      url: '/pages/home/home',
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