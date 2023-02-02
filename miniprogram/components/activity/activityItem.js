// components/activity/activityItem.js
Component({
  /**
   * 组件的属性列表
   */
  // 父组件的参数
  properties: {
    activity: Object
  },

  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      console.log(this.data.activity.startTime);
      let tiem = this.data.activity.startTime.slice(0, 4) + '年' +
        (this.data.activity.startTime.slice(5, 7).replace(/^0/, '')) + '月'+
        (this.data.activity.startTime.slice(8,10).replace(/^0/, ''))+'日'+
        (this.data.activity.startTime.slice(11,19)).replace(/^0/,'')+'开始';
      console.log(tiem)
      this.setData({
        startTime: tiem
      })

    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    startTime: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
})