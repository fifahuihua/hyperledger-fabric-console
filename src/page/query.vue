<template>
  <div>
    <el-input placeholder="Please input" v-model="queryKey" class="input-with-select">
      <el-button slot="append" type="primary" icon="el-icon-search" @click="queryTransaction">Search</el-button>
    </el-input>
    <el-input type="textarea" :rows="5" placeholder="Please input" v-model="queryResultStr"></el-input>
  </div>
</template>

<script>
import FabricGw from '@/api/fabric.client.gw';

export default {
  data() {
    return {
      queryKey: '',
      queryResultStr: '',
      queryResult: {}
    };
  },
  methods: {
    async queryTransaction() {
      this.queryResult = await FabricGw.queryTransaction(this.queryKey);
      this.queryResultStr = JSON.stringify(this.queryResult);
    }
  }
};
</script>

<style scoped>
</style>
