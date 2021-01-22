<template>
  <div>
  <b-navbar type="light" variant="light">
    <b-navbar-nav>
      <b-nav-item-dropdown text="App Menu" right>
        <b-dropdown-item href="#">
            <router-link to="/home">Home</router-link>
        </b-dropdown-item>
        <b-dropdown-item href="#">
            <router-link to="/live-draw">Live Draw</router-link>
        </b-dropdown-item>
      </b-nav-item-dropdown>

      <b-nav-item-dropdown text="Player Indicator" right>
        <b-dropdown-item href="#">Account</b-dropdown-item>
        <b-dropdown-item href="#">Settings</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>