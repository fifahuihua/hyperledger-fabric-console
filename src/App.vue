<template>
  <div id="app" class="fillcontain">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  mounted: async function() {
    await this.checkAllApps();

    if (!this.allAppsChecked) {
      this.$router.push('/init');
    }
  },
  computed: {
    ...mapState(['allAppsChecked'])
  },
  methods: {
    ...mapActions(['checkAllApps'])
  },
  watch: {
    allAppsChecked: function(newValue) {
      if (newValue) {
        this.$router.push('/');
      }
    }
  }
};
</script>

<style>
body {
  margin: 0;
}
</style>

