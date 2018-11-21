import request from '@/utils/request'


export function login(data) {
	return request({
	  url: '/api/admin/login',
	  method: 'post',
	  data
	})
}
  
export function signout() {
	return request({
		url: '/api/admin/logout',
		method: 'post'
	})
}

export function getUserList() {
	return request({
		url: '/api/user/list',
		method: 'get',
		params: { test: 'dfaf' }
	})
}

export function getAdminInfo() {
	return request({
		url: '/api/admin/info',
		method: 'get'
	})
}

export function getUserCount() {
	return request({
		url: '/api/user/count',
		method: 'get'
	})
}

export function checkSession() {
	return request({
		url: '/api/user/checkSession',
		method: 'get'
	})
}