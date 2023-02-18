const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();
const _ = db.command;

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {

  // 返回数据库查询结果
  let {
    OPENID
  } = cloud.getWXContext();

  const result = await db.runTransaction(async transaction => {

    let selectRes = await transaction.collection('userInfo').where({
      openid: OPENID
    }).get();

    let selectShop = await transaction.collection('shop').where({
      _id: event.shopId
    }).get();

    let user = selectRes.data[0];
    let shop = selectShop.data[0];

     if(selectRes.data.length && selectShop.data.length){
      let updateRes = await transaction.collection('shop').where({
        shopItemPrice: _.lte(user.goldCoin),
        _id: event.shopId
      }).update({
        data: {
          count: _.inc(-1)
        },
      })
         
      if(updateRes.stats.updated){
        let updateUserInfo = await transaction.collection('userInfo').where({
          openid: OPENID
        }).update({
          data: {
            goldCoin: _.inc(-shop.shopItemPrice)
          },
        })
        
        if(updateUserInfo.stats.updated){
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
      }else{
        return {
          status:0,
          msg:"error",
          data:[]
        }
      }
     }else{
       return {
         status:0,
         msg:"error",
         data:[]
       }
     }
  })

  console.log(result);

  return result;

}