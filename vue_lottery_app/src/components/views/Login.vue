<template>
  <LoginRegister
    title="Sign-in"
    action="login"
    alternativeAction="/register"
    alternativeActionText="Register now"
  >
  </LoginRegister>
</template>

<script>
  export default {
    components: {
      'LoginRegister': () => import('@/components/Utils/LoginRegister'),
    }
  }
</script>

<style lang="scss">


</style>