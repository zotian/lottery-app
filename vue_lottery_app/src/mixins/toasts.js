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
        title: this.$t("buttons.success"),
        variant: "success",
        solid: true
      });
    },
    errorToast(textBody) {
      this.$bvToast.toast(textBody, {
        title: this.$t("buttons.error"),
        variant: "danger",
        solid: true
      });
    }
  }
};
export default Toasts;
