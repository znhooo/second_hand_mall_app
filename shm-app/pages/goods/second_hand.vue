<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor='bg-white'>
			<block slot="content">商品详情</block>
			<block slot="right">
				<!-- <text class="cuIcon-forward"/> -->
				<!-- <text class="cuIcon-more"/> -->
			</block>
		</bar-title>
		
		<!--Tab栏占位-->
		<!-- <view class="zaiui-scroll-height-view" v-if="!barShow"/> -->
		
		<!--商品简介-->
		<view class="bg-white padding zaiui-goods-synopsis-view">
			<view class="user-view">
				<view class="cu-avatar sm round" v-if="goodInfo.userName" :style="'background-image:url('+goodInfo.avatar+')'"/>
				<view class="text-black text-name" v-if="goodInfo.userName">{{goodInfo.userName}}</view>
				<text class="text-gray text-sm text-right-view">发布时间: {{goodInfo.createTime}}</text>
			</view>
			<view class="margin-tb-lg price-view">
				<text class="text-price text-red text-xxl">{{goodInfo.price}}</text>
				<text class="text-through text-gray text-sm">原件￥{{goodInfo.price}}</text>
				<text class="text-gray text-sm">包邮</text>
			</view>
			<view class="text-xl text-black">{{goodInfo.goodName}}</view>
			<view class="text-sm margin-top-sm zaiui-map-view">
				<view class="text-cut cut-view">{{goodInfo.site}}</view>
				<view class="text-right-view" @tap="seeLocation">
					<text class="text-view">查看宝贝位置</text>
					<text class="cuIcon-right"/>
				</view>
			</view>
		</view>
		
		
		
		<!--商品详情-->
		<view class="margin-top padding bg-white zaiui-details-view-box">
			<view class="text-black text-xl title-view">商品详情</view>
			
			
			<view class="text-black zaiui-text-content-view">{{goodInfo.description}}</view>
			
			<view class="zaiui-img-box">
				<image :src="goodInfo.goodImg" mode="widthFix" @tap="lookImg"/>
				<!-- <image src="/static/images/home/goods/12.png" mode="widthFix"/> -->
			</view>
			
			<view class="zaiui-border-view"/>
			
			<view class="title-view">
				<text class="text-black">快捷交易</text>
				<text class="text-gray text-sm margin-left">平台担保交易</text>
			</view>
			
			<view class="bg-white zaiui-steps-view">
				<view class="cu-steps steps-arrow">
					<view class="cu-item">
						<text class="cuIcon-send text-blue"/>
						<text class="text-black">卖家邮寄</text>
						<view class="text-gray text-sm">包邮到家</view>
					</view>
					<view class="cu-item">
						<text class="cuIcon-same text-blue"/>
						<text class="text-black">平台确认</text>
						<view class="text-gray text-sm">担保交易</view>
					</view>
					<view class="cu-item">
						<text class="cuIcon-deliver text-blue"/>
						<text class="text-black">买家确认</text>
						<view class="text-gray text-sm">一步到位</view>
					</view>
				</view>
			</view>
			
			<view class="text-right text-gray margin-top text-sm">
				<text>1人想要</text>
				<text class="cuIcon-titles margin-lr-xs"/>
				<text>106次浏览</text>
			</view>
		</view>
		
		<!--关于卖家-->
		<view class="margin-top bg-white zaiui-selll-user-view-box" v-if="userId!=goodInfo.sellUserId&&goodInfo.userName">
			<view class="padding text-black text-lg">关于卖家</view>
			<view class="cu-list menu-avatar" @tap="showContact">
				<view class="cu-item">
					<view class="cu-avatar round" :style="'background-image:url('+goodInfo.avatar+')'"/>
					<view class="content">
						<view class="text-black">
							<view class="text-cut">{{goodInfo.userName}}</view>
							<view class="cu-tag radius bg-blue sm">
								<text class="cuIcon-myfill"/>
							</view>
						</view>
						<view class="flex">
							<text class="text-sm text-gray">点击查看ta的联系卡</text>
						</view>
					</view>
					<view class="action">
						<view class="cuIcon-right text-gray"/>
					</view>
				</view>
			</view>
			<view class="padding zaiui-grid-tab-view">
				<!-- <view class="grid text-center col-3 bg-gray">
					<view class="item-view">
						<view class="text-lg">1</view>
						<view class="text-gray text-sm">在售宝贝</view>
					</view>
					<view class="item-view">
						<view class="text-lg">55</view>
						<view class="text-gray text-sm">累计交易</view>
					</view>
					<view class="item-view">
						<view class="text-lg">80%</view>
						<view class="text-gray text-sm">回复率</view>
					</view>
				</view> -->
			</view>
			
		</view>
		
		<!--互动-->
		<!-- <view class="margin-top padding bg-white zaiui-interaction-view-box" >
			<view class="padding-bottom text-black text-lg" v-if="interaction">互动</view>
			<view class="padding-bottom text-black text-lg" v-else>互动（ 3 ）</view>
			<view class="zaiui-null-view" v-if="interaction">
				<view class="text-view-box">「问卖家」想知道更多宝贝细节</view>
				<button class="cu-btn bg-red round" @tap="interaction = false">点击提问</button>
			</view>
			<view class="zaiui-interaction-view" v-else>
				<view class="padding-tb-sm user-input-view">
					<view class="cu-avatar round" style="background-image:url(/static/images/avatar/1.jpg);"/>
					<view class="input-view-box">
						<view class="arrow-view"/>
						<input class="input-view" placeholder="问问更多细节吧~"></input>
						<button class="cu-btn bg-red">留言</button>
					</view>
				</view>
				<view class="zaiui-interaction-list-view">
					<view class="list-itme">
						<view class="cu-avatar round" style="background-image:url(/static/images/avatar/2.jpg);"/>
						<view class="view-box">
							<view class="title-box">
								<text class="margin-right-xs">仔仔</text>
								<text class="text-sm">6小时前</text>
							</view>
							<view class="text-black content-box">
								特别提示:请千万不要脱离平台进行交易，避免财物损失。谨防通过微信、支付宝加好友进行商品支付、转账、付押金等欺诈行为!
							</view>
							<view class="padding-sm radius zaiui-comment-view">
								<view class="text-sm user-name-box">
									<text>仔仔111</text>
									<text class="cu-tag light bg-red sm radius">楼主</text>
									<text>5小时前</text>
								</view>
								<view class="zaiui-reply-view">
									<text class="text-black">回复</text>
									<text class="text-blue">@仔仔</text>
									<text class="text-black">： 是的，都写的很清楚了</text>
								</view>
							</view>
						</view>
					</view>
					<view class="list-itme">
						<view class="cu-avatar round" style="background-image:url(/static/images/avatar/3.jpg);"/>
						<view class="view-box">
							<view class="title-box">
								<text class="margin-right-xs">仔仔33</text>
								<text class="text-sm">2小时前</text>
							</view>
							<view class="text-black content-box">
								测试的。
							</view>
						</view>
					</view>
					<view class="list-itme">
						<view class="cu-avatar round" style="background-image:url(/static/images/avatar/4.jpg);"/>
						<view class="view-box">
							<view class="title-box">
								<text class="margin-right-xs">仔仔444</text>
								<text class="text-sm">1小时前</text>
							</view>
							<view class="text-black content-box">
								测试的以下效果
							</view>
						</view>
					</view>
					<view class="padding-top text-center text-blue">展开更多</view>
				</view>
			</view> -->
			<!-- <view class="zaiui-border-view"/>
			<view class="padding-bottom text-black text-lg">大家都想问</view>
			<view class="zaiui-tag-view-box">
				<view class="cu-tag light bg-red round">
					<text class="margin-right-xs">有发票吗？</text>
					<text class="cuIcon-creativefill"/>
				</view>
				<view class="cu-tag light bg-red round">
					<text class="margin-right-xs">是否包邮？</text>
					<text class="cuIcon-creativefill"/>
				</view>
				<view class="cu-tag light bg-red round">
					<text class="margin-right-xs">包装小票还在吗？</text>
					<text class="cuIcon-creativefill"/>
				</view>
				<view class="cu-tag light bg-red round">
					<text class="margin-right-xs">宝贝是全新的吗？</text>
					<text class="cuIcon-creativefill"/>
				</view>
			</view>
			<view class="zaiui-tag-text-view-box">
				<view class="text-cut">
					<text class="cu-tag line-red radius sm">问</text>
					<text class="text-black margin-lr-xs">能便宜点吗？</text>
					<text class="text-gray text-sm">答：可以小刀</text>
				</view>
				<view class="text-cut">
					<text class="cu-tag line-red radius sm">问</text>
					<text class="text-black margin-lr-xs">走平台，支持转转验机吗？</text>
					<text class="text-gray text-sm">答：可以小刀</text>
				</view>
			</view>
			<view class="zaiui-border-view"/>
			<view class="text-center text-blue">查看更多问答</view> -->
		<!-- </view> -->
		
		
		
		<!--占位底部距离-->
		<view class="cu-tabbar-height"></view>
		
		<!--底部操作-->
		<view class="bg-white zaiui-footer-fixed zaiui-foot-padding-bottom" v-if="userId!=goodInfo.sellUserId">
			<view class="cu-bar">
				<view class="flex flex-wrap">
					<view class="basis-xs">
						<view class="text-center">
							<view class="cuIcon-like"/>
							<view class="text-sm">想要</view>
						</view>
					</view>
					<view class="basis-sm">
						<view class="btn-view">
							<button class="cu-btn bg-orange radius shadow-blur" @tap="showContact">聊一聊</button>
						</view>
					</view>
					<view class="basis-sm">
						<view class="btn-view">
							<button class="cu-btn bg-red radius shadow-blur" @tap="buy">马上买</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="bg-white zaiui-footer-fixed zaiui-foot-padding-bottom" v-if="userId==goodInfo.sellUserId">
			<view class="cu-bar" >
				<view class="flex flex-wrap" style="display: flex;justify-content: center;">
					<view class="basis-sm">
						<view class="btn-view">
							<button class="cu-btn bg-red radius shadow-blur" @tap="edit">编辑</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	
	import _goods_data from '@/static/zaiui/data/goods.js';	//虚拟数据
	import _tool from '@/static/zaiui/util/tools.js';	//工具函数
	import store from '@/store'
	export default {
		components: {
			barTitle,
		},
		data() {
			return {
				bannerCur: 0, 
				bannerList: [], 
				bottomModal: false, 
				modalTitle: '', 
				modalType: 'promotion', 
				selectType: '',
				interaction: true, 
				TabCur: 0, 
				goodInfo:{},
				userId:1,
				isMine:false
			}
		},
		onLoad(option) {
			let info = JSON.parse(decodeURIComponent(option.goodInfo))
			this.goodInfo = info
			this.userId = store.state.userInfo.id
			if(option.isMine){
				this.isMine = true
			}
			
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		methods: {
			buy(){
				uni.navigateTo({
					url:`/pages/goods/settlement?goodInfo=${encodeURIComponent(JSON.stringify(this.goodInfo))}`,
				})
			},
			showContact(){
				uni.navigateTo({
					url:'/pages/goods/sell-contact?userId='+this.goodInfo.sellUserId
				})
			},
			edit(){
				uni.navigateTo({
					url:`/pages/goods/update?goodInfo=${encodeURIComponent(JSON.stringify(this.goodInfo))}`,
					animationType:'slide-in-bottom',
					fail: (err) => {
						console.log(err);
					}
				})
			},
			lookImg(){
				uni.previewImage({
					urls:[this.goodInfo.goodImg],
				})
			},
			seeLocation(){
				uni.openLocation({
					latitude:this.goodInfo.latitude,
					longitude:this.goodInfo.longitude,
				})
			},
			getttImgUrl(url) {
				return _tool.getttImgUrl(url);
			},
			serviceTap() {
				this.modalTitle = "服务";
				this.modalType = 'service';
				this.showModal();
			},
			showModal() {
				this.bottomModal = true;
			},
			hideModal(e) {
				this.bottomModal = false;
				this.modalTitle = "";
				this.modalType = '';
			},
			setSwiperItem(indexs,index) {
				let max = (index + 1) * 4;
				let min = max - 4;
				let num = indexs + 1;
				if(num > min && num <= max) {
					return true;
				} else {
					return false;
				}
			},
			tabSelect(e) {
				let index = e.currentTarget.dataset.id;
				this.TabCur = index;
				if(index == 0) {
					uni.pageScrollTo({
					    scrollTop: 300,
					    duration: 200
					});
				}
				if(index == 1) {
					uni.pageScrollTo({
					    scrollTop: 1418,
					    duration: 200
					});
				}
				if(index == 2) {
					uni.pageScrollTo({
					    scrollTop: 1723,
					    duration: 200
					});
				}
				if(index == 3) {
					uni.pageScrollTo({
					    scrollTop: 2413,
					    duration: 200
					});
				}
			}
		},
		onPageScroll(e) {
			this.scrollY = e.scrollTop;
			//console.log(e.scrollTop);
			//由于无法获取元素距离顶部的距离，所以，暂时关闭以下功能。
			/*if (this.scrollY < 270) {
				this.TabCur = 0;
				this.barShow = true;
			}
			if (this.scrollY >= 310 && this.scrollY < 1418) {
				this.TabCur = 0;
				this.barShow = false;
			}
			if (this.scrollY >= 1418 && this.scrollY < 1723) {
				this.TabCur = 1;
			}
			if (this.scrollY >= 1723 && this.scrollY < 2413) {
				this.TabCur = 2;
			}
			if (this.scrollY >= 2413) {
				this.TabCur = 3;
			}*/
		},
	}
</script>

<style lang="scss">
	/* #ifdef APP-PLUS */
		@import "../../static/colorui/main.css";
		@import "../../static/colorui/icon.css";
		@import "../../static/zaiui/style/app.scss";
	/* #endif */
	@import "../../static/zaiui/style/second_hand.scss";
</style>
