exports.getDate = function(connect = "-"){
   let date = new Date();
   let year = date.getFullYear();
   let month = date.getMonth();
   let day = date.getDay();
   let hours  = date.getHours();
   let minutes = date.getMinutes();
   let seconds = date.getSeconds();
   let time = year + connect + month + connect + day + connect + hours + connect + minutes + connect + seconds;
   return time;
}
