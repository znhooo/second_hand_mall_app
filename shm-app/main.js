import Vue from 'vue'
import App from './App'
import Request from './plugins/request/js/index'
import store from './store'

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

Vue.config.productionTip = false
Vue.prototype.$store = store
global.$http = Request();

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
