/**
 * Created by lizhaocai on 16/3/8.
 */

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var run = require('run-sequence');


// gulp 帮助命令说明
gulp.task('help', function () {

    console.log('	gulp browser-sync			启动浏览器,自动刷新');
    console.log('	gulp help			        gulp参数说明');

});

// 启动浏览器服务,监听所有文件更改
gulp.task('browser-sync', function() {
    browserSync.init({
        files: "**",
        server: {
            baseDir: "./"
        },
        port:8080
    });
});

// 默认task,gulp 命令
gulp.task('default', function() {
    run('help');
});