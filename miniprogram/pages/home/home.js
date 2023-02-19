// pages/home/home.js
import {
  backgroundColorTop
} from '../../util/backgroundColorTop'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabsList: [{
      id: 0,
      value: "猜你喜欢",
    }, {
      id: 1,
      value: "推荐商品",
    }],
    isLoaded: false,
    shopList: [],

    //是否登录
    isLogin: true,

    // loding
    loding: 0,
    isLodingTabs:true,
    isLoding:true,
    // nav
    navs: [{
      id: 1,
      icon: '../../images/icon-sign.png',
      lable: '每日签到',
      url: '/home/pages/sign',
      isShow: true,
    }, {
      id: 2,
      icon: '../../images/icon-activity_home.png',
      lable: '参加活动',
      url: '/pages/activity/activity',
      isShow: true,
    }, {
      id: 3,
      icon: '../../images/icon-business.png',
      lable: '商家入驻',
      url: '/pages/merchantAccess/merchantAccess',
      isShow: true,
    }, {
      id: 4,
      icon: '../../images/icon-launch.png',
      lable: '发起活动',
      url: 'createRaffle/pages/createRaffle/createRaffle',
      isShow: true,
    }, ],
    // tabs类目
    tabListData: [],
    // tabs选中
    tabsActive: 0
  },

  handleTabChange(e) {
    // let { current } = e.target.dataset.current;
    // if (this.data.currentTab == current || current === undefined) return;
    this.setData({
      currentTab: e.target.dataset.current,
    });
    this.getShopList(e.target.dataset.id)


  },
  handleSwiperChange(e) {
    this.setData({
      currentTab: e.detail.current,
    });
    this.getScrollLeft();
    this.getShopList(this.data.tabListData[e.detail.current]._id)

  },
  getScrollLeft() {
    const query = wx.createSelectorQuery();
    query.selectAll(".item").boundingClientRect();
    query.exec((res) => {
      let num = 0;
      for (let i = 0; i < this.data.currentTab; i++) {
        num += res[0][i].width;
      }
      this.setData({
        sleft: Math.ceil(num),
      });
    });
  },

  onload(e) {
    console.log(e);
    let count = this.data.loding + 1
    this.setData({
      loding:count
    })
    // this
    if(this.data.shopList.length == this.data.loding){
      this.setData({
        isLodingTabs:false,
      })
    }
  },

  // tabs
  onMyEvent(e) {
    this.getShopList(this.data.tabListData[e.detail - 1]._id)
  },

  //获取更多积分
  navagitorToActivity() {
    wx.switchTab({
      url: '/pages/activity/activity',
    })
  },

  // 跳转
  navigateTo(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.item.url,
    })
  },

  // tab跳转
  switchTab() {
    if (!isLogin) {
      wx.switchTab({
        url: e.currentTarget.dataset.item.url,
      })
    }
  },

  //获取用户是否入驻商家
  async navToMerchantAccess() {
    let res = await wx.cloud.callFunction({
      name: 'merchantReview',
      data: {
        type: 'select',
      },
    })
    if (res.result.status) {
      if (res.result.data.status == 1) {
        this.setData({
          ['navs[2]']: false,
          ['navs[3]']: false,
        })
      } else if (res.result.data.status == 2) {
        this.setData({
          ['navs[2]']: false,
        })
      } else if (res.result.data.status == 3) {
        this.setData({
          ['navs[3]']: false,
        })
      }
    } else {
      this.setData({
        ['navs[3]']: false,
      })

    }
  },

  //跳转商品详情页
  navToDetail(id) {
    wx.navigateTo({
      url: '/home/pages/shop/detail?id=' + id.currentTarget.dataset.id,
    })
  },

  //获取类目接口
  async getCategray() {
    const res = await wx.cloud.callFunction({
      name: 'category',
      data: {
        type: 'select'
      },
    })
    if (res.result.status) {
      let arr = [];
      // 处理数据
      res.result.data.map(item => JSON.stringify(item).replace(/title/g, 'value')).
      map(item => JSON.parse(item)).
      forEach((item, index) => {
        item['id'] = index;
        arr.push(item)
      });
      this.setData({
        tabListData: arr
      })
    }

  },

  //调用商品列表接口
  async getShopList(categoryId) {
    let res = await wx.cloud.callFunction({
      name: 'shop',
      data: {
        type: 'select',
        categoryId: categoryId
      },
    })
    if (res.result.status) {
      this.setData({
        shopList: res.result.data,
        isLoding:false
      })
    }
  },

  // 查询用户是否登录
  async getUserInfo() {
    let res = await wx.cloud.callFunction({
      name: 'user',
      data: {
        type: 'select'
      }
    });
    if (res.result.status) {
      await this.navToMerchantAccess();
    } else {

    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    // 获取商品类目
    await this.getCategray();

    // 获取商品列表
    await this.getShopList(this.data.tabListData[this.data.tabsActive]._id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {

    // 查询用户是否登录
    await this.getUserInfo()

    wx.setBackgroundColor({
      backgroundColorTop: 'red'
    })
    this.setData({
      isLogin: app.globalData.isLogin
    })
    this.data.isLogin = app.globalData.isLogin
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
    // 下拉刷新后，清空商品列表数组
    this.setData({
      shopList: [],
    });
    // 重新发起请求
    if (this.data.tabListData[0]._id) {
      this.getShopList(this.data.tabListData[0]._id);

      wx.showToast({
        title: '刷新成功',
        duration: 1000,
      })
    } else {
      wx: wx.showToast({
        title: '刷新失败',
        duration: 1000,
      })
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})