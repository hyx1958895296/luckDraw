const cloud = require('wx-server-sdk');

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
      msg: "反馈失败，请重新再试",
      data: []
    }
  event.feedBackInfo.openid = OPENID;
  let addresult = await db.collection('feedBack').add({
    data: event.feedBackInfo,
  })
  if(addresult._id){
     res.status=1;
     res.msg="意见反馈成功,我们会加快处理"
  }
  return res;
};