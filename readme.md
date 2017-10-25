# vnshop 商城
## 项目架构
前后分离

前端：
    使用vue cli 脚手架方式搭建

api：
    使用node express框架搭建

## 项目目录
cd vnshop
mkdir -p client note server

vnshop
    client #客户端代码，里面放的是vue项目工程文件

    note #搭建项目的详细笔记
        
    server #node express 代码


# daylog

## day1：2017年10月21日 09:15:03 
    00.项目初始化
    01.vue常见错误收集
    02.初始化商品组件，拆分头部，底部组件
    03.使用mock数据，配合本地的express把商品列表渲染出来
## day2：2017年10月23日 09:15:03
    01.让学员把自己的商城项目提交到github的vnshop项目的issue方便查看
    02.复习上周讲的商品组件
    03.使用vue-lazyload插件实现图片懒加载   
    04.使用express脚手架生成，配置nodemon和supervisor方式启动修改后不需要重启node服务
    05.使用express连接mongodb
    07.使用express通过查询mongodb数据实现goods商品列表接口
    08.使用vue请求server的goods的api，并且配置跨域成功访问
    10.商品按照价格排序的接口开发
    11.商品安装价格排序的vuejs前端实现

## day3
    01.根据价格区间筛选api实现
    02.根据价格区间筛选vue前台实现
    03.分页api接口实现
    04.配置滚动下拉加载插件
    05.vue配合下拉滚动插件，实现下载加载商品
    08.加入购物车api实现
    09.加入购物车vue前台实现

### day4
    01.复习昨天内容，对下拉加载，什么时候不加载逻辑重新分析，修复设置过滤价格分页不从新来读问题
    02.登录注册逻辑
    03.登录前台后台实现
    04.整理上午讲的前后台登录实现，详细笔记
    05.在项目前后分离的状态下，刷新页面，怎么保持用户登录，用户退出
    06.如何在vue里面优雅的解决跨域，路由冲突问题
    07.访问拦截

