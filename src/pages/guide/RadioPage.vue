<template>
  <div class="p-content p-guide p-radio">
    <div class="p-head">
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <section class="section">
        <h2 class="h6">class="c_radio"</h2>
        <div class="group">
          <div class="c_radiogroup">
            <q-radio v-model="radCheck" val="rad1" label="워크스페이스 멤버" class="c_radio" />
            <q-radio v-model="radCheck" val="rad1" label="정산 관리자" disable class="c_radio" />
            <q-radio v-model="radCheck" val="rad2" label="게스트" class="c_radio" />
            <q-radio v-model="radCheck" val="rad2" label="게스트" disable class="c_radio" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { useMeta } from "quasar";
// import CRadio from "components/common/CRadio.vue";

export default {
  name: "CheckboxPage",
  components: {
    // CRadio,
  },
  setup() {
    const title = ref("Radio");
    useMeta(() => ({
      title: title.value,
    }));
    return {
      ptitle: ref(title),
      radCheck: ref("rad1"),
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
}
.group{
  margin-top:20px;
}
</style>
