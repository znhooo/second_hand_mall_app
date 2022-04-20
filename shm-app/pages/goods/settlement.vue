<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor='bg-white'>
			<block slot="content">确认订单</block>
		</bar-title>
		
		<!--收货地址-->
		<view class="margin-tb-sm zaiui-view-box" @tap="addressTap">
			<view class="bg-white zaiui-card address-view">
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="bg-grey icon-view">
							<text class="cuIcon-locationfill"/>
						</view>
						<view class="content" v-if="address">
							<view class="text-black">
								<text>{{address.name}}</text>
								<text class="margin-left">{{address.phone}}</text>
							</view>
							<view class="text-gray text-sm flex">
								<view class="text-cut">{{address.region}}  {{address.verbose}}</view>
							</view>
						</view>
						<view class="content" v-else>
							<view class="text-black">
								<text>您还未添加地址，点击去添加</text>
							</view>
						</view>
						<view class="action">
							<text class="text-gray cuIcon-right"/>
						</view>
					</view>
				</view>
				<view class="address-line"/>
			</view>
		</view>
		
		<!--商品信息-->
		<view class="margin-tb-sm zaiui-view-box">
			<view class="bg-white zaiui-card goods-view">
				<view class="margin-bottom-sm title-view">
					<view class="cu-avatar sm round" :style="[{backgroundImage:'url('+ goodInfo.avatar +')'}]"/>
					<view class="title-box">
						<text class="text-black margin-right-xs">{{goodInfo.userName}}</text>
						<text class="bg-red cu-tag sm radius">优质卖家</text>
					</view>
				</view>
				
				<view class="goods-info-view-box solid-bottom">
					<view class="cu-avatar radius lg" :style="[{backgroundImage:'url('+ goodInfo.goodImg +')'}]"/>
					<view class="goods-info-view">
						<view class="text-cut text-black">商品名称 99新 苹果 iPhoneX 256G 银色</view>
						<view class="zaiui-tag-view">
							<text class="cu-tag line-blue sm radius">二手</text>
						</view>
						<view class="goods-price-view">
							<text class="text-price text-red text-lg">{{goodInfo.price}}</text>
						</view>
					</view>
				</view>
				
			</view>
		</view>
		
		<!--支付方式-->
		<view class="margin-tb-sm zaiui-view-box">
			<view class="bg-white zaiui-card pay-view">
				<view class="text-lg text-black title-view">
					<text class="text-left">支付方式</text>
					<text class="text-right">在线支付</text>
				</view>
				<view class="tag-view-box">
					<text class="cu-tag line-green sm radius">微信支付</text>
					<text class="cu-tag line-blue sm radius">支付宝支付</text>
					<text class="cu-tag line-blue sm radius">花呗分期</text>
				</view>
				<view class="cu-list menu">
					<view class="cu-item">
						<view class="content">
							<text class="text-black">配送方式</text>
						</view>
						<view class="action">
							<text class="text-black">快递 ￥0.00</text>
						</view>
					</view>
					
				</view>	
			</view>
		</view>
		
		<!--商品价格计算-->
		<view class="margin-tb-sm zaiui-view-box">
			<view class="bg-white zaiui-card zaiui-price-view">
				
				<view class="text-black item-view">
					<view class="text-cut title">商品总额</view>
					<text class="text-red text-price text-right">{{goodInfo.price}}</text>
				</view>
				<view class="text-black item-view">
					<view class="text-cut title">
						<text class="margin-right-xs">运费</text>
						<text class="cuIcon-question icon"/>
					</view>
					<text class="text-right">+ ￥0.00</text>
				</view>
			</view>
		</view>
		
		<!--服务协议-->
		<!-- <view class="margin-tb agreement-checked-view">
			<checkbox class='round red sm zaiui-checked checked'/>
			<view class="text-black-view">
				<text class="text-black">我已阅读并同意</text>
				<text class="text-blue">《平台优品放心买用户服务协议》</text>
			</view>
		</view> -->
		
		
		<!--占位底部距离-->
		<view class="cu-tabbar-height"/>
		
		<!--底部操作-->
		<view class="bg-white zaiui-footer-fixed zaiui-foot-padding-bottom">
			<view class="cu-bar padding-lr">
				<view class="text-black text-bold price-view">
					<text>合计：￥{{goodInfo.price}}</text>
				</view>
				<view class="btn-view">
					<button class="cu-btn radius bg-red" @tap="payTap">确认下单</button>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	import _tool from '@/static/zaiui/util/tools.js';	//工具函数
	import store from '@/store'
	import good from '@/api/good'
	import user from '@/api/user'
	export default {
		components: {
			barTitle,
		},
		data() {
			return {
				goodsList: [], 
				checkAll: true, 
				goods_img: '/static/images/home/goods/1.png',
				goodInfo:{},
				userId:1,
				address:{}
			}
		},
		onLoad(option) {
			this.goodInfo = JSON.parse(decodeURIComponent(option.goodInfo))
			this.userId = store.state.userInfo.id
			user.getAddress(this.userId).then(res => {
				if(res.data.data){
					this.address = res.data.data[0]
				}	
			})
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		methods: {
			addressTap(){
				uni.$once('checkAddress', data => {
					this.address = data
				})
				uni.navigateTo({
					url:'/pages/goods/check-address'
				})
			},
			payTap() {
				uni.navigateTo({
					url:`/pages/goods/pay?goodInfo=${encodeURIComponent(JSON.stringify(this.goodInfo))}&address=${encodeURIComponent(JSON.stringify(this.address))}`,
				});
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
	@import "../../static/zaiui/style/settlement.scss";
</style>
