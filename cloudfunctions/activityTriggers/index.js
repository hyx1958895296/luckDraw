const cloud = require('wx-server-sdk');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();
const _ = db.command
exports.main = async (event, context) => {

    
    let start = ()=>{
      let nowTime = Date.now();
      return new Promise((resolve,reject)=>{
        db.collection('activity').where({
            startTimeStamp:_.lt(nowTime),
            status:1,
          }).update({
            data: {
              status: 2
            }
          });
      })
    }

    let end =()=>{
      let nowTime = Date.now();
      return new Promise((resolve,reject)=>{
        db.collection('activity').where({
          endTimeStamp:_.lt(nowTime),
          status: 2
        }).update({
          data: {
            status: 3
          }
        })
      })
    }

    return Promise.all([start(),end()]).then(res=>{
      return res;
    }).catch(err=>{
      return err;
    })

};