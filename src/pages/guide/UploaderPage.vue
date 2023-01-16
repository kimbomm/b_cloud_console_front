<template>
  <div class="p-content p-uploader">
    <CUploader />
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import CUploader from "components/common/CUploader.vue";

const title = ref("Uploader");
useMeta(() => ({
  title: title.value,
}));
</script>
