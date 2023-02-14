// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
    传入给组件的数据
   */
  properties: {
    tabs: {
      // 类型
      type: Array,
      // 默认值
      value: []
    }
  },
 
  /**
   * 组件的初始数据
   */
  data: {  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 点击事件，点击tab栏不同项目时，触发
    handleItemTap (e) {
      // 1 获取点击的tab索引
      console.log(e)
      const { index } = e.currentTarget.dataset;
      // 2 触发 父组件中的事件，传递数据给父组件  把当前点击的index数据传给父组件
      this.triggerEvent("tabsItemChange", { index: index });
    }
  }
})