var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://localhost/27017/shop');

mongoose.connection.on('connected', function() {
    console.log("Mongodb connected success");
})

// 当连接发生错误的时候
mongoose.connection.on('error', function() {
    console.log('Mongodb connected fail');
})

// 当关闭连接数据库的时候
mongoose.connection.on('disconnected', function() {
    console.log('Mongodb connected disconnected');
})

router.get('/', function(req, res, next) {
    res.json('您现在访问的是goods api')
})


module.exports = router;