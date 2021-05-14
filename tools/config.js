const path = require('path')

const os = require('os');
///////////////////获取本机ip///////////////////////
const host = () => {
    const interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

const port = 1212
const src = path.resolve(__dirname, './src/*')
const dev = path.resolve(__dirname, '../components')
const dist = path.resolve(__dirname, '../dist')
const isDev = process.argv.indexOf('--develop') >= 0
const getCurrentDate = () => {
    var now = new Date();
    var year = now.getFullYear(); //得到年份
    var month = now.getMonth();//得到月份
    var date = now.getDate();//得到日期
    var day = now.getDay();//得到周几
    var hour = now.getHours();//得到小时
    var minu = now.getMinutes();//得到分钟
    var sec = now.getSeconds();//得到秒
    month = month + 1;
    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    if (hour < 10) hour = "0" + hour;
    if (minu < 10) minu = "0" + minu;
    if (sec < 10) sec = "0" + sec;
    var time = time = year + "-" + month + "-" + date + " " + hour + ":" + minu + ":" + sec;
    return time;
}


/**
 * 时间格式化
 */
 function format(time, reg) {
    const date = typeof time === 'string' ? new Date(time) : time
    const map = {}
    map.yyyy = date.getFullYear()
    map.yy = ('' + map.yyyy).substr(2)
    map.M = date.getMonth() + 1
    map.MM = (map.M < 10 ? '0' : '') + map.M
    map.d = date.getDate()
    map.dd = (map.d < 10 ? '0' : '') + map.d
    map.H = date.getHours()
    map.HH = (map.H < 10 ? '0' : '') + map.H
    map.m = date.getMinutes()
    map.mm = (map.m < 10 ? '0' : '') + map.m
    map.s = date.getSeconds()
    map.ss = (map.s < 10 ? '0' : '') + map.s
  
    return reg.replace(/\byyyy|yy|MM|M|dd|d|HH|H|mm|m|ss|s\b/g, $1 => map[$1])
  }



module.exports = {
    port,
    format,
    srcPath: src, // 源目录
    distPath: isDev ? dev : dist, // 目标目录
    getCurrentDate: getCurrentDate(),
    host: host()
    
}