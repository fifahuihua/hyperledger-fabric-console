import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store';

Vue.use(Router)

const LoginPage = r => require.ensure([], () => r(require('@/page/login')), 'login');
const MainPage = r => require.ensure([], () => r(require('@/page/main')), 'main');
const HomePage = r => require.ensure([], () => r(require('@/page/home')), 'home');
const InitPage = r => require.ensure([], () => r(require('@/page/initialize')), 'initialize');
const UserListPage = r => require.ensure([], () => r(require('@/page/userList')), 'userList');

const routes = [
	{
		path: '/login',
		component: LoginPage
	},
	{
		path: '/init',
		component: InitPage
	},
	{
		path: '/',
		component: InitPage,
		name: '',
		children: [{
			path: '',
			component: HomePage,
			meta: [],
		},{
			path: '/userList',
			component: UserListPage,
			meta: ['数据管理', '用户列表'],
		}]
	}
]

const router = new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})

router.beforeEach((to, from, next) => {
	if (to.path !== '/login' && (!store.state.loginUser || !store.state.loginUser.id)) {
		return next('/login');
	} else {
		return next();
	}
});

export default router;