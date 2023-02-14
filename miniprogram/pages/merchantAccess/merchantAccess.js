// pages/merchantAccess/merchantAccess.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    printingLicenceUrl: "",
    localShowImage:"",
    settleInForm: {
      storeName: "",
      phone: "",
      name: "",
      address: [],
      detailedAddress: "",
    },
    isAgreement: false
  },

  bindRegionChange(e){
    this.setData({
      ['settleInForm.address']:e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  checkboxFn(e) {
    if (e.detail.value.length) {
      this.setData({
        isAgreement: true
      })
    }else{
      this.setData({
        isAgreement: false
      })
    }
  },

  checkBusinessInfo() {
    let {
      storeName,
      phone,
      name,
      address,
      detailedAddress
    } = this.data.settleInForm;
    if (!storeName.length || !phone.length || !name.length || !address.length || !this.data.printingLicenceUrl.length || !detailedAddress.length) {
         return true;
    }
  },

  async submitstoreInfo() {
    if (this.checkBusinessInfo()) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'error'
      })
    } else {
      if (this.data.isAgreement) {
        this.data.settleInForm.printingLicenceUrl = this.data.printingLicenceUrl;
        let res = await  wx.cloud.callFunction({
          name: "merchantReview",
          data: {
            type: "add",
            businessInfo: this.data.settleInForm
          },
        })
        if(res.result.status == 1){
          wx.switchTab({
            url: '/pages/mine/mine',
          })
        }else{
           wx.showToast({
            title: res.result.msg,
            icon:"error"
          })
        }
      } else {
        wx.showToast({
          title: '请同意入驻协议',
          icon: 'error'
        })
      }
    }
  },

  storeNameInput(e) {
    this.data.settleInForm.storeName = e.detail.value;
  },

  phoneInput(e) {
    this.data.settleInForm.phone = e.detail.value;
  },



  detailedAddressInput(e) {
    this.data.settleInForm.detailedAddress = e.detail.value;
  },

  nameInput(e) {
    this.data.settleInForm.name = e.detail.value;
  },

  upLoadImage() {
    let _this = this;
    wx.chooseMedia({
      count: 1,
      success(res) {
        _this.setData({
          localShowImage:res.tempFiles[0].tempFilePath
        })
        let po = res.tempFiles[0].tempFilePath.lastIndexOf(".");
        let ext = res.tempFiles[0].tempFilePath.slice(po);
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + ext,
          filePath: res.tempFiles[0].tempFilePath,
          success(res) {
            _this.setData({
              printingLicenceUrl: res.fileID
            })
          }
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