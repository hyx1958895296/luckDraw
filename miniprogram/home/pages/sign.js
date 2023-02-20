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
    // 当前纬度
    latitude: "",
    // 当前经度
    longitude: "",
    //此处应该是接口返回的数据，先模拟了一个
    yesDate: [],
    //今日是否登录
    signinNow: false,
    //未签到的天数
    noDate:[],
    //是否登录过
    isLogin:false,
    //模态框
    flag:false,
    //是否已经签到  1签到   2未签到
    signed:1,
    //获取现在的年
    yearNow:'',
    //获取现在的月
    monthNow:'',
    //获取现在的日
    dayNow:''
  },
//兑换商品
  goExchange(){
      wx.switchTab({
        url: '/pages/home/home',
      })
  },

//关闭模态框
  closeModelBox(){
    this.setData({
      flag:false
    })
  },

  // 签到
  signIn() {
    console.log(this.data.userInfo);
    let t = this;
        if(this.data.userInfo.avatarUrl && this.data.userInfo.nickName){
        wx.getSetting({
          success(res){
            if(res.authSetting['scope.userLocation']){
              t.getLocation();
            }else{
              wx.authorize({
                scope: 'scope.userLocation',
                success(){
                  t.getLocation();
                }
              })
            }
          }
        })
        t.signInApi();
        t.activeSign();
      }else{
        this.getUserProfile();
        t.signInApi();
      }
  },
  //调用签到接口   添加
  signInApi(){
    let _this = this;
    _this.activeSign();
    wx.cloud.callFunction({
      name:"sign-in",
        data:{
          type:"add",
          signIn:{
            getScore:20,
            signed:1,
            yesDate:_this.data.yesDate
          }
        },
        success:(res)=>{
          console.log(res);
        }
    })
  },

  //调用签到接口   查询
  async signInSelectApi(){
    let that = this;
    // console.log(that.data.userInfo.openid);
     await wx.cloud.callFunction({
      name:'sign-in',
      data:{
        type:'select',
        openid:that.data.userInfo.openid
      },
      success:(res)=>{
        console.log(res);
        let selectRes = res.result.data
        console.log('------我是签到的时间--------')
        console.log(res);
        if(selectRes){
          selectRes.forEach(item=>{
            that.setData({
              yesDate : item.yesDate
            })
            console.log(that.data.yesDate[0]);
            if(that.data.isToday == that.data.yesDate){
              that.data.signinNow = true;

            }else{
              that.data.signinNow = false;
            }
          })
        }
      }
    })
  },

  // 获取用户当前地理位置
  getLocation() {
    let that = this;
    console.log('----------获取用户地理位置-----------');
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        console.log('----------------进入了地理位置------------');
        console.log(res);
        var latitude = res.latitude;
        var longitude = res.longitude;
        that.setData({
          latitude: latitude,
          longitude: longitude
        });
        that.activeSign()
      },
      fail:(err)=>{
        console.log('-------我是东西-----')
        console.log(err);
      }
    })
  },

  // 是否可以签到
  activeSign() {
    let that = this;
    let nowdate = that.data.isToday;
    let dateArr = that.data.dateArr;
    let yesDate = that.data.yesDate;
    for (var i = 0; i < dateArr.length; i++) {
      if (dateArr[i].isToday == nowdate) {
        dateArr[i].choose = true;
        yesDate.push(nowdate);
        setTimeout(() => {
          this.setData({
            flag:true
          })
        });
        that.setData({
          signinNow: true,
          yesDate: yesDate,
        })
        this.data.yesDate = this.data.yesDate.filter((item, index, array) => {
          return array.indexOf(item) === index
        })
      }
    };
    
    that.setData({
      dateArr: dateArr
    })
},

  // 签到过
  alreadySign() {
    this.setData({
      signinNow:true
    })
    $.toast("今天已经签过到啦~");
  },

  // 已签到日期
  yesdate() {
    let that = this;
    let yesdate = that.data.yesDate;
    let dateArr = that.data.dateArr;
    for (var i = 0; i < dateArr.length; i++) {
      for (var j = 0; j < yesdate.length; j++) {
        if (dateArr[i].isToday == yesdate[j]) {
          dateArr[i].choose = true;
          yesDate.push(that.data.isToday);
        }
      };
    }
    that.setData({
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
  // 获取用户登录信息
    async selectUserInfo(){
      let _this = this;
      let res = await wx.cloud.callFunction({
        name:'user',
        data:{
          type:'select'
        },
        success:res=>{
          console.log('selectUserInfo',res);
          if(res.result.status == 1){
            _this.setData({
               userInfo:res.result.data
             })
             _this.addUserInfo();
          }else{
            this.getUserProfile();
          }
        }
      })
    },
//把登录信息添加到数据库
    addUserInfo(){
      wx.cloud.callFunction({
        name:"user",
        data:{
          type:"add",
          userInfo:this.data.userInfo
        },
        success:(res)=>{
          console.log(res);
        },
        fail:(err)=>{
          console.log(err);
        }
      })
    },

    //登录逻辑
    getUserProfile() {
      let _this = this;
      if (app.globalData.isLogin) return;    
      wx.getSetting({
        success(res) {
          if (res.authSetting["scope.userInfo"]) {
            wx.getUserProfile({
              desc: '用户授权',
              success: (res) => {
                _this.setData({
                  userInfo:res.userInfo,
                  hasUserInfo: true,
                });
                app.globalData.isLogin = true;
              }
            })
          } else {
            wx.openSetting();
          }
        }
      })
    },
    
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.signInSelectApi();
    // if(this.data.yesDate == this.data.isToday){
    //   wx.showToast({
    //     title: '今日已签到',
    //   })
    // }else{
    //   wx.showToast({
    //     title: '今日未签到',
    //   })
    // }
    this.selectUserInfo();
    // this.signInSelectApi();
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
    this.activeSign();
    // console.log(this.data.isToday);
    // console.log('------------我是日期的数组----')
    // console.log(this.data.dateArr)
    // console.log('----------我是签到的数组---------')
    // console.log(this.data.yesDate);
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