var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('hi shudong.wang stark');
});



// 登录接口
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

// 检查是否登录
router.post('/checkLogin', function(req, res, next) {
    // 使用cookies读取 cookies
    if (req.cookies.userId) {
        res.json({
            status: '0',
            result: req.cookies.userName
        })
    } else {
        res.json({
            status: 1,
            msg: '未登录',
            result: ''
        })
    }
})

// 退出登录
router.post('/logout', function(req, res, next) {
    res.cookie("userId", "", {
        path: '/',
        maxAge: -1
    })

    res.json({
        status: 0,
        msg: '',
        result: '退出成功'
    })
})

router.post("/cartList", function(req, res, next) {
    let userId = req.cookies.userId;
    User.findOne({ userId: userId }, function(err, doc) {
        if (err) { res.json({ status: '1', msg: err.message, result: '' }) } else {
            res.json({
                status: 0,
                msg: '',
                result: doc.cartList
            })
        }
    })
})

router.post('/cartEdit', function(req, res, next) {
    let userId = req.cookies.userId,
        productId = req.body.productId,
        checked = req.body.checked,
        productNum = req.body.productNum;

    User.update({ 'userId': userId, "cartList.productId": productId }, {
        "cartList.$.productNum": productNum,
        "cartList.$.checked": checked
    }, function(err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            res.json({
                status: '0',
                msg: '',
                result: '添加购物车成功'
            })
        }
    })
})


// router.post('/cartEdit', function(req, res, next) {
//     let userId = req.cookies.userId,
//         productId = req.body.productId,
//         productNum = req.body.productNum;
//     // console.log(productNum);
//     User.update({ 'userId': userId, "productId": productId }, {
//         "cartList.$.productNum": productNum
//     }, function(err, doc) {
//         console.log(doc);
//         if (err) { res.json({ status: '1', msg: err.message, result: '' }) } else {
//             res.json({
//                 status: 0,
//                 msg: '',
//                 result: '修改购物车商品成功'
//             })
//         }
//     })

// })

router.post('/editCheckAll', function(req, res, next) {

})
module.exports = router;