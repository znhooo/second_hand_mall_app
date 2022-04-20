<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">联系卡</block>
		</bar-title>
		
		<!--提示栏-->
		<view class="bg-red light text-sm padding-sm">
			<text class="cuIcon-warnfill"/>
			<text class="margin-left-xs">
				重要交易信息建议在平台内进行沟通，并务必在平台内下单及付款，切勿私下转账交易！走平台担保更安全~
			</text>
		</view>
		
		<view class="bg-white padding">
			<view class="text-lg text-black margin-bottom">Ta的联系卡</view>
			<view class="text-sm text-gray">
				您可以选择以下一种或多种联系方式，与ta沟通
			</view>
		</view>
		
		<view class="bg-white padding form-view">
			<view class="text-black title">微信</view>
			<input placeholder="该卖家暂未填写微信号" disabled :value="contact.wx"/>
		</view>
		<view class="bg-white padding form-view">
			<view class="text-black title">QQ号</view>
			<input placeholder="该卖家暂未填写QQ号" disabled :value="contact.qq"/>
		</view>
		<view class="bg-white padding form-view">
			<view class="text-black title">手机号</view>
			<input placeholder="该卖家暂未填写手机号" disabled :value="contact.phone"/>
		</view>
		
	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	import _tool from '@/static/zaiui/util/tools.js';	//工具函数
	import user from '@/api/user'
	export default {
		components: {
			barTitle
		},
		data() {
			return {
				contact:{}
			}
		},
		onLoad(option) {
			user.getContact(option.userId).then(res => {
				this.contact = res.data.data
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
			save(){
				user.updateContact(this.contact).then(res => {
					uni.navigateBack()
					// #ifdef APP-PLUS
						plus.nativeUI.toast("保存成功")
					// #endif
				})
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
	page {
		background: #FFFFFF;
	}
	.form-view {
		border-bottom: 2rpx solid #f5f5f5;
		.title {
			margin-bottom: 27.27rpx;
		}
		input {
			color: #333333;
		}
	}
</style>
