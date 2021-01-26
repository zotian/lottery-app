<template>
  <div id="app">
    <router-view :class="{ fixedHeight: isMain }" />
    <Footer v-if="isMain"></Footer>
  </div>
</template>

<script>
export default {
  components: {
    Footer: () => import("@/components/Utils//Footer")
  },
  computed: {
    isLogin() {
      return this.$route.path === "/login" || this.$route.path === "/register";
    },
    isMain() {
      return this.$route.path !== "/login" && this.$route.path !== "/register";
    }
  }
};
</script>

<style lang="scss">
@import "~@/scss/colors";
@font-face {
  font-family: "Gilroy";
  src: local("Gilroy"), url(./assets/fonts/Gilroy-Light.otf) format("truetype");
}
.fixedHeight {
  overflow: auto;
  height: 88vh;
}
#app {
  margin: 0;
  font-family: "Gilroy";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $dimGrey;
  height: 100vh;
  background-color: white;
}
</style>
