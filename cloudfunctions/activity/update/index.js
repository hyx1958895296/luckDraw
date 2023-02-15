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
    let timeStamp = Date.parse("2023-2-15 18:30");
    console.log(timeStamp);
  //  let selectResult =  await db.collection('activity').where({

  // }).get();

  // let updateResult = await db.collection('activity').doc('todo-identifiant-aleatoire').update({
  //   // data 传入需要局部更新的数据
  //   data: {
  //     // 表示将 done 字段置为 true
  //     done: true
  //   },
  // })

};