<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">订单详情</block>
		</bar-title>
		
		<!--步骤条区域-->
		<view class="bg-white padding solid-top">
			<!--步骤条-->
			<view class="cu-steps">
				<block v-for="(item,index) in basicsList" :key="index">
					<view class="cu-item" :class="index>basics?'':'select'">
						<view class="icon-view" v-if="index>basics">
							<text class="text-red" :class="'cuIcon-' + item.cuIcon"></text>
						</view>
						<view class="bg-red icon-view" v-else>
							<text :class="'cuIcon-' + item.cuIcon"></text>
						</view>
						<view class="text-sm text-black" v-if="index>basics">{{item.name}}</view>
						<view class="text-sm text-black" v-else>{{item.name_s}}</view>
					</view>
				</block>
			</view>
			
			<!--提示-->
			<view class="text-sm text-center margin-top" v-if="basics == 0">
				<view class="text-black">支付成功，待卖家发货.</view>
			</view>
			<view class="text-sm text-center margin-top" v-if="basics == 1">
				<view class="text-black">快递正在路上，务必在收到商品后再确认收货。</view>
			</view>
		</view>
		
		<!--状态图标-->
		<view class="bg-white padding solid-top text-center zaiui-status-img-view" v-if="basics == 2 && !cancel">
			<view class="are-img-view" @tap="cancel = true">
				<image class="are-img" src="/static/zaiui/img/are.png" mode="widthFix"/>
			</view>
			<view class="text-sm text-black">订单已完成</view>
		</view>

		
		<!--物流信息-->
		<view class="bg-white zaiui-card-box" v-if="basics != 0">
			<view class="zaiui-card-view zaiui-address-view">
				<view class="">
					<text class="text-bold text-black text-lg">您的收货地址</text>
					<text class="verbose" v-if="basics!=0" @tap="trackTap">点击查看物流信息</text>
				</view>
				<view class="solid-line"></view>
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="bg-grey icon-view">
							<text class="cuIcon-locationfill"/>
						</view>
						<view class="content">
							<view class="text-black">
								<text>收货人：</text>
								<text>仔仔</text>
								<text class="margin-left">{{address.name}}</text>
							</view>
							<view class="text-gray text-sm flex">
								<view class="text-cut">{{address.region}}  {{address.verbose}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!--商品信息-->
		<view class="bg-white zaiui-card-box">
			<view class="zaiui-card-view zaiui-shop-view">
				<view class="shop-info-view">
					<view class="cu-avatar round sm" :style="[{backgroundImage:'url('+ goodInfo.avatar +')'}]"/>
					<view class="text-black text-bold text-lg title-view">{{goodInfo.userName}}</view>
				</view>
				<view class="goods-list-view">
					<view class="cu-avatar radius" :style="[{backgroundImage:'url('+ goodInfo.goodImg +')'}]"/>
					<view class="goods-info-view">
						<view class="text-black text-cut name">{{goodInfo.goodName}}</view>
						<view class="text-gray text-sm text-cut introduce">{{goodInfo.description}}</view>
						<view class="text-price text-red text-lg">{{goodInfo.price}}</view>
					</view>
				</view>
			</view>
		</view>
		
		<!--商品金额-->
		<view class="bg-white zaiui-card-box">
			<view class="zaiui-card-view zaiui-price-view">
				<view class="text-black title-view">
					<view class="title">商品总额</view>
					<view class="text-right">
						<text class="text-price">{{goodInfo.price}}</text>
					</view>
				</view>
				<view class="text-black title-view">
					<view class="title">运费</view>
					<view class="text-right">
						<text class="margin-right-xs">+</text>
						<text class="text-price">0.00</text>
					</view>
				</view>
				<view class="text-black text-bold title-right-view">
					<text class="margin-right-xs">应付款：</text>
					<text class="text-price">{{goodInfo.price}}</text>
				</view>
				
				<view class="solid-line"></view>
				
				<view class="text-center text-black" @tap="contact">联系客服</view>
			</view>
		</view>
		
		<!--订单信息-->
		<view class="bg-white zaiui-card-box">
			<view class="zaiui-card-view zaiui-order-view">
				<view class="text-lg text-bold text-black">订单信息</view>
				<view class="solid-line"></view>
				<view class="text-black title-view">
					<view class="title">订单编号</view>
					<view class="text-right">
						<text class="margin-right-xs">{{orderInfo.orderId}}</text>
					</view>
				</view>
				<view class="text-black title-view">
					<view class="title">支付方式</view>
					<view class="text-right">
						<text>在线支付(已支付)</text>
					</view>
				</view>
				<view class="text-black title-view">
					<view class="title">下单时间</view>
					<view class="text-right">
						<text>{{orderInfo.createTime}}</text>
					</view>
				</view>
				<view class="text-black title-view">
					<view class="title">支付时间</view>
					<view class="text-right">
						<text>{{orderInfo.createTime}}</text>
					</view>
				</view>
				<view class="text-black title-view" v-if="basics > 0">
					<view class="title">发货时间</view>
					<view class="text-right">
						<text>{{orderInfo.dispatchTime}}</text>
					</view>
				</view>
				<view class="text-black title-view" v-if="basics > 1">
					<view class="title">完成时间</view>
					<view class="text-right">
						<text>{{orderInfo.updateTime}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="bg-white zaiui-card-hight-box"/>
		
				
		<!--底部-->
		<view class="foot-hight-view"/>
		
		<view class="bg-white zaiui-footer-fixed zaiui-foot-padding-bottom" v-if="basics == 0">
			<button class="cu-btn line-black radius" @tap="contact">联系卖家</button>
			<button class="cu-btn bg-red">提醒发货</button>
		</view>
		
		<view class="bg-white zaiui-footer-fixed zaiui-foot-padding-bottom" v-if="basics == 1">
			<button class="cu-btn line-black radius" @tap="contact">联系卖家</button>
			<button class="cu-btn bg-red" @tap="confirmReceipt">确认收货</button>
		</view>
		
		<view class="bg-white zaiui-footer-fixed zaiui-foot-padding-bottom" v-if="basics == 2">
			<button class="cu-btn line-black radius" @tap="contact">联系卖家</button>
			<button class="cu-btn bg-red" @tap="whereaboutsTap">查看钱款去向</button>
		</view>
		
	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	import _tool from '@/static/zaiui/util/tools.js';	//工具函数
	import order from '@/api/order'
	import user from '@/api/user'
	export default {
		components: {
			barTitle
		},
		data() {
			return {
				basics: 0,
				bg_img: '/static/images/home/goods/1.png', 
				avatar: '/static/images/avatar/1.jpg', 
				cancel: false,
				basicsList: [
					{cuIcon: 'card',name: '待付款', name_s: '已付款'},
					{cuIcon: 'deliver_fill',name: '待发货', name_s: '已发货'},
					{cuIcon: 'presentfill',name: '待收货', name_s: '已收货'}
				],
				bottomModal: false, 
				codeKey: [], 
				btnKey: true,
				goodInfo:{},
				orderInfo:{},
				address:{}
			}
		},
		onLoad(option) {
			uni.showLoading({
				title:'加载中'
			})
			this.goodInfo = JSON.parse(decodeURIComponent(option.goodInfo))
			order.getOrder(this.goodInfo.goodId).then(res => {
				this.orderInfo = res.data.data
				user.getAddressById(this.orderInfo.addressId).then(res => {
					this.address = res.data.data
					uni.hideLoading()
				})
			})
			this.basics = this.goodInfo.status - 1	
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		methods: {
			whereaboutsTap() {
				uni.navigateTo({
					url: "/pages/order/whereabouts"
				});
			},
			trackTap(){
				uni.showModal({
					title:'快递单号:',
					content:this.orderInfo.track,
					confirmText: '确认',
					showCancel:false
				})
			},
			contact(){
				uni.navigateTo({
					url:`/pages/goods/sell-contact?userId=${this.goodInfo.sellUserId}`
				})
			},
			nextTap() {
				this.basics = this.basics == this.basicsList.length - 1 ? 0 : this.basics + 1;
			},
			confirmReceipt() {
				uni.showModal({
				    title: '收货提醒',
				    content: '请务必确认已收到商品后再确认收货，让您提前确认收货的都是骗子、不走平台交易的都是骗子、让您私下打款的都是骗子',
					confirmText: '确认收货',
					confirmColor: '#0081ff',
					class: 'zaiui-modal',
				    success: res => {
				        if (res.confirm) {
							uni.showLoading({
								title:'加载中'
							})
							this.orderInfo.status = 3
							order.updateOrder(this.orderInfo).then(res => {
								order.getOrder(this.goodInfo.goodId).then(res => {
									this.orderInfo = res.data.data
									this.goodInfo.status = this.orderInfo.status
									this.basics = this.goodInfo.status - 1
									this.$forceUpdate()
									uni.hideLoading()
									uni.showToast({
										title:'确认收货成功'
									})
								})
							})
				        }
				    }
				});
			},
			closeModalTap () {
				this.bottomModal = false;
			},
			codeKeyTap (index) {
				if(this.codeKey.length < 4) {
					this.codeKey.push(index);
				}
			},
			codeKeyDelTap() {
				this.codeKey.pop();
			},
			getCodeKey() {
				this.btnKey = false;
			},
			appraiseTap() {
				uni.navigateTo({
					url: "/pages/order/appraise"
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
	@import "../../static/zaiui/style/order-details.scss";
	.verbose{
		float: right;
	}
</style>
