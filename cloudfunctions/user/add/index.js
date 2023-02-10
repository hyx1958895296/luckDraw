const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
  // 返回数据库查询结果
  let {
    OPENID
  } = cloud.getWXContext();
  event.userInfo.openid = OPENID;
  let selectResult = await db.collection('userInfo').where({
    openid: OPENID,
  }).get();
  if (!selectResult.data.length) {
      event.userInfo.avatarUrl = "cloud://wllyun-dev-3gxie2dud70a3acf.776c-wllyun-dev-3gxie2dud70a3acf-1316269736/avator.png";
      event.userInfo.nickName = event.userInfo.nickName +  Math.round(Math.random()*999999);
      event.userInfo.goldCoin = 0;
      console.log(event.userInfo);
      await db.collection("userInfo").add({
      data: event.userInfo
    })
  }
};