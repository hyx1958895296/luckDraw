// components/calender/calender.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    signedList: {
      type: Array,
      value: [],
      observer(newData, oldData) {
        let list = []
        for (let index = 0; index < newData.length; index++) {
          let element = newData[index];
          element = new Date(this.formatIosDate(element))
          element = this.formatTime(element)
          list.push(element)
        }
        console.log(list);
        this.setData({
          formatSignedList: list
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    weekList: ['一', '二', '三', '四', '五', '六', '日'], // 周列表
    monthDayList: [], // 当月的日列表
    currentYear: '', // 当前年
    currentMonth: '', // 当前月
    currentDay: '', // 当前日
    today: '', // 今日
    selectedDate: '',
    formatSignedList: [], // 将签到日期格式化
    isDisabledNextMonth: true, // 是否能跳转下一个月
  },
  observers: {
    currentMonth() {
      const today = new Date()
      const todayYear = today.getFullYear()
      const todayMonth = today.getMonth() + 1
      if (this.data.currentYear > todayYear || (this.data.currentYear == todayYear && this.data.currentMonth >= todayMonth)) {
        this.setData({
          isDisabledNextMonth: true
        })
      } else {
        this.setData({
          isDisabledNextMonth: false
        })
      }
    }
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    created: function () {
      // 组件实例刚刚被创建时
    },
    ready: function () {
      // 在组件布局完成后执行
      this.initCurrentDate()
    },
    moved: function () {
      // 在组件实例被移动到节点树另一个位置时执行
    },
    detached: function () {
      // 组件实例被从页面节点树移除时
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 格式化为兼容ios的格式
    formatIosDate(date) {
      return date.replace(/\-/g, '/')
    },
    // 格式化时间
    formatTime(date) {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()

      return [year, month, day].join('/')
    },
    // 十位数补0
    formatZero(number) {
      console.log(number)
      if (number < 10 && number > 0) {
        number = '0' + number
      }
      return number
    },
    // 初始化当前时间
    initCurrentDate(date) {
      let currentDate = date || new Date()
      let currentYear = currentDate.getFullYear()
      let currentMonth = currentDate.getMonth() + 1
      let currentDay = currentDate.getDate()
      // 传的日期为空默认今日
      if (!date) {
        const today = `${currentYear}/${currentMonth}/${currentDay}`
        this.setData({
          today: today
        })
      }

      this.setData({
        currentYear: currentYear,
        currentMonth: currentMonth,
        currentDay: currentDay
      }, () => {
        this.initMonthDayList()
      })
  },
  // 初始化当前月的日期列表
  initMonthDayList() {
    // 获取当月1号是周几
    let date = new Date(this.data.currentYear, this.data.currentMonth, 1)
    let weekDay = date.getDay() + 1

    // 获取当月的总天数
    let monthFirstDay = new Date(this.data.currentYear, this.data.currentMonth, 0)
    let monthDay = monthFirstDay.getDate()
    console.log('----------我是初始化每一月的天数--------')
    let list = []
    console.log(monthDay)
    for (let index = 0; index < weekDay - 1; index++) {
      list.push(null)
    }
    for (let index = 1; index <= monthDay; index++) {
      const itemDate = `${this.data.currentYear}/${this.data.currentMonth}/${index}`
      let item = {
        day: index,
        date: itemDate // 具体日期
      }
      list.push(item)
    }
    this.setData({
      monthDayList: list
    })
  },
  // 签到的方法
  signIn(){
    this.data.formatSignedList.push(this.data.today);
    this.data.formatSignedList = [...new Set(this.data.formatSignedList)];
    this.setData({
      formatSignedList:this.data.formatSignedList
    })
  },
   // 选中当前日期
   handleSelectDate(event) {
    console.log(event);
    const item = event.currentTarget.dataset.item
    if (item) {
      this.setData({
        selectedDate: item.date
      })
    }
  },
      // 上一月
      handlePreMonth() {
        this.handleToggleMonth(-1)
      },
      // 下一月
      handleNextMonth() {
        if (!this.data.isDisabledNextMonth) {
          this.handleToggleMonth(1)
        }
      },
      // 切换月
      handleToggleMonth(data) {
        let month = this.data.currentMonth += data
        let year = this.data.currentYear
        if (month <= 0) {
          month = 12
          year--
        } else if (month > 12) {
          month = 1
          year++
        }
        this.setData({
          currentYear: year,
          currentMonth: month
        }, () => {
          this.initMonthDayList();
          this.triggerEvent('change', { date: `${year}/${month}` })
        })
      }
}
})
