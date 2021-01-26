<template>
  <b-navbar-nav :class="{ 'ml-auto': fromNavBar, 'flag-only': !fromNavBar }">
    <b-nav-item-dropdown right>
      <template #button-content>
        <b-avatar v-if="fromNavBar" class="mr-14"></b-avatar>
        <span
          >{{ userEmail }}
          <img
            :src="require(`@/assets/flags/${language}.svg`)"
            width="24"
            class="lang_flag"
          />
        </span>
      </template>
      <slot name="history"></slot>
      <b-dropdown-item class="text-center" @click="setLanguage('en')">
        <img
          :src="require(`@/assets/flags/en.svg`)"
          width="24"
          class="inline-block"
        />
      </b-dropdown-item>
      <b-dropdown-item class="text-center" @click="setLanguage('gr')">
        <img
          :src="require(`@/assets/flags/gr.svg`)"
          width="24"
          class="inline-block"
        />
      </b-dropdown-item>
    </b-nav-item-dropdown>
    <slot name="logout"></slot>
  </b-navbar-nav>
</template>

<script>
export default {
  props: {
    fromNavBar: {
      type: Boolean
    },
    userEmail: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      language: localStorage.getItem("lang") || "en"
    };
  },
  methods: {
    setLanguage(lang) {
      this.$i18n.locale = lang;
      this.language = lang;
      localStorage.setItem("lang", lang);
    }
  },
  created() {
    this.$i18n.locale = this.language;
  }
};
</script>

<style lang="scss">
.flag-only {
  width: 150px;
  margin: 0 auto;
}
.lang_main {
  position: relative;
  .lang_flag {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .lang_select {
    width: 22px;
    position: absolute;
    left: 56%;
    transform: translate(-50%, -50%);
    .text-center {
      text-align: center;
    }
    a {
      padding: 2px 0;
    }
  }
}
</style>
