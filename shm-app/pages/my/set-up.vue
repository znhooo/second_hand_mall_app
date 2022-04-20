<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">设置</block>
		</bar-title>
		
		<!--设置列表-->
		<view class="cu-list menu margin-top">
			<view class="cu-item">
				<view class="content">商品详情页弹幕</view>
				<view class="action">
					<switch class="switch sm red" @change="SwitchSex" :class="skin?'checked':''" :checked="skin?true:false"/>
				</view>
			</view>
		</view>
		
		<view class="cu-list menu sm-border margin-top">
			<view class="cu-item arrow" @tap="personalTap">
				<view class="content">个人资料</view>
			</view>
			<view class="cu-item arrow" @tap="realNameTap">
				<view class="content">实人认证</view>
			</view>
			<view class="cu-item arrow">
				<view class="content">隐私设置</view>
			</view>
			<view class="cu-item arrow">
				<view class="content">消息通知</view>
			</view>
			<view class="cu-item" @tap="clearStorage">
				<view class="content">缓存清理</view>
				<view class="action">
					<text class="cuIcon-delete text-grey"/>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="content">关于平台</view>
			</view>
		</view>
		
		<!--按钮-->
		<view class="bg-white zaiui-footer-fixed zaiui-foot-padding-bottom">
			<view class="flex padding-sm flex-direction">
				<button class="cu-btn bg-red" @tap="doLogout">退出登录</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	import _tool from '@/static/zaiui/util/tools.js';	//工具函数
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			barTitle
		},
		data() {
			return {
				skin: true,
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
			...mapMutations(['logout']),
			SwitchSex(e) {
				this.skin = e.detail.value
			},
			realNameTap() {
				uni.navigateTo({
					url: "/pages/real_name/index"
				});
			},
			personalTap() {
				uni.navigateTo({
					url: "/pages/my/personal-data"
				});
			},
			doLogout(){
				let that = this
				uni.showModal({
					title:'提示',
					content:'确定退出登录吗?',
					confirmText:'立即退出',
					success(res) {
						if(res.confirm){
							that.logout()
							uni.navigateBack({
								
							})
							// #ifdef APP-PLUS
							plus.nativeUI.toast("退出登录成功!")
							// #endif
						}
					}
				})
				
			},
			clearStorage(){
				uni.showModal({
					title:'提示',
					content:'确定清除缓存吗?',
					confirmText:'立即清除',
					success(res) {
						if(res.confirm){
							uni.clearStorageSync();
							uni.showToast({
								title:'清除成功'
							})
						}
					}
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
</style>
