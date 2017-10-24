var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Goods = require('../models/goods');

// 连接数据库
// mongoose.connect('mongodb://47.93.231.75:27017/shop');
mongoose.connect('mongodb://localhost:27017/shop');

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
    res.json({ data: '您现在访问的是goods api' })
})

router.get('/list', function(req, res, next) {
    // 根据前端传过来的数值，判断价格区间，然后去数据库里面查询
    let priceLevel = req.param('priceLevel');

    let sort = req.param('sort');
    let priceGt = '',
        priceLte = '';
    let param = {};
    if (priceLevel != 'all') {
        switch (priceLevel) {
            case '0':
                priceGt = 0;
                priceLte = 100;
                break;
            case '1':
                priceGt = 100;
                priceLte = 500;
                break;
            case '2':
                priceGt = 500;
                priceLte = 1000;
                break;
            case '3':
                priceGt = 1000;
                priceLte = 2000;
                break;
        }

        param = {
            salePrice: {
                $gt: priceGt,
                $lte: priceLte
            }
        }
    }


    let goodsModel = Goods.find(param);
    goodsModel.sort({ 'salePrice': sort });

    goodsModel.exec({}, function(err, doc) {
        if (err) {
            res.json({ status: "1", msg: err.message })
        } else {
            res.json({ status: '0', msg: '', result: doc })
        }
    })

})

module.exports = router;