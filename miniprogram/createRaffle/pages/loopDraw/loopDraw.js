// createRaffle/pages/loopDraw/loopDraw.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 开奖时间
    multiArray: [],
    multiIndex: [0, 0],
    //  循环次数
    multiArrayCount: [],
    multiIndexCount: '',
    dateList: [{
        active: false,
        title: '每周一',
      },
      {
        active: false,
        title: '每周二',
      },
      {
        active: false,
        title: '每周三',
      },
      {
        active: false,
        title: '每周四',
      },
      {
        active: false,
        title: '每周五',
      },
      {
        active: false,
        title: '每周六',
      },
      {
        active: false,
        title: '每周日',
      },
      {
        active: false,
        title: '全选',
      },
    ]
  },

  // 弹窗
  showModal() {
    this.setData({
      show: true
    })
  },
  hideModal() {
    this.setData({
      show: false
    })
  },

  // 选择item
  active(e) {
    let index = e.target.dataset.item;
    let item =  this.data.dateList[index];
    let allIndex = 0;
    this.data.dateList.forEach((item,index)=> {
      if(item.title == "全选"){
        allIndex= index;
      }
    });
    if(item.title != "全选"){
      if(item.active){
        this.setData({
          [`dateList[${index}].active`] : false,
          [`dateList[${allIndex}].active`] : false,
        })
      }else{
        this.setData({
          [`dateList[${index}].active`] : true
        })
        let is = this.data.dateList.find(item=> item.active == false && item.title!= '全选');
        if(is == undefined){
          this.setData({
            [`dateList[${allIndex}].active`] : true,
          })
        }
      }
    }else{
       if(item.active){
        this.data.dateList.forEach((item,index) => {
          this.setData({
            [`dateList[${index}].active`] : false
          })
        });
       }else{
        this.data.dateList.forEach((item,index) => {
          this.setData({
            [`dateList[${index}].active`] : true
          })
        });  
       }
    }
  },

  // picker选择器
  bindMultiPickerChange(e) {
    this.setData({
      multiIndex: e.detail.value,
    })
  },
  bindMultiPickerChangeCount(e) {
    console.log(e)
    this.setData({
      multiIndexCount:Number(e.detail.value)+2
    })
  },

  // 处理时间选择器的数据
  time() {
    let hours = [];
    for (let index = 0; index < 24; index++) {
      hours.push(index + '时')
    };
    let minutes = [];
    for (let index = 0; index < 60; index++) {
      minutes.push(index + '分')
    }
    let count = [];
    for (let index = 2; index < 29; index++) {
      count.push(index+'次')    
    }
    console.log(count)
    this.setData({
      multiArray: [
        hours,
        minutes
      ],
      multiArrayCount:[
        count
      ]
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.time()
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