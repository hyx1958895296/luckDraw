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
        shopPrice: _.lte(user.goldCoin),
        count:_.gt(0),
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
            goldCoin: _.inc(-shop.shopPrice)
          },
        })
        
        if(updateUserInfo.stats.updated){
        shop.credential = Math.floor(Math.random()* 999999999999) + Math.floor(Math.random()* 99);
        shop.receiveTime =  Date.now() + 604800000;
            return {
              status:1,
              msg:"兑换成功",
              data:shop
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
          msg:"商品库存不足或积分不够",
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
  if(result == undefined){
    return {
      status:0,
      msg:"兑换失败",
      data:[]
    }
  }else{
    return result;
  }

}