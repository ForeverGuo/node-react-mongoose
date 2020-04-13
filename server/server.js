import path from 'path';
import Express from 'express';
import favicon from 'serve-favicon';        // 用于请求设置网页logo
import httpProxy from 'http-proxy';
import compression from 'compression';
import connectHistoryApiFallback from 'connect-history-api-fallback';  //支持h5 history 模式路由
import config from '../config/config';

const app = new Express();
const port = config.port;

const targetUrl = `http://${config.apiHost}:${config.apiPort}`;
const proxy = httpProxy.createProxyServer({
    target:targetUrl
});

app.use('/api', (req,res) => {
    proxy.web(req,res,{target:targetUrl,changeOrigin: true})
});

app.use('/',connectHistoryApiFallback());
app.use('/',Express.static(path.join(__dirname,"..",'build')));

app.use(compression());
app.use(favicon(path.join(__dirname,'..','public','favicon.ico')));

app.use(function(err, req, res, next) {
    console.error(err.stack);
    next(err);
});

// //热更新
if(process.env.NODE_EVN!=='production'){
    const Webpack = require('webpack');
    const WebpackDevMiddleware = require('webpack-dev-middleware');
    const WebpackHotMiddleware = require('webpack-hot-middleware');
    const webpackConfig = require('../webpack.dev');

    const compiler = Webpack(webpackConfig);
    app.use(WebpackDevMiddleware(compiler, {
        publicPath: '/',
        stats: {colors: true},
        lazy: false,
        watchOptions: {
            aggregateTimeout: 300,
            poll: true
        },
    }));
    app.use(WebpackHotMiddleware(compiler));
}


// 监听 并开启服务
app.listen(port,err => {
    if(err) {
        console.log(err);
    } else {
        console.log(`==> open http://${config.host}:${config.port} in a browser to view the app`);
    }
});