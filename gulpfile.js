/**
 * Created by lizhaocai on 16/3/8.
 */

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var run = require('run-sequence');

var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnext = require('cssnext');
var precss = require('precss');

// gulp 帮助命令说明
gulp.task('help', function () {
    console.log('	gulp help			        gulp参数说明');
    console.log('	gulp browser-sync			启动浏览器,自动刷新');
    console.log('	gulp css			        postcss处理生成css');

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

// postcss预处理生成css
gulp.task('css', function () {
    var processors = [
        autoprefixer,
        cssnext,
        precss
    ];
    return gulp.src('./src/css/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./build'));
});

// 默认task,gulp 命令
gulp.task('default', function() {
    run('help');
});