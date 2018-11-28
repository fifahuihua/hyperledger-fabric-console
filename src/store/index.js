import Vue from 'vue'
import Vuex from 'vuex'
import {checkSession} from '@/api/user.client.gw'

Vue.use(Vuex)

const state = {
	loginUser: null,
	allAppsChecked: false
}

const mutations = {
	userLogin(state, loginUser) {
		state.loginUser = loginUser;
	},
	checkAllApps(state, result) {
		state.allAppsChecked = result;
	}
}

const actions = {
	async checkAllApps({commit}) {
		commit('checkAllApps', true);
	},
	async checkSession({commit}) {
		try{
			const res = await checkSession()
			if (res.data.status == 'success') {
				commit('userLogin', res.data.user);
			}else{
				throw new Error(res)
			}
		}catch(err){
			console.log('您尚未登陆或者session失效')
		}
	},
	saveUserInfo({commit}, userInfo) {
		commit('userLogin', userInfo);
	}
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
})