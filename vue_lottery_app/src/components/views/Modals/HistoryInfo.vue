<template>
  <b-modal
    ok-variant="warning"
    :id="infoModal.id"
    :title="infoModal.title"
    ok-only
    :ok-title="$t('buttons.goBack')"
    :no-close-on-esc="false"
    :no-close-on-backdrop="true"
  >
    <div class="colorDimGrey">
      <p>
        {{ $t("history.modal.date") }}: <span class="fontBold">{{ infoModal.date }}</span>
      </p>
      <p>
       {{ $t("history.drawNumbers") }}:
        <span
          class="fontBold"
          v-for="number in infoModal.drawNumbers"
          :key="number"
          >{{ number }},
        </span>
      </p>
      <p>
        {{ $t("history.modal.playerBet") }}:
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
        {{ $t("history.status") }}:
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
        {{ $t("history.modal.totalAmountWon") }}:
        <span class="fontBold">{{ infoModal.totalAmountWon }}</span>
      </p>
    </div>
  </b-modal>
</template>

<script>
export default {
  props: {
    infoModal: {
      type: Object
    }
  },
  methods: {
    isMatchedNumber(drawNumbers, currentNumber) {
      let isMatched = drawNumbers.some(number => number === currentNumber);
      return isMatched;
    }
  }
};
</script>
