const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
  // 返回数据库查询结果

  let updatedRes = await db.collection('business-info').where({
    _id: event.businessInfoId,
  }).update({
    data:{
      status:event.status
    }
  });

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