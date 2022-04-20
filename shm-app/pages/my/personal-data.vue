<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">个人资料</block>
		</bar-title>
		
		<view class="bg-white solid-top zaiui-head-box">
			<view class="text-center margin-bottom-sm">
				<text class="text-black">完成</text>
				<text class="text-orange text-xxl">100%</text>
				<text class="text-black">，太棒啦！</text>
			</view>
			<progress class="zaiui-progress-radius" percent="100" duration="10" active stroke-width="10" activeColor="#f37b1d"/>
		</view>
		
		
		<!--设置列表-->
		<view class="cu-list menu sm-border margin-top">
			<view class="cu-item arrow">
				<view class="content">头像</view>
				<view class="action" @tap="openAvatar">
					<view class="cu-avatar round md" :style="[{backgroundImage:'url('+ userInfo.avatar +')'}]"/>
				</view>
			</view>
			<view class="cu-item arrow" @tap="editNameTap">
				<view class="content">昵称</view>
				<view class="action">
					<text class="text-gray">{{userInfo.name}}</text>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="content">性别</view>
				<view class="action">
					<picker @change="sexPickerChange" :value="sex" :range="sexPicker">
						<view class="picker text-gray">
							{{sexPicker[sex]}}
						</view>
					</picker>
				</view>
			</view>
			<u-datetime-picker
			                :show="showCal"
			                v-model="userInfo.birth"
			                mode="date"
							:minDate="31524800000"
							:maxDate="now()"
							closeOnClickOverlay
							@confirm="calPickerChange"
							@cancel="closeCal"
							@close="closeCal"
			        ></u-datetime-picker>
			<view class="cu-item arrow" @tap="openCal">
				<view class="content">出生日期</view>
				<view class="action">
					<text class="text-gray">{{birth}}</text>
				</view>
			</view>
			<!-- <view class="cu-item arrow" @tap="synopsisTap">
				<view class="content">个人简介</view>
				<view class="action">
					<text class="text-gray">交个朋友</text>
				</view>
			</view> -->
		</view>
		
		<view class="cu-list menu sm-border margin-top">
			<view class="cu-item arrow" @tap="editEmailTap">
				<view class="content">邮箱</view>
				<view class="action">
					<text class="text-gray">{{userInfo.email}}</text>
				</view>
			</view>
			<view class="cu-item arrow" @tap="editPhoneTap">
				<view class="content">手机号</view>
				<view class="action">
					<text class="text-gray">{{userInfo.phone}}</text>
				</view>
			</view>
			<!-- <view class="cu-item arrow" @tap="regionTap">
				<view class="content">地区</view>
				<view class="action">
					<text class="text-gray">太阳</text>
				</view>
			</view> -->
			<view class="cu-item arrow" @tap="addressTap">
				<view class="content">收货地址</view>
			</view>
			<view class="cu-item arrow" @tap="editContactCardsTap">
				<view class="content">联系卡</view>
			</view>
		</view>
		
		<view class="cu-list menu sm-border margin-top">
			<view class="cu-item arrow" @tap="deleteUser">
				<view class="content">注销账户</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	import _tool from '@/static/zaiui/util/tools.js';	//工具函数
	import user from '@/api/user'
	import {
		mapMutations
	} from 'vuex'
	import store from '@/store'
	export default {
		components: {
			barTitle
		},
		data() {
			return {
				sexPicker: ['女', '男'], 
				dateValue: '1945-10-01',
				userInfo:{},
				showCal:false,
				birth:'',
				sex:''
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.userInfo = uni.getStorageSync('userInfo')
		},
		onReady() {
			_tool.setBarColor(true);
			this.userInfo = store.state.userInfo
			this.sex = this.userInfo.sex
			this.birth = this.userInfo.birth
			
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		methods: {
			...mapMutations(['login']),
			openAvatar(){
				console.log(1);
				let that = this
				var actionbuttons=[{title:"查看头像"},{title:"修改头像"}];
				var actionstyle={title:"请选择",cancel:"取消",buttons:actionbuttons};
				plus.nativeUI.actionSheet(actionstyle, function(e){
					if(e.index == 1){
						uni.previewImage({
							current:1 ,
							urls:[that.userInfo.avatar],
						})
					}
					else if(e.index == 2){
						uni.chooseImage({
							sizeType:['compressed'],
							sourceType:['album'],
							count:1,
							success: (res) => {
								uni.uploadFile({
									url:'http://192.168.0.107/api/user/uploadAvatar',
									filePath:res.tempFilePaths[0],
									name: 'file',
									formData:{
										'id': that.userInfo.id
									},
									success: (uploadFileRes) => {
										that.userInfo.avatar = JSON.parse(uploadFileRes.data).data
										that.login(that.userInfo)
									},
									fail: (err) => {
										//console.log(err);
									}
								})
							}
						})
					}
				});
				
			},
			now(){
				return new Date() - 1
			},
			calPickerChange(e) {
				this.birth = uni.$u.timeFormat(e.value,'yyyy-mm-dd')
				this.userInfo.birth = this.birth
				this.showCal = false
				user.alter(this.userInfo).then(res => {
					
					this.login(res.data.data)
				})
			},
			openCal(){
				this.showCal = true
			},
			closeCal(){
				this.showCal = false
			},
			editContactCardsTap(){
				uni.navigateTo({
					url: "/pages/my/contact-cards?userId="+this.userInfo.id
				});
			},
			editNameTap() {
				uni.navigateTo({
					url: "/pages/my/edit-name"
				});
			},
			sexPickerChange(e) {
				this.sex = e.detail.value
				this.userInfo.sex = this.sex
				user.alter(this.userInfo).then(res => {
					store.state.userInfo.sex = e.detail.value
					this.login(this.userInfo)
				})
			},
			synopsisTap() {
				uni.navigateTo({
					url: "/pages/my/edit-synopsis"
				});
			},
			addressTap() {
				uni.navigateTo({
					url: "/pages/my/address"
				});
			},
			editPhoneTap() {
				uni.navigateTo({
					url: "/pages/my/edit-phone"
				});
			},
			editEmailTap() {
				uni.navigateTo({
					url: "/pages/my/edit-email"
				});
			},

			deleteUser() {
				uni.showToast({
					title:"功能暂未开放",
					icon:'error'
				})
			}
			// regionTap() {
			// 	uni.navigateTo({
			// 		url: "/pages/my/region"
			// 	});
			// },
		}
	}
</script>

<style lang="scss">
	/* #ifdef APP-PLUS */
		@import "../../static/colorui/main.css";
		@import "../../static/colorui/icon.css";
		@import "../../static/zaiui/style/app.scss";
	/* #endif */
	.zaiui-head-box {
		position: relative;
	    padding: 45.45rpx 90.9rpx;	
	}
	.zaiui-btn-view {
	    position: fixed;
	    width: 100%;
		bottom: 0;
		.flex {
			padding: 18.18rpx;	
		}
	}
</style>
