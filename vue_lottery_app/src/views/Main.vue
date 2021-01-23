<template>
<div>
  <navigation-bar></navigation-bar>
    <transition name="fade" mode="out-in">
        <router-view style="height:40vh"/>
    </transition>
</div>
  
</template>

<script>
export default {
  components: {
    'navigation-bar': () => import('@/components/NavigationBar'),
  },
  created () {
  }
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>