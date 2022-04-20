<!-- glance 商品列表 -->
<template name="good-list">
	<view class="glance-product-list">
		<!-- 商品列表 -->
		<view class="glance-products"  >
			<view style="width: 48%;" v-for="(item, index) in list_data" :key="index">
				<view class="glance-products-item" 	@click="goodsListTap(item,index)">
					<!-- 商品图片 --> 
					<image style="width: 100%;height: 180px;" :src="item.goodImg" mode="scaleToFill" @error="imgerr"></image>
					<!-- 短评 -->
					<view class="sigle-line-text shortlabel" v-if="item.shortlabel">{{item.shortlabel}}</view>
					<!-- 国家 原产地 -->
					<!-- <view></view> -->
					<!-- 营销标签 -->
					<view class="glance-products-item-marketinglabel">{{ item.site}} </view>
					<!-- 品名 -->
					<view class="sigle-line-text" style="margin-top: 5px;font-size: 15px;">{{ item.goodName}}</view>
					<!-- 价格 -->
					<view style="height: 30px;margin-top: 5px;" class="sigle-line-text">
						<!-- 当前价 -->
						<text class="glance-products-item-curprice">￥{{ item.price}}</text>
						<!-- 原始价 -->
						<text class="glance-products-item-oriprice">￥{{ item.price}}</text>
					</view>
					<!-- 评论 -->
					<view ></view>
					<view class="glance-products-item-comment" >
						<!-- 头像 -->
						<image class="glance-products-item-comment-icon" :src="item.avatar" mode="scaleToFill"></image>
						<!-- 评语 -->
						<view class="glance-products-item-comment-content">{{ item.userName}}</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		props: {
			list_data: {
				type: Array,
				default: () => {
					return []
				}
			},
		},
		methods: {
			imgerr: function(e) {
				console.error('图片资源发生error事件，错误信息' + e.detail.errMsg);
			},
			goodsListTap(item){
				this.$emit('list_tap',item)
			}
		}
	}
</script>

<style lang="scss">
	// 产品列表
	.glance-product-list{
		width: 100%;
		// 间隔预留
		background-color: #ffffff;
	}
	// 产品列表标题
	.glance-product-list-title{
		height: 50px;
		font-size: 15px;
		line-height:50px; 
		text-align: center;
	}
	// 产品
	.glance-products{
		width: 100%;
		display: flex;
		display: -webkit-flex;
		flex-flow: row wrap;
		align-items: center ;
		justify-content:space-start;
	}
	
	// 产品项目
	.glance-products-item{
		margin: 0 0 20px 15px;
		display: flex;
		display: -webkit-flex;
		flex-flow: row wrap;
		align-items: center ;
		justify-content: flex-start;
		// 营销标签
		&-marketinglabel{
			margin-top: 5px; 
			margin-bottom: 3px;
			padding: 0px 5px 0px 5px; 
			height: 10px;
			line-height:10px; 
			color: white;
			font-size:10px;
			background-color: #FF6600; 
			text-align: center;
		}
		// 当前价
		&-curprice{
			color: #f40;float: left;font-size: 16px;
			margin-right: 10px;
		}
		// 原始价
		&-oriprice{
			text-decoration:line-through;float: left;font-size: 13px;color: #999999;
		}
		// 评论
		&-comment{
			padding: 3px;
			border-radius:20px;
			-moz-border-radius:20px;
			-webkit-border-radius:20px;
			// align-items: center; 
			background-color: #F8F8F8 ;
			// 评论头像
			&-icon{
				padding: 1px; 
				// margin-right: 10px;
				height: 25px;
				width: 25px;
				float: left;
				border-radius:15px;
				-moz-border-radius:15px;
				-webkit-border-radius:15px;
			}
			// 评论内容
			&-content{
				text-align: left; 
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical; 
				color: #A8A8A8 ;
				font-size: 10px;
				//padding: 4px;
				line-height: 28px;
				padding-left: 5px;
				padding-right: 5px;
				
			}
		}
	}
	// 单行文本样式
	.sigle-line-text{
		width: 100%; 
		overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
		text-align: left;
		// padding-left: 5px;
	}
	// 短评
	.shortlabel{
		background-color: #FDF5E6; height: 30px;line-height: 30px;color: #DAA520 ;font-size: 15px;
	}
</style>
