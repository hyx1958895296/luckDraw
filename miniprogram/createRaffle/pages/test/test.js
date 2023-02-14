 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabsList: [{
      id: 1,
      value: "未开始",
      isActive:true
    }, {
      id: 2,
      value: "已开始",
      isActive:false
    }]
  },

  // 获取从子组件传回来的数据
  getTabsItemChange (e) {
    // 1 获取传过来的被点击的标题索引
    const { index } = e.detail;
    // 2 修改顶部横向tabs切换栏目 源数组
    // 拿到data中叫做 tabsList 数据，复制出一份用来修改
    let { tabsList } = this.data;
    // 通过循环，将当前传过来的index的tabs的isActive设置为true，就有选中的样式了
    tabsList.forEach((item, i) =>
      i === index ? (item.isActive = true) : (item.isActive = false)
    );
    // 3 赋值修改过后的数据到data中本来的tabs数据源
    this.setData({
      tabsList,
      // 等价于===》tabsList:tabsList  (同名变量可以简写)
    });
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