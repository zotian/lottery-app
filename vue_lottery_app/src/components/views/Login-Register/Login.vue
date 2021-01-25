<template>
  <LoginRegister
    :title="$t('login.signIn')"
    action="login"
    alternativeAction="/register"
    :alternativeActionText="$t('login.registerNow')"
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
