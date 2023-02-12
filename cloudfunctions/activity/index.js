const select = require('./select/index');
const create = require("./create/index")
const detail = require("./detail/index")
// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event);
  switch (event.type) {
    case 'select':
      return await select.main(event, context);
     case 'create':
      return await create.main(event, context);
      case 'detail':
        return await detail.main(event, context);
  }
};
