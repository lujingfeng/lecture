<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
    }
  },

  created: function(){
    console.log(this.$store.abc);
  },

  methods: {

  }
}
</script>

<style lang="scss">
  @import '../assets/common.scss'; 
  #app{
    font-size: 14px;
  }
</style>
