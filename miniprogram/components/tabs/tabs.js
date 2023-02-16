// components/Tabs/Tabs.js
Component({
  // 预留给页面对样式重写
  externalClasses:['rewrite-tabs_title','bor-radius','bgc-fff'],

  /**
   * 组件的属性列表
    传入给组件的数据
   */
  properties: {
    tabsList: {
      // 类型
      type: Array,
      // 默认值
      value: []
    }
  },

  // 启用插槽
  options: {
    multipleSlots: true
  },

  /**
   * 组件的初始数据
   */
  data: {
    current: 0,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500
  },
  /**
   * 组件的方法列表
   */
  methods: {

    pagechange(e){
      
    },

    // 滑动到下一个
    eventhandle(e) {
      this.setData({
        current:e.detail.current
      })
    },
    // 点击切换
    active(e){
      this.setData({
        current:e.currentTarget.dataset.item.id
      });

    },
  }
})