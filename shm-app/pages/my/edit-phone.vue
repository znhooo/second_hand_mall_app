<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">修改手机号</block>
			<block slot="right">
				<text class="text-orange" @tap="save">保存</text>
			</block>
		</bar-title>
		
		
		
		<view class="cu-form-group margin-top">
			<view class="title">新手机号</view>
			<input placeholder="请输入新手机号" v-model="phone"></input>
		</view>
		

		
		
		<!--小程序端显示-->
		<!-- #ifdef MP -->
		<view class="bg-white zaiui-footer-fixed zaiui-foot-padding-bottom">
			<view class="flex flex-direction">
				<button class="cu-btn bg-red">保存昵称</button>
			</view>
		</view>
		<!-- #endif -->
		
	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	import _tool from '@/static/zaiui/util/tools.js';	//工具函数
	import user from '@/api/user'
	import store from '@/store'
	import {
		mapMutations
	} from 'vuex'
	export default {
		components: {
			barTitle
		},
		data() {
			return {
				phone:'',
			}
		},
		onLoad() {
			
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		methods: {
			...mapMutations(['login']),
			save(){
				if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone))){
					// #ifdef APP-PLUS
					plus.nativeUI.toast("请填写正确的手机号码")
					// #endif
					return false; 
				}
				store.state.userInfo.phone = this.phone
				user.alter(store.state.userInfo).then(res => {
					
					this.login(store.state.userInfo)
					uni.navigateBack({
						success: () => {
							uni.showToast({
								title:'修改成功'
							})
						}
					})
					
				})
			}
			
		}
	}
</script>

<style lang="scss">
	/* #ifdef APP-PLUS */
		@import "../../static/colorui/main.css";
		@import "../../static/colorui/icon.css";
		@import "../../static/zaiui/style/app.scss";
	/* #endif */
	.cu-form-group {
		.title {
			&:before {
			    content: "";
			    position: absolute;
			    height: 27.27rpx;
			    width: 3.63rpx;
			    background: #e6e6e6;
			    top: 16.36rpx;
			    right: 12.72rpx;
			}
		}
		input {
			color: #333333;
		}
	}
</style>
