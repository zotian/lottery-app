<template>
  <div>
      <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item @click="$router.push('/')"> Home</b-nav-item>
          <b-nav-item @click="$router.push('/live-draw')">Live Draw</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item> 
            <b-avatar style="margin-right:20px;"></b-avatar> 
            <span class="mr-3">J. Circlehead</span>
          </b-nav-item>
          <b-nav-item> 
            <b-button variant="outline-primary" @click="logout">
              <b-icon icon="power" aria-hidden="true"></b-icon> Logout
            </b-button>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$router.push('/login')
    }
  }
}
</script>

<style>

</style>