<template>
  <div class="p-content p-guide p-input">
    <div class="p-head">
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <section class="section">
        <h2 class="h6">Input - Basic type="text"</h2>
        <div class="group">
          <div class="c_inpgroup">
            <CInput />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { useMeta } from "quasar";
import CInput from "components/common/CInput.vue";

export default {
  name: "ToastPage",
  components: {
    CInput,
  },
  setup() {
    const title = ref("Input");
    useMeta(() => ({
      title: title.value,
    }));

    function setAnotherTitle() {
      title.value = "Input";
    }
    return {
      setAnotherTitle,
      ptitle: ref(title),
    };
  },
};
</script>
<script setup>
</script>

<style lang="scss" scoped>
.section{
  h2{
    margin-bottom:10px;
  }
  ~ .section{
    margin-top:50px;
  }
  .h6{
    &:not(:first-child){
      margin-top:50px;
    }
  }
}
.group{
  margin-top:20px;
}
</style>
