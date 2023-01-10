<template>
  <div class="q-pa-md" style="max-width: 300px">
    <div class="q-gutter-md">
      <q-select
        filled
        v-model="model"
        :options="options"
      />
      <q-select
        filled
        v-model="model1"
        multiple
        :options="options"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

const options = [];
for (let i = 0; i <= 10; i++) {
  options.push(`Opt ${i}`);
}

export default {
  setup() {
    return {
      model: ref(null),
      model1: ref(null),
      options,
    };
  },
};
</script>
