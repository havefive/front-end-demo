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

var inquirer = require('inquirer');
var gutil = require('gulp-util');
var template = require('gulp-template');
var rename = require('gulp-rename');
var conflict = require('gulp-conflict');
var pkg = require('./package.json');
var _ = require('underscore.string');


// gulp 帮助命令说明
gulp.task('help', function () {
    console.log('	gulp help			        gulp参数说明');
    console.log('	gulp browser-sync			启动浏览器,自动刷新');
    console.log('	gulp css			        postcss处理生成css');

});

// 启动浏览器服务,监听所有文件更改
gulp.task('browser-sync', function() {
    browserSync.init({
        files: "**/**",
        server: {
            baseDir: "./src/tmpl/h5"
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

// 复制widget模版
gulp.task('tmpl', function (done) {
    inquirer.prompt([
            {
                type: 'input',
                name: 'widgetName',
                message: 'What do you want to name your widget?'
            },
            {
                type: 'input',
                name: 'version',
                message: 'Widget version?',
                default: '1.0.0'
            },
            {
                type: 'input',
                name: 'authorName',
                message: 'Author name?'
            },
            {
                type: 'input',
                name: 'authorEmail',
                message: 'Author email?'
            },
            {
                type: 'input',
                name: "description",
                message: "Widget description?",
                default: '模块描述'
            },
            {
                type: 'input',
                name: "poweredBy",
                message: "Powered by?",
                default: 'Your Inc.'
            }
        ],
        function(answers) {
            answers.createDate = gutil.date(new Date(), 'yyyy.mm.dd');
            var widgetName = answers.widgetName.toLowerCase();
            answers.nameCapitalized = _.capitalize(widgetName);
            var files = ['./src/tmpl/h5/**'];
            return gulp.src(files)
                //.pipe(template(answers))
                .pipe(rename(function(file) {
                    //file.dirname = './widget/' + widgetName + '/' + file.dirname;
                    if (file.extname === '.json' || file.extname === '.md') {
                        // keep file name
                    } else if (file.basename === 'theme.default') {
                        file.basename = 'theme.default'.replace('theme', widgetName);
                    } else if (file.extname.length) {
                        file.basename = widgetName;
                    }
                }))
                .pipe(conflict('./widget/' + widgetName))
                .pipe(gulp.dest('./widget/' + widgetName))
                //.pipe(install())
                .on('end', function() {
                    done();
                });
        });
});

// 默认task,gulp 命令
gulp.task('default', function() {
    run('help');
});