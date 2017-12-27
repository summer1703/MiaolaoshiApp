import Vue from 'vue'
import Vuex from 'vuex'

import index from '../components/info/index/store.js'

Vue.use(Vuex)
Vue.config.productionTip = false
export default new Vuex.Store({
    modules: {
        index
    }
})
