<script>
	//仅供学习交流，如作它用所承受的法律责任一概与作者无关 !!!!
	//----------------------------------------------------------------------
	//如果您运行的时候，出现了报错，请自行解决,我使用的HBX版本号：2.6.15.20200421
	//推荐此项目运行到APP上，不推荐运行到小程序中，虽然已经做了简单的适配
	//QQ交流群：707134214
	import _tool from '@/static/zaiui/util/tools.js';
	import {
		mapMutations
	} from 'vuex'
	export default {
		onLaunch: function() {
			_tool.zaiui_log("2.6.15.20200421");
			//console.log('App Launch')
			uni.getStorage({
				key: 'userInfo',
				success: (res) => {
					Object.keys(res.data).length === 0 ? '' : this.login(res.data)
//					console.log('有登陆缓存');
				},
				fail: () => {
	//				console.log('无登录缓存');
				}
			})
		},
		onShow: function() {
			//console.log('App Show')
		},
		onHide: function() {
			//console.log('App Hide')
		},
		methods: {
			...mapMutations(['login'])
		}
	}
</script>

<style lang="scss">
	//H5端引用。玄学问题，我这边在这里引入的css，在APP上无效。前面加/也一样。原因未知...
	//可自行测试在APP上是否有效，如果有效，可在vue里删除css引入的代码。
	@import "/static/iconfont/font.scss";
	/* #ifndef APP-PLUS */
		@import "static/colorui/main.css";
		@import "static/colorui/icon.css";
		@import "static/zaiui/style/app.scss";
	/* #endif */
</style>
