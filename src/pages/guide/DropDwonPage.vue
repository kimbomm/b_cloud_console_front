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
            <CDropdown
              v-model:selected="selectedBasic"
              :label="label"
              :options="options"
            />
            <CDropdown
              v-model:selected="selectedBasic"
              :label="label"
              :options="options"
              :disabled="true"
            />
          </div>
        </div>
      </section>
      <section class="section">
        <h2 class="h6">Dropdown(Select) - Text</h2>
        <div class="group">
          <div class="c_selectgroup">
            <CDropdown
              v-model:selected="model1"
              :label="'읽기쓰기'"
              :options="options1"
              :type="'text'"
            />
            <CDropdown
              v-model:selected="model1"
              :label="'읽기쓰기'"
              :options="options1"
              :disabled="true"
              :type="'text'"
            />
          </div>
        </div>
      </section>
      <section class="section">
        <h2 class="h6">Dropdown(Select) - Check</h2>
        <div class="group">
          <div class="c_selectgroup">
            <CDropdown
              v-model:selected="selectedCheck"
              :label="label"
              :options="options"
              :multiple="true"
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script setup>
import {
  ref, onMounted
} from "vue";
import { useMeta } from "quasar";
import CDropdown from "components/common/CDropdown.vue";

const title = ref("Dropdown");
const label = ref("placeholder");
const selectedCheck = ref(null);
const selectedBasic = ref(null);

useMeta(() => ({
  title: title.value,
}));

const ptitle = ref(title);
const model1 = ref("읽기쓰기");
const options1 = [
  "읽기쓰기", "읽기", "삭제",
];
const options = ref([
  { label: "전체", value: 0 },
  { label: "운영중", value: 1 },
  { label: "정지중", value: 2 },
  { label: "삭제중", value: 3 },
  { label: "삭제", value: 4 },
]);

onMounted(() => {});
</script>
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
    return {
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
