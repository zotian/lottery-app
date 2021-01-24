<template>
  <div class="home flex">
    <div class="home__left flex">
      <NumbersBoard></NumbersBoard>
    </div>
    <div class="home__right flex">
      <SelectedNumbers></SelectedNumbers>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    NumbersBoard: () => import("@/components/Utils/NumbersBoard"),
    SelectedNumbers: () => import("@/components/Utils/SelectedNumbers")
  }
};
</script>
<style lang="scss"></style>
