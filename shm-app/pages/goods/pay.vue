<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor='bg-white'>
			<block slot="content">立即支付</block>
		</bar-title>
		<!--商品信息-->
		<view class="bg-white zaiui-goods-details-box">
			<view class="cu-avatar radius" :style="[{backgroundImage:'url('+ goodInfo.goodImg +')'}]"/>
			<view class="goods-info-view">
				<view class="text-cut text-black">商品名称 {{goodInfo.goodName}}</view>
				<view class="text-sm text-gray">{{goodInfo.description}}</view>
				<view class="text-sm text-gray"></view>
				<text class="text-price text-red text-lg">{{goodInfo.price}}</text>
			</view>
		</view>
		
		<view class="text-gray padding-sm">支付方式</view>
		
		<!--支付方式-->
		<view class="bg-white zaiui-pay-view">
			<radio-group class="block" @change="RadioChange">
				<view class="zaiui-pay-bar" @tap="payTap('wechat')">
					<view class="cu-avatar sm" style="background-image:url(/static/zaiui/img/wechat.png)"/>
					<view class="content">
						<view class="text-black">
							<text class="margin-right-sm">微信支付</text>
							<text class="cu-tag bg-red radius sm">推荐</text>
						</view>
						<view class="text-gray text-sm">亿万用户的选择，更快更安全</view>
					</view>
					<view class="action">
						<radio class="red zaiui-radio" :class="radio=='wechat'?'checked':''" :checked="radio=='wechat'?true:false" value="wechat"/>
					</view>
				</view>
				
				<view class="zaiui-pay-bar" @tap="payTap('alipay')">
					<view class="cu-avatar sm" style="background-image:url(/static/zaiui/img/alipay.png)"/>
					<view class="content">
						<view class="text-black">
							<text class="margin-right-sm">支付宝支付</text>
							<text class="cu-tag line-red radius sm">HOT</text>
						</view>
						<view class="text-gray text-sm">数亿用户都在用，安全可托付</view>
					</view>
					<view class="action">
						<radio class="red zaiui-radio" :class="radio=='alipay'?'checked':''" :checked="radio=='alipay'?true:false" value="alipay"/>
					</view>
				</view>
			</radio-group>
		</view>
		
		<!--提示信息-->
		<view class="text-gray padding-sm text-sm">
			除平台自营外，应由卖方就所销售物品向买家出具发票等相关凭证。平台不代卖家承担任何责任。
		</view>
		
		<!--底部操作-->
		<view class="bg-white zaiui-footer-fixed zaiui-foot-padding-bottom">
			<view class="padding-sm flex flex-direction">
				<button class="cu-btn radius bg-red" @tap="payBtnTap">￥{{goodInfo.price}} 立即支付</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	import _tool from '@/static/zaiui/util/tools.js';	//工具函数
	import order from '@/api/order'
	import store from '@/store'
	export default {
		components: {
			barTitle,
		},
		data() {
			return {
				goodsList: [],
				checkAll: true,
				goods_img: '/static/images/home/goods/1.png', 
				radio: 'wechat',
				goodInfo: {},
				address:{},
			}
		},
		onLoad(option) {
			this.goodInfo = JSON.parse(decodeURIComponent(option.goodInfo))
			this.address = JSON.parse(decodeURIComponent(option.address))
			this.goodInfo.buyUserId = store.state.userInfo.id
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		methods: {
			RadioChange(e) {
				this.radio = e.detail.value;
			},
			payBtnTap() {
				uni.showLoading({
					title:'加载中'
				})
				setTimeout(() => {
					uni.hideLoading()
					uni.showLoading({
						title:'免密支付中',
					})
					setTimeout(() => {
						order.commitOrder(this.goodInfo.buyUserId,this.goodInfo.sellUserId,
						this.goodInfo.goodId,this.address.id).then(res => {
							// #ifdef APP-PLUS
								plus.nativeUI.toast("支付成功!")
							// #endif
							uni.hideLoading()
							uni.navigateBack({
								delta:3
							})
							uni.navigateTo({
								url: "/pages/status/pay_status"
							});
						})
					},2000)
					
				},1000)
				
			},
			payTap(type) {
				this.radio = type;
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
	@import "../../static/zaiui/style/pay.scss";
</style>
