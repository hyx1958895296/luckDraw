# 云开发 quickstart

这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力：

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

# 项目简介
- 这是一个抽奖的小程序，给商家提供抽奖活动，为商家引流，给用户提供免费抽奖获得奖品，以及用积分兑换商品，在为商家引流的同时，吸引用户长时间使用小程序。

# 项目启动
- 通过git拉下项目，导入到微信开发者工具 打开。

# 项目模块 
## 首页
    负责人  郝永祥

    头部图标导航，引导用户更快的上手小程序。
    1. 每日签到 点击后跳转到签到页面
    2. 商家入驻 点击后跳转到商家入驻页面
    3. 获取积分 点击后跳转到活动页面
    4. 兑换商城 点击后页面向下滑停留到商品部分

    下半部分是可以兑换的商品
    tab切换商品类目
        推荐商品
        猜你喜欢
        家具日用
        电子产品
        鞋包服饰
        美妆饰品
    
### 用户喜好
    在进入首页时，如果没有设置弹窗让用户设置。根据用户设置的喜好，优先推荐用户坑你喜欢的商品，从而引导用户更积极的参加活动获取积分。

## 活动
    负责人  朱江艳

### 活动列表
    所有发起的抽奖在这里展示，已结束的不展示。
    1、最上方留有固定的位置，展示即将开奖的那条活动。
    2、其余按照开奖时间排序。
    3、侧边按钮 即将开奖  点击后跳转

### 活动详情 
    兑换奖品按钮 
    奖品图展示
    规则
    客服
    分享
    参加活动按钮
    活动进度条

## 我的
    负责人  尚宇豪

### 用户信息
    头像 微信头像
    昵称 微信昵称   头像昵称不可修改 只做展示
    会员 点击后跳转到会员页面
    积分 只做展示
    去兑换奖品  点击后跳转到首页并滑动到商品位置

### 宫格 
    参与抽奖 
    中奖记录
    兑换记录

### 列表部分
    商家入驻 未入驻的用户才显示  点击后跳转到填写商家信息页面 
    审核商家 只有管理员才能查看
    商务合作 
    常见问题  
    意见反馈 
