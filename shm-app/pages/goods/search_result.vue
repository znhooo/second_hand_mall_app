<template>
	<view>
		<view class="zaiui-head-search-box" style="backgroundColor:rgb(229, 77, 66)">
			<!--搜索框-->
			<view class="cu-bar search zaiui-search-box">
				<view class="action" @tap="BackPage">
					<text class="cuIcon-back"/>
				</view>
				 <!-- @tap="searchTap" -->
				<view class="search-form round" @tap="searchTap">
					<text class="cuIcon-search"/>
					<text>{{searchObj.keyword}}</text>
				</view>
				<view class="action text-white">分类</view>
			</view>
		</view>
		<view v-if="total!=0">
			<view class="zaiui-goods-tab-box">
				<scroll-view scroll-x class="nav z margin-tb-sm">
					<view class="flex text-center">
						<block v-for="(item,index) in goodsTabData.list" :key="index">
							<view class="cu-item flex-sub nf" :class="index==goodsTabData.TabCur?'select':''" @tap="goodsTab" :data-id="index">
								<view :class="index == goodsTabData.TabCur?'text-red':''">{{item.title}}</view>
								<view class="tab-dot bg-red" />
							</view>
						</block>			
					</view>
				</scroll-view>
			</view>
			<good-list :list_data="goodsData" @list_tap="goodsListTap"></good-list>
			<uni-load-more :status="status" v-if="pages>1"></uni-load-more>
			<uni-load-more status="noMore" v-else></uni-load-more>
			
			
		</view>
		
		<view v-else>
			<u-empty
			        mode="search"
			        icon="http://cdn.uviewui.com/uview/empty/search.png"
			>
			</u-empty>
		</view>
		
	</view>
</template>

<script>
	import goodList from '@/components/zaiui-common/list/good-list'
	import good from '@/api/good'
	export default {
		components: {
			goodList
		},
		onLoad(e) {
			this.searchObj.keyword = e.keyword
			good.getGoodData(this.current,this.limit,this.searchObj).then(res => {
				this.goodsData = res.data.data.data
				this.total = res.data.data.total
				this.pages = res.data.data.pages
			})
		},
		onReachBottom() {
			this.setReachBottom()
		},
		data() {
			return {
				goodsTabData:{
					TabCur: 0,
					list:[
						{title: '推荐',tag: ''},
						{title: '最新',tag: ''},
						{title: '价格降序',tag: ''},
						{title: '价格升序',tag: ''},
					],
				},
				status:'more',
				goodsData:[],
				searchObj:{},
				current:1,
				limit:6,
				total:0,
				pages:0
			}
		},
		methods: {	
			setReachBottom() {
				this.status = 'loading'
				this.current++
				if(this.current > this.pages){
					uni.showToast({
						title:'没有更多了',
						icon:'none'
					})
					this.status = 'noMore'
				}else{
					good.getGoodData(this.current,this.limit,this.searchObj).then(res => {
						this.goodsData = [...this.goodsData,...res.data.data.data]
						this.status = 'more'
					})
				}
				
			},
			goodsTab(e) {
				uni.showLoading({
					title:'加载中'
				})
				this.current = 1
				this.status = 'more'
				this.goodsTabData.TabCur = e.currentTarget.dataset.id;
				uni.pageScrollTo({
				    scrollTop: 5,
				    duration: 200
				});
				if(this.goodsTabData.TabCur == 0){
					this.searchObj.timeSort = false
					this.searchObj.priceDescSort = false
					this.searchObj.priceAscSort = false
				}else if(this.goodsTabData.TabCur == 1){
					this.searchObj.timeSort = true
					this.searchObj.priceDescSort = false
					this.searchObj.priceAscSort = false
				}else if(this.goodsTabData.TabCur == 2){
					this.searchObj.timeSort = false
					this.searchObj.priceDescSort = true
					this.searchObj.priceAscSort = false
				}else if(this.goodsTabData.TabCur == 3){
					this.searchObj.timeSort = false
					this.searchObj.priceDescSort = false
					this.searchObj.priceAscSort = true
				}
				good.getGoodData(this.current,this.limit,this.searchObj).then(res => {
					this.goodsData = res.data.data.data
					this.pages = res.data.data.pages
					uni.hideLoading()
				})
			
			},
			BackPage(){
				uni.navigateBack({
					
				})
			},
			goodsListTap(data) {
				uni.navigateTo({
					url: `/pages/goods/second_hand??goodInfo=${encodeURIComponent(JSON.stringify(data))}`
				});
			},
			searchTap(){
				uni.navigateBack({
					animationType:'slide-out-right'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* #ifdef APP-PLUS */
		@import "../../static/colorui/main.css";
		@import "../../static/colorui/icon.css";
		@import "../../static/zaiui/style/app.scss";
	/* #endif */
	.zaiui-head-search-box {
		position: sticky;
		width: 100%;
		top: 0;
		z-index: 9999;
		background-color: rgba(229, 77, 66,0);
		padding-top: var(--status-bar-height);
		transition: top .25s;
		padding-bottom: 10rpx;
		.zaiui-search-box {
			position: relative;
		}
	}
	.zaiui-goods-tab-box {
		position: sticky;
		padding: 2rpx 0;
		transition: all .25s;
		z-index: 9999;
		background: #fff;
		
		/* #ifndef MP */
		top: calc(var(--status-bar-height) + 101rpx);
		/* #endif */
		
		/* #ifdef MP */
		top: calc(var(--status-bar-height) + 161rpx);
		/* #endif */
		
		.cu-tag.z {
			top: 0px;
			right: -32.72rpx;
			font-size: 20rpx;
			padding: 19rpx 6rpx;
			transform: scale(0.8);
		}
	}
</style>
