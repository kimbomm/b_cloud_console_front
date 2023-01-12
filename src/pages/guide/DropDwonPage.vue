<template>
  <div class="p-content p-guide p-dropdown">
    <div class="p-head">
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <section class="section">
        <h2 class="h6">Dropdown(Select) - Basic</h2>
        <div class="group">
          <div class="c_selectgroup">
            <CDropdown />
            <q-select
              outlined
              disable
              v-model="model"
              :options="options"
              options-selected-class="is-active"
              label="전체"
              class="c_dropdown"
            />
          </div>
        </div>
      </section>
      <section class="section">
        <h2 class="h6">Dropdown(Select) - Text</h2>
        <div class="group">
          <div class="c_selectgroup">
            <q-select
              filled
              v-model="model1"
              :options="options1"
              options-selected-class="is-active"
              popup-content-class="smtext"
              label="읽기쓰기"
              class="c_dropdown smtext"
            />
            <q-select
              filled
              disable
              v-model="model1"
              :options="options1"
              options-selected-class="is-active"
              popup-content-class="smtext"
              label="읽기쓰기"
              class="c_dropdown smtext"
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { useMeta } from "quasar";
import CDropdown from "components/common/CDropdown.vue";

export default {
  name: "ToastPage",
  components: {
    CDropdown,
  },
  setup() {
    const title = ref("Dropdown");
    useMeta(() => ({
      title: title.value,
    }));

    function setAnotherTitle() {
      title.value = "Dropdown";
    }
    return {
      setAnotherTitle,
      ptitle: ref(title),
      model: ref("전체"),
      model1: ref("읽기쓰기"),
      options: [
        "운영중", "정지중", "삭제중", "삭제",
      ],
      options1: [
        "읽기쓰기", "읽기", "삭제",
      ],
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
