const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
  // 返回数据库查询结果

let {
  OPENID
} = cloud.getWXContext();

 let selectResult = await db.collection('userInfo').where({
  openid: OPENID,
}).get();
console.log(selectResult);
if (selectResult.data.length) {
   return {
      status:1,
      msg:"查询成功",
      data:selectResult.data[0]
   }
}else{
  return {
    status:0,
    msg:"查询失败，请重试",
    data:[]
 }
}
};
