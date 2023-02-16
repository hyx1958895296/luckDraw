const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
  // 返回数据库查询结果
    if(!event.status) return { status:0,msg:"",data:[] };
  let selectResult  = await db.collection('activity').where({
    status:event.status
  }).get();
     
    if(selectResult.data.length){
      return {
        status:1,
        msg:"success",
        data:selectResult.data
      }
    }else{
      return {
        status:0,
        msg:"success",
        data:[]
      }
    }

};
