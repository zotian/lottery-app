<template>
<div class="main__login">
    <b-card
    :title="title"
    class="mb-2"
  >
    <b-card-text>    
      <b-form>
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

        <b-button @click.prevent="submit" type="submit" variant="primary">Submit</b-button>
      </b-form>
    </b-card-text>

    <a href="" class='alternativeAction'>
      <router-link :to="alternativeAction">{{ alternativeActionText }}</router-link>
    </a>
  </b-card>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
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
          email: '',
        },
      }
    },
    methods: {
      ...mapActions({
        loginRegister: 'login/loginRegister',
      }),
      submit() {
        const payload = {
          vm: this,
          formData: this.form,
          returnSecureToken: true,
          action: this.$route.path === "/login" ? 'login' : 'register'
        };
        this.loginRegister(payload)
          .then(() => {
            this.$router.push("/")
          })
          .catch((err) => err)
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
    box-shadow: 0px 0px 0px 1px rgba(250, 255, 255, 0.5), 3px 2px 10px 5px rgba(250, 255, 255, 0.5);
    border-radius: 12px;
    .alternativeAction {
      position: absolute;
      left: 100%;
      top: 90%;
      transform: translate(-100%);
      padding-right: 20px;
      white-space: nowrap;
    }
    a:hover {
      text-decoration: none ;
    }
    .card {
      border: none;
      background-color: #fafafa;
    }
    .card-title {
      margin-bottom: 30px;
      font-weight: bold;
    }
  }

</style>