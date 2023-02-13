const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
  console.log(event);
  // 返回数据库查询结果
  let {
    OPENID
  } = cloud.getWXContext();
  let res = {
    status:0,
    msg:"发起抽奖失败，请重试",
    data:[]
  }
  event.activityInfo.openid = OPENID;
  event.activityInfo.peopleCount = 0;
  let createResult = await db.collection("activity").add({
    data: event.activityInfo
  })

  if(createResult._id){
      res.status = 1;
      res.msg = "发起活动成功"
  }
  return res;
};