<template>
  <div id="app">
    <div :class="{ background: isLogin, background2: isMain }"></div>
    <transition name="fade" mode="out-in">
      <router-view :class="{ fixedHeight: isMain }" />
    </transition>
    <Footer
      v-if="$route.path !== '/login' && $route.path !== '/register'"
    ></Footer>
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
.background:before {
  width: 100vw;
  content: " ";
  background-image: url("./assets/background-login.jpg");
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100vh;
  filter: blur(3px);
  position: absolute;
  left: 0;
  top: 0;
}
.background2:before {
  content: none;
}
</style>
