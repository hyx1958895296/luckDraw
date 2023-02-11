Component({
  /**
   * 组件的属性列表
   */
  // 父组件的参数
  properties: {
    activityInfo: Object
  },




  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      console.log(this.data.activityInfo);
      let startTime = this.handleTime(this.data.activityInfo.startTimeStamp);
      let endTime = this.handleTime(this.data.activityInfo.endTimeStamp);
      console.log(startTime);
      console.log(endTime);
      this.setData({
        startTime: startTime,
        endTime: endTime
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
    endTime: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTime(time) {
      let newTime = new Date(time).getFullYear() +
        '年' +
        (new Date(time).getMonth() + 1) +
        '月' +
        new Date(time).getDate() +
        '日' +
        new Date(time).getHours() +
        '点' +
        new Date(time).getMinutes() +
        '分';

      return newTime
    },
  },
})