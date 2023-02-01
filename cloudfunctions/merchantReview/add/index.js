const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
  console.log(event);
  return await db.collection('business-info').get();
  // 返回数据库查询结果
  // db.collection('business-info').add({
  //   data: {
  //     // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
  //     description: "learn cloud database",
  //     due: new Date("2018-09-01"),
  //     tags: [
  //       "cloud",
  //       "database"
  //     ],
  //     // 为待办事项添加一个地理位置（113°E，23°N）
  //     location: new db.Geo.Point(113, 23),
  //     done: false
  //   },
  //   success: function (res) {
  //     // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
  //     console.log(res)
  //   }
  // })
};