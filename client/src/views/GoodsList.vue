<template>
  <div>
    <nav-header/>
    <nav-bread>商品列表</nav-bread>
    <div class="accessory-result-page accessory-page">
        <div class="container">
            <div class="filter-nav">
                <span class="sortby">Sort by:</span>
                <a href="javascript:void(0)" class="default cur">Default</a>
                <a href="javascript:void(0)" class="price" @click="sortGoods">价格 <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
                <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
            </div>
            <div class="accessory-result">
                <!-- filter -->
                <div class="filter stopPop" id="filter">
                    <dl class="filter-price">
                        <dt>Price:</dt>
                        <dd><a href="javascript:void(0)" :class="{'cur':priceChecked == 'all'}"  @click="setPriceFilter('all')">All</a></dd>
                        <dd v-for="(item,index) in priceFilter" :key="index" class="cur">
                            <a @click="setPriceFilter(index)" :class="{'cur': priceChecked == index}" href="javascript:void(0)">{{item.startPrice}} - {{item.endPrice}}</a>
                        </dd>
                    </dl>
                </div>

                <!-- search result accessories list -->
                <div class="accessory-list-wrap">
                    <div class="accessory-list col-4">
                        <ul>
                            <li v-for="(item,index) in goods" :key="index">
                                <div class="pic">
                                    <a href="#"><img v-lazy="'/static/img/' + item.productImage" alt=""></a>
                                </div>
                                <div class="main">
                                    <div class="name">{{item.productName}}</div>
                                    <div class="price">{{item.salePrice}}</div>
                                    <div class="btn-area">
                                        <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                                    </div>
                                </div>
                            </li>
                            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                            ...
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <NavFooter/>
    <!-- 在未登录的情况下 -->
    <modal :mdShow="mdShow">
        <p slot="message">请先登录，否则无法加入购物车</p>
        <div slot="btnGroup">
            <a href="javascript:;" class="btn  btn--m" @click="mdShow = false">关闭</a>
        </div>
    </modal>

    <!-- 在登录的情况下 -->
    <modal :mdShow="mdShowCart">
        <p slot="message">加入购物车成功</p>
        <div slot="btnGroup">
            <a href="javascript:;" class="btn  btn--m" @click="mdShowCart = false">继续购物</a>
            <router-link class="btn  btn--m" to="/cart">查看购物车列表</router-link>
        </div>
    </modal>

  </div>
</template>

<script>
    import NavHeader from '@/components/Header'
    import NavFooter from '@/components/Footer'
    import NavBread from '@/components/NavBread'
    import Modal from '@/components/Modal'
    import axios from 'axios'
    // import '../../static/css/base.css'
    // import '../../static/css/product.css'
    export default{
        components:{
            NavHeader,
            NavFooter,
            NavBread,
            Modal
        },
        data(){
            return {
                goods:{},
                sortFlag:true,
                priceChecked:'all',
                data: [],
                busy: true,
                page:1,
                pageSize:8,
                mdShowCart:false,
                mdShow:false,
                priceFilter:[
                    {
                        startPrice:'0',
                        endPrice:'100'
                    },
                    {
                        startPrice:'100',
                        endPrice:'500'
                    },
                    {
                        startPrice:'500',
                        endPrice:'1000'
                    },
                    {
                        startPrice:'1000',
                        endPrice:'2000'
                    }
                ]
            }
        },
        created(){
            this.getGoodsList();
        }
        ,
        methods:{
            getGoodsList(flag){
                let sort = this.sortFlag ? 1 : -1;
                let param = {
                    sort:sort,
                    priceLevel:this.priceChecked,
                    page:this.page,
                    pageSize:this.pageSize
                }
                axios.get('/goods/list',{params:param}).then(res=>{
                    if(flag){
                        // 多次加载数据
                        this.goods = this.goods.concat(res.data.result);
                        if(res.data.result.length == 0){
                            this.busy = true;
                        }else{
                            this.busy = false;
                        }
                    }else{
                        // 第一次加载数据
                        this.goods = res.data.result;
                        // 当第一次加载数据完之后，把这个滚动到底部的函数触发打开
                        this.busy = false;
                    }
                })
            },
            sortGoods(){
                this.sortFlag = !this.sortFlag;
                this.getGoodsList();
            },
            setPriceFilter(index){
                this.priceChecked = index;
                this.page = 1; //设置了分页后在这每次筛选价格重置为第一页
                this.getGoodsList();
            },
            loadMore: function() {
                this.busy = true;
                // 多次加载数据
                setTimeout(() => {
                    this.page ++;
                    this.getGoodsList(true);
                }, 1000);
            },
            addCart(productId){
                axios.post('/goods/addCart',{productId:productId}).then(res=>{
                    console.log(res.data);
                    if(res.data.status == 1){
                        this.mdShow = true;
                    }else{
                        this.mdShowCart = true;
                    }
                })
            }
        }
    }
</script>
