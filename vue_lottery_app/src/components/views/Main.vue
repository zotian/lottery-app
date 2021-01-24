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
    'navigation-bar': () => import('@/components/Utils/NavigationBar'),
  },
  created () {
  }
}
</script>

<style lang="scss">

</style>