export default {
  methods: {
    toast (payload) {
      const {body, title, variant} = payload
      this.$bvToast.toast(body, {
        title,
        variant,
        solid: true
        })
    }
  }
}