<template>
  <div class="p-content p-guide p-checkbox">
    <CCheckbox />
  </div>
</template>
<script>
import { ref } from "vue";
import CCheckbox from "components/common/CCheckbox.vue";

export default {
  name: "CheckboxPage",
  components: {
    CCheckbox,
  },
  setup() {
    return {
      ptitle: ref("Checkbox"),
    };
  },
};
</script>
<script setup>
</script>
<style lang="scss" scoped></style>
