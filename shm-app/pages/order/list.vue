<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor='bg-white'>
			<block slot="content">我买到的</block>
			<!-- <block slot="right">
				<text v-if="goods_checked">完成</text>
				<text v-else>编辑</text>
			</block> -->
		</bar-title>
		
		
		<!--订单列表-->
		<block v-for="(item,index) in goodsData">
			<view class="bg-white zaiui-order-tab-view">
				<!--店铺名称-->
				<view class="shop-title-view">
					<view class="cu-avatar sm round" :style="[{backgroundImage:'url('+ item.avatar +')'}]"/>
					<view class="text-black text-cut shop-name">{{item.userName}}</view>
					<text class="text-right text-blue text-sm" v-if="item.status==1">已下单，等待卖家发货</text>
					<text class="text-right text-red text-sm" v-if="item.status==2">卖家已发货，等待签收</text>
					<text class="text-right text-green text-sm" v-if="item.status==3">已完成</text>
				</view>
				<!--商品列表-->
				<view class="goods-list-view"  @tap="detailsTap(item)">
					<view class="cu-avatar lg radius" :style="[{backgroundImage:'url('+ item.goodImg +')'}]"/>
					<view class="goods-info-view">
						<view class="text-black text-cut name">{{item.goodName}}</view>
						<view class="text-gray text-sm text-cut introduce">{{item.description}}</view>
						<!-- <view class="text-cut tag-view">
							<block v-for="(item_s,index_s) in items.tag" :key="index_s">
								<text class="cu-tag sm line-blue radius">{{item_s}}</text>
							</block>
						</view> -->
						<view class="text-price text-red">{{item.price}}</view>
					</view>
				</view>
				<!--统计-->
				<view class="statistics-view">
					<view class="text-black text-sm text-right">
						<text>共1件</text>
						<text>商品 实付款：</text>
						<!-- <text>商品 应付款：</text> -->
						<text class="text-price text-lg">{{item.price}}</text>
					</view>
				</view>
				<!--按钮-->
				<view class="zaiui-btn-view">
					<button class="cu-btn line-black sm radius" @tap="contact(item.sellUserId)">联系卖家</button>
					<button class="cu-btn line-black sm radius" @tap="whereaboutsTap">查看钱款去向</button>
					<!-- <button class="cu-btn line-red sm radius" @tap="appraiseTap">查看评价</button> -->
				</view>
			</view>
		</block>
		
		<!--无数据-->
		<view class="bg-white zaiui-null-view" v-if="goodsData.length==0">
			<view class="img-view">
				<view class="cu-avatar lg round" style="background-image:url('/static/zaiui/img/aa6.png')"/>
			</view>
			<view class="text-sm margin-top-sm">您还没有相关订单哦</view>
		</view>
		
		
		<!--到底了-->
		<view class="zaiui-foot-tip-view" v-if="goodsData.length!=0">
			<view class="img-view">
				<view class="cu-avatar round" style="background-image:url('/static/zaiui/img/acn.png')"/>
			</view>
			<view class="text-gray">hi,到底啦~</view>
		</view>

	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	
	import _sort_grid from '@/static/zaiui/data/order_list.js';	//虚拟数据
	import _tool from '@/static/zaiui/util/tools.js';
	import good from '@/api/good'
	import store from '@/store'
	export default {
		components: {
			barTitle,
		},
		data() {
			return {
				goodsData:[],
				id:1,
			}
		},
		onShow() {	
			this.id = store.state.userInfo.id
			good.getBuyGoods(this.id).then(res => {
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
		methods: {
			contact(userId){
				uni.navigateTo({
					url:`/pages/goods/sell-contact?userId=${userId}`
				})
			},
			whereaboutsTap() {
				uni.navigateTo({
					url: "/pages/order/whereabouts"
				});
			},
			appraiseTap() {
				uni.navigateTo({
					url: "/pages/order/view_appraise"
				});
			},
			detailsTap(item) {
				uni.navigateTo({
					url: `/pages/order/details?goodInfo=${encodeURIComponent(JSON.stringify(item))}`
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
	@import "../../static/zaiui/style/order-list.scss";
</style>
