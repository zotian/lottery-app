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
    'NumbersBoard': () => import('@/components/NumbersBoard'),
    'SelectedNumbers': () => import('@/components/SelectedNumbers'),
  }
};
</script>
<style lang="scss">
.home {
  margin-top: 10vh;
}
.flex {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.home__left {
  width:45vw;
  z-index: 2;
  justify-content: center;
  background:var(--lightColor) !important;
  color: var(--dimGrey);
  border-radius: 5px;
  padding: 50px;
}
.home__left div, .home__right div {
  width: 100%;
}
.home__right {
  width:45vw;
  z-index: 2;
  justify-content: center;
  background:var(--lightColor) !important;
  color: var(--dimGrey);
  border-radius: 5px;
  padding: 50px;
}
@media (max-width: 800px) {
  .home__left, .home__right {
    width: 90vw
  }
  .home__left {
    margin-bottom: 20px;
  }
}
</style>
