import Express from 'express';
import User from '../../models/User';
import Business from '../../models/Work';
import ErrorContent from '../../models/Error';
import ModuleContent from '../../models/Module';
import { MD5_SUFFIX, responseClient, md5 } from '../util'

const router = Express.Router();

router.get('/login', (req,res) => {
    console.log(req.query);
    res.send('请求成功');
    // let { username, password } = req.body;
    // if (!username) {
    //     responseClient(res,400 ,2,'用户名不能为空');
    //     return;
    // }

    // if (!password) {
    //     responseClient(res, 400, 2, '密码不可为空');
    //     return;
    // }

    // User.findOne({
    //     username,
    //     password: md5(password + MD5_SUFFIX)
    // }).then(userInfo => {
    //     console.log(userInfo)
    //     if(userInfo){
    //         //登录成功
    //         let data = {};
    //         data.username = userInfo.username;
    //         data.userType = userInfo.type;
    //         data.userId = userInfo._id;
    //         req.session.userInfo = data;
    //         responseClient(res, 200, 0, '登录成功', data);
    //         return;
    //     }
    //     responseClient(res,400,1,'用户名或密码错误');
    // }).catch(err => {
    //     responseClient(res);
    // })
});

router.post('/register', (req,res) => {
    console.log(req.body);
    // responseClient(res, 200, 0, '注册成功', data);
    // res.send(req.body);
    Part.find().then(data => {
        console.log(data);
        if (data) {
            res.send(data);
        }
    })

    let { userName, password } = req.body;
    if (!userName) {
        responseClient(res, 400, 2, '用户名不可为空');
        return;
    }

    if (!password) {
        responseClient(res,400,2,'密码不可为空');
        return;
    }

    // if (password !== passwordRe) {
    //     responseClient(res,400,2,'两次密码不一致');
    //     return;
    // }

    User.findOne({username: userName})
        .then(data => {
            if (data) {
                responseClient(res, 200, 1, '用户已存在');
                return;
            }
            let user = new User({
                username: userName,
                password: md5(password + MD5_SUFFIX),
                type: 'user'
            });
            user.save()
                .then(() => {
                    User.findOne({username: userName})
                        .then(userInfo => {
                            let data = {};
                            data.username = userInfo.username;
                            data.userType = userInfo.type;
                            data.userId = userInfo._id;
                            responseClient(res, 200, 0, '注册成功', data);
                            return;
                        });
                })
        }).catch(err => {
            responseClient(res);
        });
});

// 相关业务线列表请求接口
router.post('/BusinessList',(req,res) => {
    Business.find().then(data => {
        responseClient(res, 200, 0, '成功', data);
    })
})

// 异常信息查询接口
router.post('/errorContent',(req,res) => {
    console.log(req.body.page);
    let params = {};
    // if (req.body.part != '') {
    //     params.part = req.body.part;
    // }
    if (req.body.business != '') {
        params.business = req.body.business;
    }
    // if (req.body.begin_time != '') {
    //     params.begin_time = req.body.begin_time;
    // }
    // if (req.body.end_time != '') {
    //     params.end_time = req.body.end_time;
    // }
    let data = {};
    data.count = 0;
    data.page = Number(req.body.page || 1);
    data.limit = Number(req.body.limit);
    data.pages = 0;
    
    //读取所有的异常信息
    ErrorContent.find().count().then(function(count) {
        console.log('数据条数:',count);
        data.count = count;
        //计算总页数
        data.pages = Math.ceil(data.count / data.limit);
        //取值不能超过pages
        data.page = Math.min(data.page,data.pages);
        //取值不能小于1
        data.page = Math.max(data.page,1);

        var skip = (data.page - 1) * data.limit;
        
        return ErrorContent.find(params).sort({_id: 1}).limit(data.limit).skip(skip).sort({
            id: 1
        })
    }).then(function(contents) {
        data.contents = contents;
        console.log(contents);
        responseClient(res, 200, 0, '成功', data);
    })
})

// 模块 信息查询接口

router.post('/moduleContent',(req,res) => {
    console.log(req.body.page);
    let params = {};
    // if (req.body.part != '') {
    //     params.part = req.body.part;
    // }
    if (req.body.business != '') {
        params.business = req.body.business;
    }
    // if (req.body.begin_time != '') {
    //     params.begin_time = req.body.begin_time;
    // }
    // if (req.body.end_time != '') {
    //     params.end_time = req.body.end_time;
    // }
    let data = {};
    data.count = 0;
    data.page = Number(req.body.page || 1);
    data.limit = Number(req.body.limit);
    data.pages = 0;
    
    //读取所有的异常信息
    ModuleContent.find().count().then(function(count) {
        console.log('数据条数:',count);
        data.count = count;
        //计算总页数
        data.pages = Math.ceil(data.count / data.limit);
        //取值不能超过pages
        data.page = Math.min(data.page,data.pages);
        //取值不能小于1
        data.page = Math.max(data.page,1);

        var skip = (data.page - 1) * data.limit;
        
        return ModuleContent.find(params).sort({_id: 1}).limit(data.limit).skip(skip).sort({
            create_time: 1
        })
    }).then(function(contents) {
        data.contents = contents;
        console.log(contents);
        responseClient(res, 200, 0, '成功', data);
    })
})


module.exports = router;