<template>
  <div>
      <b-navbar toggleable="lg" type="light" variant="light" style="height:100%">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :disabled="isHomeDisabled" @click="handleRouterChange('/')"> Home</b-nav-item>
          <b-nav-item :disabled="isLiveDrawDisabled" @click="handleRouterChange('/live-draw')">Live Draw</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template #button-content>
              <b-avatar style="margin-right:20px;"></b-avatar> 
              <span class="mr-3">{{ userEmail }}</span>
            </template>
            <b-dropdown-item  @click="handleRouterChange('/history')">History</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item> 
            <b-button variant="danger" @click="logout">
              <b-icon icon="power" aria-hidden="true"></b-icon> Logout
            </b-button>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { resetState } from '@/store'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      userEmail: null
    }
  },
  methods: {
    logout () {
      resetState()
      localStorage.removeItem('loginData');
      this.$router.push('/login')
    },
    handleRouterChange (path) {
      if (this.$route.path === path) {
        return
      } else {
        this.$router.push(path)
      }
    }
  },
  computed: {
    ...mapState({
      isHomeDisabled: state => state['navigation'].isHomeDisabled,
      isLiveDrawDisabled: state => state['navigation'].isLiveDrawDisabled
    })
  },
  created () {
    if (localStorage.getItem('loginData')) {
      this.userEmail = JSON.parse(localStorage.getItem('loginData')).email
    }
  }
}
</script>

<style lang="scss" scoped>
  .bg-light {
    background-color: var(--lightColor) !important;
  }
  .nav-item a {
    color: var(--dimGrey) !important;
  }
</style>