/**
 * api 请求server
 * 
 * 0: 成功
 * 1：数据不合法
 * 2：客户端数据错误
 * 3：后端错误
 */

 import Express from 'express'
 import config from '../../config/config'
 import bodyParser from 'body-parser'
 import mongoose from 'mongoose'
 import cookieParser from 'cookie-parser'
 import session from 'express-session'

 const port = config.apiPort;
 const app = new Express();
 
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(cookieParser());

//展示页面路由
app.use('/',require('./user'));

mongoose.Promise = require('bluebird');    //promise 的类库

mongoose.connect(`mongodb://${config.dbHost}:${config.dbPort}/react_local_demo`, function (err) {
    if(err) {
        console.log(err, "数据库连接失败");
        return;
    }
    console.info(`===> db server is running at ${config.dbHost}:${config.dbPort}`)

    app.listen(port, function (err) {
        if (err) {
            console.error('err:', err);
        } else {
            console.info(`===> api server is running at ${config.apiHost}:${config.apiPort}`)
        }
    });
});


