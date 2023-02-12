const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
  console.log(event);
  // 返回数据库查询结果
  let {
    OPENID
  } = cloud.getWXContext();

  let res = {
    status:0,
    msg:"参与失败",
    data:[]
  }
   event.raffleRecordInfo.openid = OPENID;
   let selectResult = await db.collection("raffleRecord").where({
       openid:event.raffleRecordInfo.openid,
       activityId:event.raffleRecordInfo.activityId
   }).get();
   if(selectResult.data.length){
          res.msg = "已参加过此活动"
   }else{
     if(!event.raffleRecordInfo.activityId) {
       res.msg = "活动id为空";
       return;
     }
    let createResult = await db.collection("raffleRecord").add({
      data: event.raffleRecordInfo
    })
    if(createResult._id){
        res.status = 1;
        res.msg = "参与抽奖成功"
    }
   }
 
  return res;
};