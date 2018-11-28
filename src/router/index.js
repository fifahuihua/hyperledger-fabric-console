import Vue from 'vue'
import Router from 'vue-router'
import InitPage from '@/page/initialize';
import HomePage from '@/page/home';
import DashboardPage from '@/page/dashboard';

Vue.use(Router)

const routes = [
	{
		path: '/init',
		component: InitPage
	},
	{
		path: '/',
		component: DashboardPage,
		name: '',
		children: [{
			path: '',
			component: HomePage,
			meta: []
		}]
	}
]

const router = new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})

export default router;