<template>
  <b-modal
    :id="id"
    :title="modalTitle"
    ok-variant="primary"
    cancel-variant=" "
    :ok-title="okTitle"
    cancel-title="Cancel"
    @ok="$emit('submitModal')"
  >
    <p class="my-4">{{ modalBody }}</p>
  </b-modal>
</template>

<script>
export default {
  props: {
    modalTitle: {
      type: String
    },
    okTitle: {
      type: String
    },
    cancelTitle: {
      type: String
    },
    modalBody: {
      type: String
    },
    id: {
      type: String
    }
  }
};
</script>
