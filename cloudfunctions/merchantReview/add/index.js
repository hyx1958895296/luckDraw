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
      msg: "",
      data: []
    }
  event.businessInfo.openid = OPENID;
  event.businessInfo.status = 1;
  let addresult = await db.collection('business-info').add({
    data: event.businessInfo,
  })
  if(addresult._id){
     res.status=1;
     res.msg="已提交，审核中"
  }
  return res;
};