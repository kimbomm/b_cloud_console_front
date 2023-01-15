<template>
  <div class="p-content p-typo">
    <div class="tyopwrap">
      <div class="h1">한글 폰트(Noto Sans)</div>
      <h1 class="bold">가나다라마바사아자차카파타하</h1>
      <h1 class="regular">가나다라마바사아자차카파타하</h1>
      <h2 class="bold">가나다라마바사아자차카파타하</h2>
      <h2 class="regular">가나다라마바사아자차카파타하</h2>
      <h3 class="bold">가나다라마바사아자차카파타하</h3>
      <h3 class="regular">가나다라마바사아자차카파타하</h3>
      <h4 class="bold">가나다라마바사아자차카파타하</h4>
      <h4 class="regular">가나다라마바사아자차카파타하</h4>
      <h5 class="bold">가나다라마바사아자차카파타하</h5>
      <h5 class="regular">가나다라마바사아자차카파타하</h5>
      <h6 class="bold">가나다라마바사아자차카파타하</h6>
      <h6 class="regular">가나다라마바사아자차카파타하</h6>
      <br>
      <div class="h1">영문 폰트(Inter)</div>
      <h1>ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 1234567890 !@#$%^&*</h1>
      <h2>ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 1234567890 !@#$%^&*</h2>
      <h3>ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 1234567890 !@#$%^&*</h3>
      <h4>ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 1234567890 !@#$%^&*</h4>
      <h5>ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 1234567890 !@#$%^&*</h5>
      <h6>ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 1234567890 !@#$%^&*</h6>
    </div>
  </div>
</template>
<script>
export default {
  name: "TypoPage",
};
</script>
<style lang="scss" scoped>
.colorwrap{
  display:flex;
  flex:wrap;
  .item{
    display:inline-flex;
    align-items: center;justify-content: center;
    width:100px;height:100px;
    border-radius: 16px;
    background-color:#363CE5;
  }
}
</style>
