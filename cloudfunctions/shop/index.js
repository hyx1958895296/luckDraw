const select = require('./select/select');
const details = require('./details/index');
const exchange = require("./exchange/index");

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'select':
      return await select.main(event, context);

      case 'details':
        return await details.main(event, context);

        case 'exchange':
          return await exchange.main(event, context);
  }
};
