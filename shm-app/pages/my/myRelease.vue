<template>
	<view>
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">我发布的</block>
		</bar-title>
		<view class="page_order" v-if="goodsData.length!=0">
			<view class="order_card">
				<view class="card" v-for="(item,index) in goodsData" :key="index">
					<view class="card_top">
						<!-- <view style="width: 80%;" class="font14">订单号：{{item.number}}</view> -->
						<text class="text-right text-yellow text-sm font14" v-if="item.status==4">上架中</text>
						<text class="text-right text-red text-sm font14" v-if="item.status==1">买家已下单，请尽快发货</text>
						<text class="text-right text-blue text-sm font14" v-if="item.status==2">已发货，等待买家签收</text>
						<text class="text-right text-green text-sm font14" v-if="item.status==3">已完成</text>
					</view>
					<u-line color="#eaeaea" :hairline="false"></u-line>
					<view class="card_medium"  @tap="goodCardTap(item)">
						<image :src="item.goodImg" class="card_img"></image>
						<view class="med_right">
							<view class="font16 fontbold med_right1">{{item.goodName}}</view>
							<view class="font12 med_right2">最后更新时间：{{item.updateTime}}</view>
							<view class="med_right3">
								<view class="font12" style="margin-left: 20rpx;">价格：</view>
								<view class="font12 col_red">￥</view>
								<view class="font16 col_red">{{item.price}}</view>
							</view>
						</view>
					</view>
					<view class="card_btm" v-if="item.status==4">
						<u-button class="btm1" shape="circle" type="error" :plain="true" @click="deleteTap(item.id)">删除</u-button>
						<u-button class="btm2" shape="circle" type="primary" :plain="true" @click="editClick(item)">编辑</u-button>
					</view>
					<view class="card_btm" v-else>
						<u-button class="btm2" type="primary" :plain="true" shape="circle" @tap="orderTap(item)">查看订单</u-button>
					</view>
				</view>
			</view>
		</view>
		<view class="zaiui-foot-tip-view" v-if="goodsData.length!=0">
			<view class="img-view">
				<view class="cu-avatar round" style="background-image:url('/static/zaiui/img/acn.png')"/>
			</view>
			<view class="text-gray">hi,到底啦~</view>
		</view>
		<view class="bg-white zaiui-null-view" v-else>
			<view class="img-view">
				<view class="cu-avatar lg round" style="background-image:url('/static/zaiui/img/aa6.png')"/>
			</view>
			<view class="text-sm margin-top-sm">您还没有相关订单哦</view>
		</view>
	</view>

</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	import good from '@/api/good';
	import _tool from '@/static/zaiui/util/tools.js';
	export default {
		components:{
			barTitle
		},
		onLoad(e) {
			this.id = e.id
		},
		onShow() {	
			good.getSellGoods(this.id).then(res => {
				this.goodsData = res.data.data
			})
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		data() {
			return {
				current:1,
				limit:6,
				searchObj:{},
				pages:0,
				status:'more',
				id:1,
				goodsData:[],
			}
		},
		methods: {
			orderTap(item){
				uni.navigateTo({
					url:`/pages/order/sell-details?goodInfo=${encodeURIComponent(JSON.stringify(item))}`
				})
			},
			deleteTap(id){
				uni.showModal({
					title: '提醒',
					content: '确定要删除这个商品吗？',
					cancelText: '取消',
					confirmText: '删除',
					success: res => {
						if (res.confirm) {
							good.deleteGood(id).then(res => {
								uni.navigateBack({
									delta:2
								})
								plus.nativeUI.toast('删除成功')
							})
						}
					}
				})
				
			},
			editClick(item){
				uni.navigateTo({
					url:`/pages/goods/update?goodInfo=${encodeURIComponent(JSON.stringify(item))}`
				})
			},
			goodCardTap(item){
				if(item.status==4){
					uni.navigateTo({
						url:`/pages/goods/second_hand?goodInfo=${encodeURIComponent(JSON.stringify(item))}&isMine=1`
					})
				}
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
	@import "../../static/zaiui/style/order-list.scss";
	.page_order {
		width: 100vw;
		min-height: 40vh;

		.col_red {
			color: red;
		}
		.font12{
			font-size: 12px;
		}
		.font14{
			font-size: 14px;
		}
		.font16{
			font-size: 16px;
		}
		.order_card {
			width: 100vw;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;

			.card {
				width: 92%;
				height: 400rpx;
				margin-top: 30rpx;
				border-radius: 10px;
				background-color: white;
				box-shadow: 1px 1px 5px #d5d5d5;

				.card_top {
					display: flex;
					padding: 15rpx;
				}

				.card_medium {
					width: 95%;
					height: 220rpx;
					display: flex;
					align-items: center;
					padding: 15rpx;

					.card_img {
						height: 180rpx;
						width: 180rpx;
						border-radius: 10px;
					}

					.med_right {
						height: 180rpx;
						margin-left: 20rpx;

						.med_right1 {
							margin-bottom: 30rpx;
						}

						.med_right2 {
							color: #909090;
							margin-bottom: 25rpx;
							
						}

						.med_right3 {
							display: flex;
							align-items: center;
						}
					}
				}

				.card_btm {
					display: flex;
					height: 80rpx;
					width: 100%;
					align-items: center;

					.btm1 {
						height: 60rpx;
						width: 180rpx;
						// background-color: #ffffff;
						// color: #25A785;
						// border: #25A785 1px solid;
						margin-left: 260rpx;
					}

					.btm2 {
						height: 60rpx;
						width: 180rpx;
						// background-color: #25A785;
						// color: white;
					}
				}
			}
		}
	}
</style>
