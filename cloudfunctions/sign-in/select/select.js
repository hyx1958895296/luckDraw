const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

exports.main = async (event, context) => {
  let wxContent = cloud.getWXContext();
  console.log(wxContent.OPENID);
 let selectResult = await db.collection('sign-in').where({
  OPENID: wxContent.OPENID,
}).get();
console.log(selectResult);
if (selectResult.data.length) {
   return {
      status:1,
      msg:"查询成功",
      data:selectResult.data
   }
}else{
  return {
    status:0,
    msg:"查询失败，请重试",
    data:[]
 }
}
};
