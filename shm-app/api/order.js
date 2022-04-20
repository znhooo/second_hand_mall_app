import request from '../plugins/request/js/index';

export default{
	commitOrder(buyUserId,sellUserId,goodId,addressId) {
		return request().request({
			url: `api/order/commitOrder`,
			method: 'post',
			params: {
				buyUserId,sellUserId,goodId,addressId
			}
		})
	},
	getOrder(goodId) {
		return request().request({
			url: `api/order/getOrder/${goodId}`,
			method: 'get',
		})
	},
	updateOrder(order) {
		return request().request({
			url: `api/order/updateOrder`,
			method: 'put',
			data : order
		})
	},
	
	
}