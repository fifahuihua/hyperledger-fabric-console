import request from '@/utils/request'

const checkAppVersion = function(appType) {
	return request({
		url: `/api/env/checkVersion/${appType}`,
		method: 'get'
	})
};

const checkAllApp = function() {
	return true;
};

export default {
	checkAppVersion,
	checkAllApp
}