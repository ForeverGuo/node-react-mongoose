# react_demo

#### 介绍
node + express + webpack + react + antd

#### 安装教程
1. git clone
2. npm/cnpm install
3. npm run watch-dev-client

#### 目录结构
.
.
|
|
|——  build        ## 打包生产文件 （使用热更换，文件存储在内存中）
|
|——  config
|    |
|    |—— config.js      ## 服务ip,port 配置文件
|
|——  public             ## 静态共用文件
|
|
|
|
|—— server
|     |
|     |—— index.js     ## 服务配置文件
|
|
|
|—— src      ## express 路由
|     |
|     |—— assets            ## 静态文件
|     |—— axios             ## ajax 请求配置
|     |—— components        ## 前端组件 
|     |—— container         ## 后台组件
|     |—— router            ## 路由配置
|     |—— index.html        ## 模板
|     |—— index.js          ## 入口文件
|
|—— package.json    ## 包文件管理
|  
|
|—— webpack.dev.js      ## 开发配置
|
|
|—— webpack.prod.js     ## 生产配置
|
|