<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">新增地址</block>
			<block slot="right">
				<text class="text-orange" @tap="save">保存</text>
			</block>
		</bar-title>
		
		<!--表单-->
		<view class="cu-form-group margin-top">
			<view class="title">收货人名</view>
			<input placeholder="您的姓名" @input="nameInput" v-model="address.name"/>
			<text class='cuIcon-roundclosefill text-grey' v-if="nameClose"/>
		</view>
		<view class="cu-form-group">
			<view class="title">手机号码</view>
			<input placeholder="卖家和快递员联系您的方式" @input="phoneInput" v-model="address.phone"/>
			<text class='cuIcon-roundclosefill text-grey' v-if="phoneClose"/>
		</view>
		<view class="cu-form-group">
			<view class="title">邮政编码</view>
			<input placeholder="可以不用那么精确" @input="zipCodeInput" v-model="address.code"/>
			<text class='cuIcon-roundclosefill text-grey' v-if="zipCodeClose"/>
		</view>
		<view class="cu-form-group">
			<view class="title">所在地区</view>
			<input placeholder="选择所在地区" disabled="true" @tap="openAddres" v-model="address.region"/>
			<!-- <text class='cuIcon-roundclosefill text-grey' v-if="phoneClose"/> -->
		</view>
		<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor="#007AFF"></simple-address>
		<view class="cu-form-group">
			<view class="title">详细地址</view>
			<input placeholder="请输入详细的地址信息" @input="addressInput" v-model="address.verbose"/>
			<text class='cuIcon-roundclosefill text-grey' v-if="addressClose"/>
		</view>
		
		<view class="cu-form-group">
			<view class="title">设为默认地址</view>
			<u-switch v-model="isDefault" asyncChange @change="change" ></u-switch>
		</view>
	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	import _tool from '@/static/zaiui/util/tools.js';	//工具函数
	import simpleAddress from '@/components/simple-address/simple-address.vue';
	import user from '@/api/user'
	export default {
		components: {
			barTitle,
			simpleAddress
		},
		data() {
			return {
				nameClose: false, 
				phoneClose: false, 
				addressClose: false,
				zipCodeClose: false,
				pickerText: '',
				cityPickerValueDefault: [0, 0, 1],
				address:{},
				isDefault:false
			}
		},
		onLoad() {
			
		},
		onReady() {
			_tool.setBarColor(true);
			this.address.userId = uni.getStorageSync('userInfo').id
			this.address.status ? this.isDefault = true : this.isDefault = false
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		methods: {
			save(){
				user.addAddress(this.address).then(res => {
					uni.showToast({
						title:'添加成功'
					})
					uni.navigateBack({})
				})
			},
			change(e) {
				e ? this.address.status = 1 : this.address.status = 0
				e ? this.isDefault = true : this.isDefault = false
			},
			onConfirm(e){
				this.$set(this.address,'region',e.label)
			},
			openAddres() {
				this.cityPickerValueDefault = [0,0,1]
				this.$refs.simpleAddress.open();
			},
			nameInput(event) {
				let value = event.detail.value;
				if(value != "") {
					this.nameClose = true;
				} else {
					this.nameClose = false;
				}
			},
			phoneInput(event) {
				let value = event.detail.value;
				if(value != "") {
					this.phoneClose = true;
				} else {
					this.phoneClose = false;
				}
			},
			addressInput(event) {
				let value = event.detail.value;
				if(value != "") {
					this.addressClose = true;
				} else {
					this.addressClose = false;
				}
			},
			MultiChange(e) {
				this.multiIndex = e.detail.value
			},
			zipCodeInput(event) {
				let value = event.detail.value;
				if(value != "") {
					this.zipCodeClose = true;
				} else {
					this.zipCodeClose = false;
				}
			},
		}
	}
</script>

<style lang="scss">
	/* #ifdef APP-PLUS */
		@import "../../static/colorui/main.css";
		@import "../../static/colorui/icon.css";
		@import "../../static/zaiui/style/app.scss";
	/* #endif */
	.wecanui-footer-fixed .flex-direction {
		padding: 18.18rpx;
	}
</style>
