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
  let updatedRes = await db.collection('userInfo').where({
    openid: OPENID,
  }).update({
    data:{
      ...event.userInfo
    }
  });

    console.log(updatedRes);
    if(updatedRes.stats.updated){
      return {
        status:1,
        msg:"success",
        data:[]
      }
    }else{
      return {
        status:0,
        msg:"error",
        data:[]
      }
    }
 
};