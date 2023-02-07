const select = require('./select/index');
const add = require('./add/index');

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'select':
      return await select.main(event, context);

      case 'add':
        return await add.main(event, context);
  }
};
