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

  let selectArr = await db.collection('raffleRecord').aggregate()
    .lookup({
      from: 'activity',
      localField: "activityId",
      foreignField: "_id",
      as: "activityList"
    })
    .end();
  let mineActivity = selectArr.list.filter(item => item.openid == OPENID);
  if (mineActivity.length) {
    let data = [];
    mineActivity.forEach(item => {
      data = data.concat(item.activityList);
    });
    return {
      status: 1,
      msg: "success",
      data
    }
  } else {
    return {
      status: 0,
      msg: "error",
      data: []
    }
  }
};