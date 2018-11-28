<template>
  <el-container>
    <el-aside width="300px">
      <el-menu
        style="height: 100vh;"
        :defaultActive="$route.path"
        router
        background-color="#324057"
        text-color="#bfcbd9"
        active-text-color="#20a0ff"
      >
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span>Initialize Network</span>
        </el-menu-item>
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

