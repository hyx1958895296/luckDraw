const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
  // 返回数据库查询结果
  console.log(1);
   console.log(event);
   let selectResult = await db.collection('business-info').where({
    _id: event.businessInfoId,
  }).get();
  
  if(selectResult.data.length){
     return {
       status:1,
       msg:"查询成功",
       data:selectResult.data[0]
     }
  }else{
    return {
      status:0,
      msg:"error",
      data:[]
    }
  }

};
