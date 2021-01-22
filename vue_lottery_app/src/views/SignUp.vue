<template>
  <LoginRegister
    title="Register"
    alternativeAction="/login"
    alternativeActionText="Login"
  >
  </LoginRegister>
</template>

<script>
  export default {
    components: {
      'LoginRegister': () => import('@/components/LoginRegister'),
    }
  }
</script>

<style lang="scss">


</style>