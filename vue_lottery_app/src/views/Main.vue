<template>
  <navigation-bar></navigation-bar>
</template>

<script>
export default {
  components: {
    'navigation-bar': () => import('@/components/NavigationBar'),
  },
  created () {
      console.log('main')
  }
}
</script>

<style>

</style>