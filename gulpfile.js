const { src, dest } = require('gulp');
const gulp = require('gulp')
const uglify = require("gulp-uglify");
const concat = require('gulp-concat');
const del = require('del');  //删除文件
const browserSync = require('browser-sync').create();// 静态服务器


const id = require('./package.json').name || 'miniprogram-custom-component'
const config = require('./tools/config')

const clearAllFn = async () => {
    console.log('清除文件夹!');
    await del.sync(config.distPath); // 同步删除之前构建的文件夹
}

/// 复制除了js的所有文件
const copyFn = async (done) => {
    await gulp.src(['./src/**/*', '!./src/**/*.js'])
        .pipe(gulp.dest(config.distPath));
    done()
}

/// 将指定的js合并
const scriptFn = async (done) => {
    await gulp.src(['./src/a.js', './src/c.js'])  // 指定两个js
        // src('./src/*.js')
        .pipe(concat('main.min.js')) /*合并成一个新文件*/
        .pipe(dest(config.distPath + '/js'));
    done()
}


/// 混淆js
const uglifyFn = async (done) => {
    await gulp.src(['./src/**/*.js', '!./src/a.js'])
        .pipe(uglify(
            {
                mangle: false,//类型：Boolean 默认：true 是否修改变量名
                compress: true,//类型：Boolean 默认：true 是否完全压缩
                //preserveComments: all //保留所有注释
                output: {
                    preamble: "/** \r\n 版权所有 \r\n 填写日期: " + config.getCurrentDate + " \r\n 填写作者信息: Anunachi  \r*/"
                }
            }
        ))
        .pipe(gulp.dest(config.distPath));
    done()
}


/// 完成
const finshFn = async () => {
    await console.log('加密完成!');
    // console.log('time', format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
    // console.log('process.argv', process.argv)
}

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


/// 初始化服务器
const server = async () => {
    console.log('初试化服务器----这个只能进一次啊')
    await browserSync.init({
        port: config.port, // 端口
        open: true, // 启动完毕打开浏览器
        server: {
            baseDir: './src', // 路径
            index: 'index.html' // 默认文件
        }
    })
}

let taskSeries = gulp.series(clearAllFn, copyFn, scriptFn, uglifyFn, finshFn);



const watch = () => {


    console.log('ip', config.host);
    console.time

    //watch 地址可以有多个，完了可以跟task
    const watcher = gulp.watch('src/**/*');
    watcher.on('change', event => {
        console.log('DONE  Compiled successfully')
        console.log("\nApp running at:")
        console.log(`\x1B[36m%s\x1B[0m`,` - Local:   http://localhost:${config.port}`)
        console.log(`\x1B[36m%s\x1B[0m`,` - Network:   http://${config.host}:${config.port}`)
        browserSync.reload()
    });
}



const dev = gulp.parallel(server, watch);


module.exports = {
    default: dev,
    dev: dev,
    build: taskSeries
}





