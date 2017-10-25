var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('hi shudong.wang stark');
});

router.post('/login', function(req, res, next) {
    let param = {
        userName: req.body.userName,
        userPwd: req.body.userPwd
    }
    console.log(param);
    User.findOne(param, function(err, doc) {
        console.log(err);
        if (err) { res.json({ "status": "1", msg: err.message }) } else {
            console.log('doc', doc);
            if (!doc) { res.json({ 'status': '1', msg: '', result: '用户名和密码错误' }) }
            //把userId 和 userName 存到cookie里面，在控制台的application里面找到cookie可以查看

            // 第一个参数存的是 cookie 名字，第二个参数存的是值，地三个对象，里面
            // path 是存的路径，maxAge 过期时间，以毫秒为单位
            res.cookie('userId', doc.userId, {
                path: '/',
                maxAge: 1000 * 60 * 60
            })

            res.cookie("userName", doc.userName, {
                path: '/',
                maxAge: 1000 * 60 * 60
            })

            if (doc) {
                res.json({
                    status: 0,
                    msg: '',
                    result: {
                        userName: doc.userName
                    }
                })
            }
        }
    })
})
module.exports = router;