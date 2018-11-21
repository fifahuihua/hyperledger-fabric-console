<template>
	<div class="header_container">

		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-dropdown @command="handleCommand" menu-align='start'>
			<img src="/static/img/default.jpg" class="avator">
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="home">Home</el-dropdown-item>
				<el-dropdown-item command="singout">Logout</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
	</div>
</template>

<script>
import { signout } from '@/api/user.client.gw';
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {
    ...mapActions(['saveUserInfo']),
    async handleCommand(command) {
      if (command == 'home') {
        this.$router.push('/');
      } else if (command == 'singout') {
        const res = await signout();
        if (res.data.status == 1) {
          this.$message({
            type: 'success',
            message: '退出成功'
          });
          this.saveUserInfo(null);
          this.$router.push('/login');
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          });
        }
      }
    }
  }
};
</script>

<style lang="less">
@import '../style/mixin';
.header_container {
  background-color: #eff2f7;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
}
.avator {
  .wh(36px, 36px);
  border-radius: 50%;
  margin-right: 37px;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
