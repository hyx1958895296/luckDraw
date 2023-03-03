class Time {
  constructor() {
  };
  getYears(count, timeStamp) {
    let nowDate = timeStamp ? new Date(timeStamp) : new Date();
    let arr = [];
    arr.push(nowDate.getFullYear())
    for (let index = 0; index < count; index++) {
      let tempDate = nowDate.setDate(nowDate.getDate() + 1);
      tempDate = new Date(tempDate);
      let year = tempDate.getFullYear();
      arr.push(year);
    }
    return arr
  };
  getMonths(count, timeStamp) {
    let nowDate = timeStamp ? new Date(timeStamp) : new Date();
    let arr = [];
    arr.push(nowDate.getMonth() + 1)
    for (let index = 0; index < count; index++) {
      let tempDate = nowDate.setDate(nowDate.getDate() + 1);
      tempDate = new Date(tempDate);
      let month = tempDate.getMonth() + 1;
      arr.push(month);
    }
    return arr
  };
  getDates(count, timeStamp) {
    let nowDate = timeStamp ? new Date(timeStamp) : new Date();
    let arr = [];
    arr.push(nowDate.getDate())
    for (let index = 0; index < count; index++) {
      let tempDate = nowDate.setDate(nowDate.getDate() + 1);
      tempDate = new Date(tempDate);
      let date = tempDate.getDate();
      arr.push(date);
    }
    return arr
  };

  // 补零
  fillZero(str) {
    return str >= 0 && str < 10 ? '0' + str : '' + str;
  };

  // 2023年2月22日 ==> 2023-02-22
  parseDate(date) {
    date = date.split('年')[0] + '-' +
      (date.split('年')[1].split('月')[0].length == 1 ? '0' + date.split('年')[1].split('月')[0] : date.split('年')[1].split('月')[0]) + '-' +
      (date.split('年')[1].split('月')[1].split('日')[0].length == 1 ? '0' + date.split('年')[1].split('月')[1].split('日')[0] : date.split('年')[1].split('月')[1].split('日')[0]);
    return date
  };

  // 日期转时间戳  2023-02-22 ==> 
  parseTimeStamp(date){
    date = new Date(date).getTime()
    return date
  }

  // timeStamp如果有参数，就从参数的那天开始往后获取天数，否则就从当天往后获取天数
  // count 获取多少天
  format(count, timeStamp) {
    let arr = [];
    for (let index = 0; index < count; index++) {
      arr.push(this.getYears(count, timeStamp)[index] + '年' + this.getMonths(count, timeStamp)[index] + '月' + this.getDates(count, timeStamp)[index] + '日')
    }
    return arr
  };
}

export {
  Time
}