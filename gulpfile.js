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

var imagemin = require('gulp-imagemin');

var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var zip = require('gulp-zip');

var merge=require('gulp-merge-link');

var webserver = require('gulp-mock-server');

// gulp 帮助命令说明
gulp.task('help', function () {
    console.log('	gulp help			        gulp参数说明');
    console.log('	gulp browser-sync			启动浏览器,自动刷新');
    console.log('	gulp css			        postcss处理生成css');
    console.log('	gulp tmpl			        复制现有的模版');
    console.log('	gulp imagemin			        压缩图片文件');
    console.log('	gulp js-uglify			        压缩混淆js');
    console.log('	gulp zip			        打包成zip文件');
    console.log('	gulp merge			        合并压缩替换在html使用的css,js文件');
    console.log('	gulp mock			        模拟json接口数据,data目录配置json数据');

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

//使用gulp-imagemin压缩图片文件（包括PNG、JPEG、GIF和SVG图片）https://github.com/sindresorhus/gulp-imagemin#user-content-options
gulp.task('imagemin', function () {
    gulp.src('src/img/*.{png,jpg,gif,ico}')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'));
});

//使用gulp-uglify压缩js文件
gulp.task('js-uglify', function() {
    return gulp.src(['src/js/a.js',
            'src/js/b.js'
            ])
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('build/js'));
});

//使用gulp-zip压缩文件
gulp.task('zip', function() {
    return gulp.src('src/**')
        .pipe(zip('archive.zip'))
        .pipe(gulp.dest('build'));
});

//gulp-merge合并压缩替换在html使用的css,js文件
gulp.task('merge', function () {
    gulp.src('./html/index.html')
        .pipe(merge({
            'app.css':['header.css','footer.css','./lib/common.css'],
            'app.js':['lib/jquery.js','header.js']
        }))
        .pipe(gulp.dest('dist/html/'));
});

//模拟json接口数据 http://localhost:8090/test
//https://github.com/sanyueyu/gulp-mock-server
gulp.task('mock', function() {
    gulp.src('.')
        .pipe(webserver({
            livereload: false,
            directoryListing: true,
            port: 8090,
            open: true
        }));
});

// 默认task,gulp 命令
gulp.task('default', function() {
    run('help');
});