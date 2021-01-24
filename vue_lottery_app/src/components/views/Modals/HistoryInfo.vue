<template>
  <b-modal
    ok-variant="warning"
    :id="infoModal.id"
    :title="infoModal.title"
    ok-only
    ok-title="Go back"
    :no-close-on-esc="false"
    :no-close-on-backdrop="true"
  >
    <div class="colorDimGrey">
      <p>
        Date: <span class="fontBold">{{ infoModal.date }}</span>
      </p>
      <p>
        Draw Numbers:
        <span
          class="fontBold"
          v-for="number in infoModal.drawNumbers"
          :key="number"
          >{{ number }},
        </span>
      </p>
      <p>
        Player's Bet:
        <span
          class="fontBold"
          v-for="number in infoModal.playerBet"
          :key="number"
        >
          <span
            :class="{
              success: isMatchedNumber(infoModal.drawNumbers, number)
            }"
            >{{ number }},
          </span>
        </span>
      </p>
      <p>
        Status:
        <span
          :class="{
            fontBold: true,
            success: infoModal.status === 'Won',
            fail: infoModal.status === 'Lost'
          }"
        >
          {{ infoModal.status }}
        </span>
      </p>
      <p>
        Total Amount Won:
        <span class="fontBold">{{ infoModal.totalAmountWon }}</span>
      </p>
    </div>
  </b-modal>
</template>

<script>
export default {
  props: {
    infoModal:{
      type: Object
    }
  },
  methods: {
    isMatchedNumber(drawNumbers, currentNumber) {
      let isMatched = drawNumbers.some(number => number === currentNumber);
      return isMatched;
    },
  }
};
</script>

<style lang="scss">
@import "~@/scss/colors";
</style>
