import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({//全局变量定义
    state: {
        hasLogin: false,
        userInfo:{},
        token:'',
		
    },
    mutations: {
        login(state, userInfo) {
            state.userInfo.name = userInfo.name || '';
			state.userInfo.password = userInfo.password;
            state.hasLogin = true;
            state.userInfo.id = userInfo.id || '';
            state.token = userInfo.token || '';
            state.userInfo.phone = userInfo.phone || '';
			state.userInfo.avatar = userInfo.avatar || '';
			state.userInfo.email = userInfo.email || '';
			state.userInfo.sex = userInfo.sex;
			state.userInfo.birth = userInfo.birth;
			uni.setStorage({
				key:'userInfo',
				data: state.userInfo
			})
        },
        logout(state) {
           state.hasLogin = false;
           state.userInfo = {}
           state.token = '';
           
		   uni.removeStorage({
			   key: 'userInfo'
		   })
        }
    }
})
export default store