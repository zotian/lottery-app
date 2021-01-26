<template>
  <div>
    <div class="frosted login-image"></div>
    <b-card :title="title" class="content">
      <b-card-text class="mb-0">
        <b-form>
          <b-form-group
            id="email"
            :label="$t('login.emailAddress')"
            label-for="input-1"
            label-align-sm="right"
            label-cols-sm="4"
          >
            <b-form-input
              id="input-1"
              v-model="form.email"
              :placeholder="$t('login.enterEmail')"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="password"
            :label="$t('login.password')"
            label-for="input-2"
            label-align-sm="right"
            label-cols-sm="4"
          >
            <b-form-input
              id="input-2"
              v-model="form.password"
              type="password"
              :placeholder="$t('login.enterPassword')"
            ></b-form-input>
          </b-form-group>

          <b-button @click.prevent="submit" type="submit" variant="primary">{{
            $t("buttons.submit")
          }}</b-button>
        </b-form>
      </b-card-text>
      <Language-Select></Language-Select>
      <a href="" class="alternativeAction">
        <router-link :to="alternativeAction">{{
          alternativeActionText
        }}</router-link>
      </a>
    </b-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
// import { getToastMessage } from "@/common-js/ToastMessages";
import Toasts from "@/mixins/toasts";
import { isValidEmail, isEmptyField } from "@/common-js/Validations";
export default {
  components: {
    "Language-Select": () => import("@/components/Utils/LanguageSelect")
  },
  mixins: [Toasts],
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
        password: "",
        email: ""
      }
    };
  },
  methods: {
    ...mapActions({
      loginRegister: "login/loginRegister"
    }),
    submit() {
      this.validateFields()
        .then(() => {
          const payload = {
            vm: this,
            formData: this.form,
            returnSecureToken: true,
            action: this.$route.path === "/login" ? "login" : "register"
          };
          this.loginRegister(payload)
            .then(() => {
              if (this.$route.path === "/register") {
                this.$router.push("/login");
                setTimeout(() => {
                  this.successToast(this.$t("login.successRegister"));
                }, 100);
              } else {
                this.$router.push("/");
              }
            })
            .catch(error => {
              const message = this.handleServerError(error);
              this.errorToast(message);
            });
        })
        .catch(err => {
          this.errorToast(this.$t(`toast.error.${err}`));
        });
    },
    validateFields() {
      return new Promise((resolve, reject) => {
        if (isEmptyField(this.form.email)) {
          this.form.email = "";
          reject("EMAIL_REQUIRED");
        } else if (!isValidEmail(this.form.email)) {
          reject("INVALID_EMAIL_FORMAT");
        } else if (
          isEmptyField(this.form.password) ||
          this.form.password.length < 6
        ) {
          this.form.password = "";
          reject("WEAK_PASSWORD");
        } else {
          resolve("validFields");
        }
      });
    },
    handleServerError(error) {
      const errorMsg = error.err.response.data.error.message;
      let errorObj = {
        EMAIL_NOT_FOUND: `EMAIL_NOT_FOUND`,
        INVALID_PASSWORD: `INVALID_PASSWORD`,
        EMAIL_EXISTS: `EMAIL_EXISTS`
      };
      return Object.prototype.hasOwnProperty.call(errorObj, errorMsg)
        ? this.$t(`toast.error.${errorObj[errorMsg]}`)
        : errorMsg;
    }
  }
};
</script>

<style lang="scss">
@import "~@/scss/colors";
.frosted {
  position: fixed;
  display: block;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1;
  background-color: $bluegrey;
  + .content {
    position: fixed;
    left: 0;
    height: 100%;
    right: 0;
    z-index: 2;
    background-color: transparentize($lightGrey, 0.5);
  }
}
.login-image {
  background: url("~@/assets//images/background-login.jpg") no-repeat;
  background-size: cover;
}
.card-body {
  position: absolute;
  background-color: white;
  min-width: 450px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 0px 1px rgba(250, 255, 255, 0.5),
    3px 2px 5px 0px rgba(0, 0, 0, 0.3);
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
    text-decoration: none;
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
