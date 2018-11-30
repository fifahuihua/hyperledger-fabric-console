<template>
  <el-container>
    <el-aside width="260px">
      <el-menu
        style="height: 100vh;"
        :defaultActive="$route.path"
        router
        background-color="#324057"
        text-color="#bfcbd9"
        active-text-color="#20a0ff"
      >
        <el-menu-item index="/">
          <i class="el-icon-menu"></i>
          <span>Initialize Network</span>
        </el-menu-item>
        <el-submenu index="examples">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>Transaction Examples</span>
          </template>
          <el-menu-item index="/query">Query Examples</el-menu-item>
          <el-menu-item index="/invoke">Invoke Examples</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-main style="padding: 0;">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {};
</script>

