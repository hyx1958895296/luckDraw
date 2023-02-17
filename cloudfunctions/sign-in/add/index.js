const cloud = require('wxyun-dev');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
  let {
    OPENID
  } = cloud.getWXContext();
  // 返回数据库查询结果
  let res = {
      status: 0,
      msg: "未签到",
      data: []
    }
  event.signIn.openid = OPENID;
  event.signIn.status = 1;
  let addresult = await db.collection('sign-in').add({
    data: event.signIn,
  })
  if(addresult._id){
     res.status=1;
     res.msg="已签到"
  }
  return res;
};