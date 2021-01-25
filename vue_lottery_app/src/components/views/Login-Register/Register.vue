<template>
  <LoginRegister
    :title="$t('login.register')"
    action="register"
    alternativeAction="/login"
    :alternativeActionText="$t('login.signIn')"
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
