const add = require('./add/index');
const select = require('./select/index')
// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'add':    
    return await add.main(event, context);

    case 'select':    
    return await select.main(event, context);
  }
};
