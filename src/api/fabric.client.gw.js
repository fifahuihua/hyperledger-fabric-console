import request from '@/utils/request'

const queryTransaction = function(key) {
	return request({
		url: `/api/fabric/query/${key}`,
		method: 'get'
	})
};

export default {
	queryTransaction
}