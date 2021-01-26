<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="light"
      variant="light"
      class="height100 navigation_main"
    >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item
            :disabled="isHomeDisabled"
            @click="handleRouterChange('/')"
          >
            {{ $t("navigation.home") }}</b-nav-item
          >
          <b-nav-item
            :disabled="isLiveDrawDisabled"
            @click="handleRouterChange('/live-draw')"
            >{{ $t("navigation.liveDraw") }}</b-nav-item
          >
        </b-navbar-nav>
        <Language-Select :userEmail="userEmail" :fromNavBar="true">
          <template v-slot:history>
            <b-dropdown-item
              class="linkColor"
              @click="handleRouterChange('/history')"
              >{{ $t("navigation.history") }}</b-dropdown-item
            >
          </template>
          <template v-slot:logout>
            <b-nav-item>
              <b-button variant="danger" @click="logout">
                <b-icon icon="power" aria-hidden="true"></b-icon>
                {{ $t("navigation.logout") }}
              </b-button>
            </b-nav-item>
          </template>
        </Language-Select>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { resetState } from "@/store";
import { mapState } from "vuex";
export default {
  components: {
    "Language-Select": () => import("@/components/Utils/LanguageSelect")
  },
  data() {
    return {
      userEmail: null,
      language: localStorage.getItem("lang") || "en"
    };
  },
  methods: {
    logout() {
      resetState();
      localStorage.removeItem("loginData");
      this.$router.push("/login");
    },
    setLanguage(lang) {
      this.$i18n.locale = lang;
      this.language = lang;
      localStorage.setItem("lang", lang);
    },
    handleRouterChange(path) {
      if (this.$route.path === path) {
        return;
      } else {
        this.$router.push(path);
      }
    }
  },
  computed: {
    ...mapState({
      isHomeDisabled: state => state["navigation"].isHomeDisabled,
      isLiveDrawDisabled: state => state["navigation"].isLiveDrawDisabled
    })
  },
  created() {
    if (localStorage.getItem("loginData")) {
      this.userEmail = JSON.parse(localStorage.getItem("loginData")).email;
    }
  }
};
</script>

<style lang="scss">
@import "~@/scss/colors";
.navbar-toggler {
  background-color: $lightGrey !important;
}
.navigation_main {
  &.bg-light {
    background-color: $darkBlue !important;
  }
  .nav-item a {
    color: white !important;
  }
  .nav-item .linkColor a {
    color: black !important;
    font-weight: bold;
    text-align: center;
  }
  .mr-14 {
    margin-right: 14px;
  }
}
</style>
