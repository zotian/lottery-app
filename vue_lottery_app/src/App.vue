<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
      <!-- <navigation-bar></navigation-bar> -->
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
  </div>
</template>

<script>
export default {
  // components: {
  //   'navigation-bar': () => import('@/components/NavigationBar'),
  // }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
