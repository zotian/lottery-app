const Toasts = {
  methods: {
    customToast(payload) {
      const { body, title, variant } = payload;
      this.$bvToast.toast(body, {
        title,
        variant,
        solid: true
      });
    },
    successToast(textBody) {
      this.$bvToast.toast(textBody, {
        title: "Success",
        variant: "success",
        solid: true
      });
    },
    errorToast(textBody) {
      this.$bvToast.toast(textBody, {
        title: "Error",
        variant: "danger",
        solid: true
      });
    }
  }
};
export default Toasts;
