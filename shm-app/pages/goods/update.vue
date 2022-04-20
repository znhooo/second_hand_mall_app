<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor='bg-white'>
			<block slot="content">发布二手商品</block>
		</bar-title>
		<form @submit="submit">
			<view class="cu-form-group margin-top">
				<view class="title">商品名</view>
				<input placeholder="输入您的商品名称" name="name" v-model="goodInfo.name"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">价格</view>
				<input placeholder="输入您的商品价格" name="price" type="digit" v-model="goodInfo.price"></input>
				<text class='cuIcon-recharge text-orange'></text>
			</view>
			<view class="cu-form-group">
				<view class="title">发布地点</view>
				<input disabled="false" placeholder="点击获取商品的发布地点" name="site" @click="chooseSite" v-model="goodInfo.site"></input>
				<text class='cuIcon-locationfill text-orange'></text>
			</view>
			
			
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					商品图片
				</view>
				<view class="action">
					{{imgList.length}}/1
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
					 <image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<1">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			
			<view class="cu-form-group align-start">
				<view class="title">商品描述</view>
				<textarea maxlength="50" @input="textareaBInput" placeholder="输入您的商品描述" v-model="goodInfo.description"></textarea>
			</view>
			<view class="uni-btn-v">
				<button form-type="submit" type="primary">修改</button>
				<button form-type="reset">重置</button>
				<button type="warn" @tap="deleteTap">删除</button>
			</view>
		</form>
	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	import _tool from '@/static/zaiui/util/tools.js';
	import store from '@/store'
	import good from '@/api/good'
	export default {
		components:{
			barTitle
		},
		data() {
			return {
				imgList: [],
				textareaBValue: '',
				goodInfo:{},
				showDelete:false
			};
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		onLoad(option) {
			let info = JSON.parse(decodeURIComponent(option.goodInfo))
			if(info.goodImg){
				this.goodInfo.img = info.goodImg
				this.goodInfo.name = info.goodName
				this.goodInfo.site = info.site
				this.goodInfo.price = info.price
				this.goodInfo.description = info.description
				this.goodInfo.id = info.goodId
				this.goodInfo.latitude = info.latitude
				this.goodInfo.longitude = info.longitude
				this.imgList[0] = this.goodInfo.img
			}else{
				this.goodInfo = info
				this.imgList[0] = this.goodInfo.img
			}
			
		},
		methods: {
			deleteTap(){
				uni.showModal({
					title: '提醒',
					content: '确定要删除这个商品吗？',
					cancelText: '取消',
					confirmText: '删除',
					success: res => {
						if (res.confirm) {
							good.deleteGood(this.goodInfo.id).then(res => {
								uni.navigateBack({
									delta:2
								})
								plus.nativeUI.toast('删除成功')
							})
						}
					}
				})
				
			},
			submit(e){
				uni.showLoading()
				this.goodInfo.name = e.detail.value.name
				this.goodInfo.price = e.detail.value.price
				this.goodInfo.userId = store.state.userInfo.id
				uni.uploadFile({
					url:'http://192.168.0.107/api/good/updateGood',
					filePath:this.goodInfo.img[0],
					name: 'multipartFile',
					formData:{
						'id': this.goodInfo.id,
						'name': this.goodInfo.name,
						'latitude': this.goodInfo.latitude,
						'longitude': this.goodInfo.longitude,
						'description': this.goodInfo.description,
						'price': this.goodInfo.price,
						'site': this.goodInfo.site,
					},
					success: (res) => {
						uni.hideLoading()
						// #ifdef APP-PLUS
						plus.nativeUI.toast("修改成功")
						// #endif
						uni.navigateBack({
							delta:2
						})
					},
					fail: (err) => {
						console.log(err);
					}
				})
			},
			chooseSite(){
				uni.showLoading()
				uni.getLocation({
					type:'gcj02',
					geocode:true,
					success: (res) => {
						this.goodInfo.latitude = res.latitude
						this.goodInfo.longitude = res.longitude
						//this.goodInfo.site = res.address.province + '-' + res.address.city
						this.$set(this.goodInfo,'site',res.address.province + '-' + res.address.city)
						this.$forceUpdate()
						uni.hideLoading()
						uni.showToast({
							title:'获取成功'
						})
					}
				})
			},
			ChooseImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
							this.goodInfo.img = this.imgList
						} else {
							this.imgList = res.tempFilePaths
							this.goodInfo.img = this.imgList
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '提醒',
					content: '确定要删除这张图片吗？',
					cancelText: '取消',
					confirmText: '删除',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			textareaBInput(e) {
				this.goodInfo.description = e.detail.value
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
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
