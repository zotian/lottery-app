<template>
  <div id="app">
    <div :class="{'background': isLogin, 'background2': isMain}"></div>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin () {
      return this.$route.path === '/login' || this.$route.path === '/register'
    },
    isMain () {
      return this.$route.path !== '/login' && this.$route.path !== '/register'
    }
  }
}
</script>

<style lang="scss">
#app {
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
.background:before{
    width: 100vw;
    content: " ";
    background-image: url("./assets/background-login3.jpg");  
    background-position: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 100vh;
    filter: blur(3px);
    position: absolute;
    left: 0;
    top: 0;
}
.background2:before{
    content: none;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
