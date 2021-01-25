<template>
  <b-modal
    :id="id"
    :title="modalTitle"
    ok-variant="success"
    cancel-variant="warning"
    :ok-title="$t('buttons.saveToHistory')"
    :cancel-title="$t('buttons.goBack')"
    :no-close-on-esc="true"
    :no-close-on-backdrop="true"
    @ok="$emit('saveHistory')"
    @cancel="$emit('returnToHome')"
    @close="$emit('returnToHome')"
  >
    <p class="my-4">
      {{ $t("liveDraw.modal.totalWinningAmount") }}: {{ winningAmmount }}
    </p>
  </b-modal>
</template>

<script>
export default {
  props: {
    modalTitle: {
      type: String
    },
    winningAmmount: {
      type: String
    },
    id: {
      type: String
    }
  }
};
</script>
