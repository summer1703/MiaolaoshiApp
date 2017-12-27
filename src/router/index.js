import Vue from 'vue'
import Router from 'vue-router'

import info from '../components/info/info.vue'
import index from '../components/info/index/index.vue'
import orderform from '../components/info/orderForm/orderForm.vue'
import me from '../components/info/me/me.vue'

import login from '../components/login/login.vue'
import reg from '../components/reg/reg.vue'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/info',
        name: 'info',
        component: info,
        children: [{
            path: '/',
            name: 'index',
            component: index
        },{
            path: '/orderform',
            name: 'orderform',
            component: orderform
        },{
            path: '/me',
            name: 'me',
            component: me
        }]
    },{
        path: '/',
        name: 'login',
        component: login
    },{
        path: '/reg',
        name: 'reg',
        component: reg
    }]
})
