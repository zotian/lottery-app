<template>
  <b-button
    :class="{ number__button: true, active__number: isActiveNumber }"
    pill
    :variant="variant"
    :value="number"
    :disabled="isDisabled"
    @click="selectNumber"
  >
    {{ number }}
  </b-button>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  props: {
    number: {
      type: Number
    },
    disabled: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: "outline-secondary"
    },
    fixedStyle: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapMutations({
      updateNumbers: "home/UPDATE_SELECTED_NUMBERS"
    }),
    selectNumber() {
      const payload = {
        vm: this,
        number: this.number
      };
      this.updateNumbers(payload);
    }
  },
  computed: {
    ...mapState({
      selectedNumbers: state => state["home"].selectedNumbers
    }),
    isDisabled() {
      return (
        this.selectedNumbers.length === 5 ||
        this.disabled ||
        this.selectedNumbers.includes(this.number)
      );
    },
    isActiveNumber() {
      if (this.selectedNumbers.length > 0) {
        const isNumberActive = this.selectedNumbers.find(
          selectedNumbers => selectedNumbers === this.number
        );
        if (isNumberActive && !this.fixedStyle) {
          return true;
        }
        return false;
      }
      return false;
    }
  },
  created() {}
};
</script>

<style lang="scss">
.number__button {
  width: 50px;
  height: 50px;
  margin: 5px;
}
</style>
