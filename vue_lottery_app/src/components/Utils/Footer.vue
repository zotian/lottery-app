<template>
  <div class="footer">
    <ul class="footer_ul">
      <li>
        <p style="padding-top:10px; margin:0;" class="nav-link" href="">Terms and conditions</p>
      </li>
      <li>FOLLOW US ON</li>
      <li>
        <p style="padding-top:10px; margin:0;">&#169; Vasilis Zotos</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss'>
@import "~@/scss/colors";
.footer {
  background-color: $darkBlue !important;
  color: white;;
  font-weight: bold;
  position: absolute;
  top: 90%;
  left: 50%;
  transform: translate(-50%, 0%);
  z-index: 2;
  width: 100%;
  text-align: center;
  height: 10vh;
  overflow: auto;
  display: flex;
}
.footer_ul {
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
</style>
