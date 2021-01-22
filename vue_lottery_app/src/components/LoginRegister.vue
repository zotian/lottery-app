<template>
<div class="main__login">
    <b-card
    :title="title"
    class="mb-2"
  >
    <b-card-text>    
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group
          id="email"
          label="Email address:"
          label-for="input-1"
          label-align-sm="right"
          label-cols-sm="4"
        >
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            placeholder="Enter email"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
            id="password"
            label="Password:"
            label-for="input-2"
            label-align-sm="right"
            label-cols-sm="4"
        >
          <b-form-input
            id="input-2"
            v-model="form.password"
            type="password"
            placeholder="Enter Password"
            required
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </b-card-text>

    <a href="" class='alternativeAction'>
      <router-link :to="alternativeAction">{{ alternativeActionText }}</router-link>
    </a>
  </b-card>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String
      },
      alternativeAction: {
        type: String
      },
      alternativeActionText: {
        type: String
      }
    },
    data() {
      return {
        form: {
          password: '',
          name: '',
        },
        show: true
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>

<style lang="scss">
  .main__login {
    position: absolute;
    min-width: 450px;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    box-shadow: 0px 15px 20px 5px rgba(40, 40, 90, 0.09), 0px 15px 20px 5px rgba(0, 0, 0, 0.065);
    border-radius: 10px;
    .alternativeAction {
      position: absolute;
      left: 100%;
      transform: translate(-100%);
      padding-right: 20px;
      white-space: nowrap;
    }
    .card-title {
      margin-bottom: 30px;
      font-weight: bold;
    }
  }
  .card {
    border: none;
  }

</style>