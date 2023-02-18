const select = require('./select/select');
const details = require('./details/index');
const update = require('./update/index');

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'select':
      return await select.main(event, context);

      case 'details':
        return await details.main(event, context);

        case 'update':
          return await update.main(event, context);
  }
};
