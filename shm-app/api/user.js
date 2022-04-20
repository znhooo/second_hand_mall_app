import request from '../plugins/request/js/index';

export default {
	login(userInfo) {
		return request().request({
			url: "api/user/login",
			method: 'post',
			data: userInfo
		})
	},
	sendEmail(email){
		return request().request({
			url: `api/user/sendEmail/${email}`,
			method:"get",
		})
	},
	register(userInfo){
		return request().request({
			url: "api/user/register",
			method: 'post',
			data: userInfo
		})
	},
	alter(userInfo){
		return request().request({
			url: "api/user",
			method: 'put',
			data: userInfo
		})
	},
	getAddress(userId){
		return request().request({
			url: `api/user/getAddress/${userId}`,
			method: 'get',
		})
	},
	updateAddress(address){
		return request().request({
			url: `api/user/updateAddress`,
			method: 'put',
			data: address
		})
	},
	addAddress(address){
		return request().request({
			url: `api/user/addAddress`,
			method: 'post',
			data: address
		})
	},
	deleteAddress(id){
		return request().request({
			url: `api/user/deleteAddress/${id}`,
			method: 'delete',
		})
	},
	getContact(userId){
		return request().request({
			url: `api/user/getContact/${userId}`,
			method: 'get',
		})
	},
	updateContact(contact){
		return request().request({
			url: `api/user/updateContact`,
			method: 'put',
			data: contact
		})
	},
	getAddressById(id){
		return request().request({
			url: `api/user/getAddressById/${id}`,
			method: 'get',
		})
	},
}
