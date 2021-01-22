<template>
  <LoginRegister
    title="Sign-in"
    alternativeAction="/sign-up"
    alternativeActionText="Register now"
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