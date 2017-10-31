import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import GoodsList from '@/views/GoodsList';
import Cart from '@/views/Cart';
import Address from '@/views/Address';
import OrderConfirm from '@/views/OrderConfirm';
import orderSuccess from '@/views/OrderSuccess';

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            name: 'Hello',
            component: GoodsList,
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart,
        },
        {
            path: '/address',
            name: 'address',
            component: Address,
        },
        {
            path: '/orderconfirm',
            name: 'OrderConfirm',
            component: OrderConfirm,
        },
        {
            path: '/ordersuccess',
            name: 'orderSuccess',
            component: orderSuccess,
        },
    ],
});