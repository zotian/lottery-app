<template>
  <div id="app">
    <router-view
      :style="{ height: mainHeight }"
      :class="{ mainStyles: isMain }"
    />
    <Footer v-if="isMain" :style="{ height: footerHeight }"></Footer>
  </div>
</template>

<script>
export default {
  components: {
    Footer: () => import("@/components/Utils//Footer")
  },
  data() {
    return {
      screenSize: "0"
    };
  },
  computed: {
    isLogin() {
      return this.$route.path === "/login" || this.$route.path === "/register";
    },
    isMain() {
      return this.$route.path !== "/login" && this.$route.path !== "/register";
    },
    footerHeight() {
      return `${(this.screenSize * 10) / 100}px`;
    },
    mainHeight() {
      return `${(this.screenSize * 85) / 100}px`;
    }
  },
  methods: {
    screenResize() {
      this.screenSize = window.innerHeight;
    }
  },
  created() {
    const app = document.getElementById("app");
    this.screenResize();
    app.style.height = `${this.screenSize}px`;
    window.addEventListener("resize", this.screenResize);
  }
};
</script>

<style lang="scss">
@import "~@/scss/colors";
@font-face {
  font-family: "Gilroy";
  src: local("Gilroy"), url(./assets/fonts/Gilroy-Light.otf) format("truetype");
}
.mainStyles {
  overflow: auto !important;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}
#app {
  margin: 0;
  font-family: "Gilroy";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $dimGrey;
  overflow: hidden;
  background-color: white;
}
</style>
