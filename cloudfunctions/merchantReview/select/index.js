const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
  let { OPENID } = cloud.getWXContext();
   let selectResult = await db.collection('business-info').where({
    openid: OPENID,
  }).get();
  if(selectResult.data.length){
    return {
      status:1,
      msg:"success",
      data:selectResult.data[0]
    }
  }else{
    return {
      status:0,
      msg:"error",
      data:{}
    }
  }
};