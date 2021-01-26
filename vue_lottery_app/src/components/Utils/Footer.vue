<template>
  <div class="footer">
    <ul class="footer_ul">
      <li>
        <p class="footer_a">
          {{ $t("footer.content") }}
        </p>
      </li>
      <li>
        <p class="footer_a">
          {{ $t("footer.content") }}
        </p>
      </li>
      <li>
        <p class="footer_a">
          &#169; Vasilis Zotos
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "~@/scss/colors";
.footer {
  background-color: $darkBlue;
  color: white;
  font-weight: bold;
  position: absolute;
  top: 90%;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 100%;
  text-align: center;
  display: flex;
  z-index: 3;
  .footer_ul {
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .footer_a {
      padding-top: 10px;
      margin: 0;
    }
  }
}
</style>
