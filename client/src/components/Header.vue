<template>
         <div class="site-header" style="clear:both;">
        <div class="container">
            <div class="header-logo">
                <a href="index.php" title="小米官网"><img src="/static/img/vn-logo.png" /></a>
            </div>
            <div class="header-nav">
                <ul class="nav-list">
                    <li class="nav-category">
                        <a class="btn-category-list" href="catalog.php" style="display:none;">全部商品分类</a>
                    </li>
                    <li class="nav-item">
                        <a class="link" href="category.php?id=76"><span>电子产品</span></a>
                        <div class='item-children'>
                            <div class="container">
                                <ul class="children-list clearfix">
                                    <li class="first">
                                        <div class="figure figure-thumb">
                                            <a href="goods.php?id=27"><img src="" alt="小米电视2 40英寸"></a>
                                        </div>
                                        <div class="title"><a href="goods.php?id=27">小米电视2 40英寸</a></div>
                                        <p class="price">2200<em>元</em>元</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- <div class="container-user"> -->
            <div class="topbar-cart" id="ECS_CARTINFO">
                <a class="cart-mini " href="flow.php">
                    <!-- <i class="iconfont">&#xe60c;</i>  -->
                    <router-link to="/cart" class="iconfont">&#xe60c;购物车</router-link>
                    <span class="mini-cart-num J_cartNum" id="hd_cartnum">(0)</span>
                </a>
            </div>
            <div class="topbar-info J_userInfo" id="ECS_MEMBERZONE">
                <span v-text="nickName" > </span>
                <a class="link"  rel="nofollow" v-if="!nickName" @click="loginModalFlag = true">用户登录</a>
                <span class="sep" v-if="nickName">|</span>
                <a class="link" @click="logout" v-if="nickName" rel="nofollow">退出</a>
            </div>
            <!-- </div> -->
        </div>
        <div id="J_navMenu" class="header-nav-menu" style="display: none;">
            <div class="container"></div>
        </div>


        <!-- 登录框 -->
      <div class="md-modal modal-msg md-modal-transition " :class="{'md-show':loginModalFlag}">
        <div class="md-modal-inner">
          <div class="md-top">
            <div class="md-title" >用户登录</div>
            <button class="md-close" @click="loginModalFlag = false">关闭</button>
          </div>
          <div class="md-content">
            <div class="confirm-tips">
              <div class="error-wrap">
                <span class="error error-show" >用户名或密码错误</span>
              </div>
              <ul>
                <li class="regi_form_input">
                  <input type="text" tabindex="1" name="loginname" v-model="userName" placeholder="User Name" data-type="loginname" class="regi_login_input regi_login_input_left">
                </li>
                <li class="regi_form_input noMargin">
                  <i class="icon IconPwd"></i>
                  <input type="password" tabindex="2" name="password" v-model="userPwd" placeholder="Password" class="regi_login_input regi_login_input_left login-input-no input_text" @keyup.enter="login">
                </li>
              </ul>

            </div>
            <div class="login-wrap">
              <a href="javascript:;" class="btn-login" @click="login">登录</a>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-if="loginModalFlag" @click="loginModalFlag = false">
      </div>

    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        data(){
            return{
                nickName:'', // 显示的昵称
                userName:'', // 输入的用户名
                userPwd:'', // 输入的用户密码
                loginModalFlag:false  // 控制模态框和遮罩层的显示隐藏
            }
        },
        created(){
            this.checkLogin()
        },
        methods:{
            login(){
                axios.post('/users/login',{
                    userName:this.userName,
                    userPwd:this.userPwd
                }).then(result=>{
                    let res = result.data;
                    this.nickName = res.result.userName;
                    this.loginModalFlag = false;
                })
            },
            checkLogin(){
                axios.post('/users/checkLogin').then(result=>{
                    let res = result.data;
                    this.nickName = res.result;
                })
            },
            logout(){
                axios.post('/users/logout').then(result=>{
                    let res = result.data;
                    this.nickName = '';
                    console.log(res);
                })
            }
        }
    }
</script>