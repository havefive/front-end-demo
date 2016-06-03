# 前端工程demo
front-end  demo
## 开始之前

首先, 全局安装 [Webpack](https://www.npmjs.com/package/webpack) and [webpack-dev-server](https://www.npmjs.com/package/webpack-dev-server).

```bash
$ npm i -g webpack webpack-dev-server gulp
```
## 开始使用
```bash
$ npm install
```

```bash
$ gulp
```
## 使用命令

### gulp参数说明
```bash
$ gulp help
```

### 开始开发,启动浏览器,自动刷新
```bash
$ gulp browser-sync
```

###  postcss处理生成css
```bash
$ gulp css
```

###  复制现有的模版
```bash
$ gulp tmpl
```

###  压缩图片文件
```bash
$ gulp imagemin
```

###  压缩混淆js
```bash
$ gulp js-uglify
```
 
###  打包成zip文件
```bash
$ gulp zip
```

###  合并压缩替换在html使用的css,js文件
```bash
$ gulp merge
```

###  模拟json接口数据,根目录data配置json数据
```bash
$ gulp mock
```

###  合并小图到一张大图
```bash
$ gulp sprite
```

###  文件附加版本号
```bash
$ gulp rev
```
