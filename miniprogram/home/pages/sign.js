import $ from '../../assets/utils/fun'
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo:'',
    hasUserInfo:false,
    score:'20',
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    isToday: 0,
    isTodayWeek: false,
    todayIndex: 0,
    // 当前维度
    latitude: "",
    // 当前精度
    longitude: "",
    //此处应该是接口返回的数据，先模拟了一个
    yesDate: [20230201, 20230211, 20230212, 20230208],
    signinNow: false,
    noDate:[]
  },
  // 签到
  signIn() {
    let t = this;
    console.log('------我走了登录方法--------')
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userFuzzyLocation']) {
          t.getLocation();
        }else{
          wx.authorize({
            scope: 'scope.userFuzzyLocation',
            success(){
              t.getLocation();
            }
          })
        }
      }
    })
  },

  // 获取用户当前地理位置
  getLocation() {
    let t = this;
    console.log('----------获取用户地理位置-----------');
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        console.log('----------------进入了地理位置------------');
        console.log(res);
        var latitude = res.latitude
        var longitude = res.longitude
        t.setData({
          latitude: latitude,
          longitude: longitude
        });
        t.activeSign()
      },
      fail:(err)=>{
        console.log('-------我是东西-----')
        console.log(err);
      }
    })
  },

  // 是否可以签到
  activeSign() {
    let t = this;
    let nowdate = t.data.isToday;
    let dateArr = t.data.dateArr;
    let yesDate = t.data.yesDate;
    console.log('-----------这个是登录---------')
    for (var i = 0; i < dateArr.length; i++) {
      if (dateArr[i].isToday == nowdate) {
        dateArr[i].choose = true;
        yesDate.push(nowdate);
        $.successToast("签到成功")
        t.setData({
          signinNow: true,
          yesDate: yesDate
        })
      }
    };
    t.setData({
      dateArr: dateArr
    })
  },

  // 签到过
  alreadySign() {
    $.toast("今天已经签过到啦~");
  },

  // 已签到日期
  yesdate() {
    let t = this;
    let yesdate = t.data.yesDate;
    let dateArr = t.data.dateArr;
    for (var i = 0; i < dateArr.length; i++) {
      for (var j = 0; j < yesdate.length; j++) {
        if (dateArr[i].isToday == yesdate[j]) {
          dateArr[i].choose = true;
        }
      };
    }
    t.setData({
      dateArr: dateArr
    })
  },

  // 日历
  dateInit: function (setYear, setMonth) {
    let t = this;
    //全部时间的月份都是按0~11基准，显示月份才+1
    let dateArr = []; //需要遍历的日历数组数据
    let arrLen = 0; //dateArr的数组长度
    let now = setYear ? new Date(setYear, setMonth) : new Date();
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth() //没有+1方便后面计算当月总天数
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    let startWeek = new Date(year + ',' + (month + 1) + ',' + 1).getDay(); //目标月1号对应的星期
    let dayNums = new Date(year, nextMonth, 0).getDate(); //获取目标月有多少天
    let obj = {};
    let num = 0;
    if (month + 1 > 11) {
      nextYear = year + 1;
      dayNums = new Date(nextYear, nextMonth, 0).getDate();
    }
    arrLen = startWeek + dayNums;
    for (let i = 0; i < arrLen; i++) {
      if (i >= startWeek) {
        num = i - startWeek + 1 < 10 ? '0' + String(i - startWeek + 1) : String(i - startWeek + 1);
        obj = {
          isToday: '' + year + ((month + 1) < 10 ? "0" + (month + 1) : (month + 1)) + num,
          dateNum: num,
          weight: 5,
          choose: false
        }
      } else {
        obj = {};
      }
      dateArr[i] = obj;
    }
    t.setData({
      dateArr: dateArr
    })
    let nowDate = new Date();
    let nowYear = nowDate.getFullYear();
    let nowMonth = nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1) : (nowDate.getMonth() + 1);
    let nowWeek = nowDate.getDay();
    let getYear = setYear || nowYear;
    let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;
    if (nowYear == getYear && nowMonth == getMonth) {
      t.setData({
        isTodayWeek: true,
        todayIndex: nowWeek
      })
    } else {
      t.setData({
        isTodayWeek: false,
        todayIndex: -1
      })
    };
  },

   /**
   * 上月切换
   */
  lastMonth: function () {
    let t = this;
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = t.data.month - 2 < 0 ? t.data.year - 1 : t.data.year;
    let month = t.data.month - 2 < 0 ? 11 : t.data.month - 2;
    t.setData({
      year: year,
      month: (month + 1)
    })
    t.dateInit(year, month);
    t.yesdate()
  },
  /**
   * 下月切换
   */
  nextMonth: function () {
    let t = this;
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = t.data.month > 11 ? t.data.year + 1 : t.data.year;
    let month = t.data.month > 11 ? 0 : t.data.month;
    t.setData({
      year: year,
      month: (month + 1)
    })
    t.dateInit(year, month);
    t.yesdate()
  },

    //获取登录逻辑
    // async getUserProfile(){
    //   let _this = this;
    //   let res = await wx.getUserProfile({
    //     desc: '签到登录',
    //     success:res=>{
    //       this.setData({
    //         userInfo:res.userInfo,
    //         hasUserInfo:true
    //       })
    //       app.globalData.isLogin = true;
    //       _this.addUserInfo();
    //       _this.selectUserInfo();
    //       wx.showToast({
    //         title: '登录成功',
    //         mask:true,
    //         duration:2000,
    //       });
    //     }
    //   })
    // },
    // async addUserInfo(){
    //   let res = await wx.cloud.callFunction({
    //     name:"user",
    //     data:{
    //       type:"add",
    //       userInfo:this.data.userInfo
    //     }
    //   })
    // },
    // async selectUserInfo(){
    //   let _this = this;
    //   let res = await wx.cloud.callFunction({
    //     name:'user',
    //     data:{
    //       type:'select'
    //     },
    //     success:res=>{
    //       console.log(res);
    //       if(res.result.status == 1){
    //         _this.setData({
    //            userInfo:res.result.data
    //          })
    //        }
    //     }
    //   })
    // },
 
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    // await this.getUserProfile();  
    let t = this;
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1 < 10 ? "0" + String(now.getMonth() + 1) : now.getMonth() + 1;
    t.dateInit();
    t.setData({
      year: year,
      month: Number(month),
      isToday: '' + year + month + now.getDate()
    });
    t.yesdate()
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
    // this.selectUserInfo();
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