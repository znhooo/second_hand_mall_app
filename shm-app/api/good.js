import request from '../plugins/request/js/index';

export default{
	getGoodData(current,limit,searchObj) {
		return request().request({
			url: `api/good/${current}/${limit}`,
			method: 'get',
			params: searchObj
		})
	},
	getSellGoods(id) {
		return request().request({
			url: `api/good/getSellGoods/${id}`,
			method: 'get',
		})
	},
	getBuyGoods(id) {
		return request().request({
			url: `api/good/getBuyGoods/${id}`,
			method: 'get',
		})
	},
	getSellGoodsCount(id) {
		return request().request({
			url: `api/good/getSellGoodsCount/${id}`,
			method: 'get',
		})
	},
	getBuyGoodsCount(id) {
		return request().request({
			url: `api/good/getBuyGoodsCount/${id}`,
			method: 'get',
		})
	},
	deleteGood(id) {
		return request().request({
			url: `api/good/deleteGood/${id}`,
			method: 'delete',
		})
	},
	
}