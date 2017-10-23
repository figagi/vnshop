## 官方手册
[官方手册](http://mongoosejs.com/docs/api.html#model_Model.find)

## find 查询

```
// named john and at least 18
MyModel.find({ name: 'john', age: { $gte: 18 }});

// executes immediately, passing results to callback
MyModel.find({ name: 'john', age: { $gte: 18 }}, function (err, docs) {});

// name LIKE john and only selecting the "name" and "friends" fields, executing immediately
MyModel.find({ name: /john/i }, 'name friends', function (err, docs) { })

// passing options
MyModel.find({ name: /john/i }, null, { skip: 10 })

// passing options and executing immediately
MyModel.find({ name: /john/i }, null, { skip: 10 }, function (err, docs) {});

// executing a query explicitly
var query = MyModel.find({ name: /john/i }, null, { skip: 10 })
query.exec(function (err, docs) {});

// using the promise returned from executing a query
var query = MyModel.find({ name: /john/i }, null, { skip: 10 });
var promise = query.exec();
promise.addBack(function (err, docs) {});
```

##教程

[菜鸟教程](http://www.runoob.com/mongodb/mongodb-operators.html)
