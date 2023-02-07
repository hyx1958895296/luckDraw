const create = require('./create/index');
// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'create':    
    return await create.main(event, context);
  }
};
