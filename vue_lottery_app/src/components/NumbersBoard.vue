<template>
  <div style="margin-top:50px;">
      <h4>Board</h4>
      <div>
        <span v-for="(number, index) in firstRow" :key="`${number}:${index}`">
            <NumberButton :number="number"></NumberButton>
        </span>
      </div>
      <div>
        <span v-for="(number, index) in secondRow" :key="`${number}:${index}`">
            <NumberButton :number="number"></NumberButton>
        </span>
      </div>
      <div>
        <span v-for="(number, index) in thirdRow" :key="`${number}:${index}`">
            <NumberButton :number="number"></NumberButton>
        </span>
      </div>
  </div>
</template>

<script>
export default {
  components: {
    'NumberButton': () => import('@/components/NumberButton')
  },
  data () {
      return {
          firstRow: [1,2,3,4,5,6,7,8,9,10],
          secondRow: [11,12,13,14,15,16,17,18,19,20],
          thirdRow: [21,22,23,24,25,26,27,28,29,30],
      }
  },
  computed: {

  },
  methods: {

  },
}
</script>

<style>

</style>