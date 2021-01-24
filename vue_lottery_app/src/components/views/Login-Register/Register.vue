<template>
  <LoginRegister
    title="Register"
    action="register"
    alternativeAction="/login"
    alternativeActionText="Login"
  >
  </LoginRegister>
</template>

<script>
export default {
  components: {
    LoginRegister: () => import("@/components/views/Login-Register/Components/LoginRegister")
  }
};
</script>

<style lang="scss"></style>
