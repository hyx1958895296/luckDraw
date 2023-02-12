const create = require("./create/index");
const select = require("./select/index");
const selectNumber = require('./selectNumber/index')
// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'select':
      return await select.main(event, context);
     case 'create':
      return await create.main(event, context);
     case 'selectNumber':
      return await selectNumber.main(event, context);
  }
};
