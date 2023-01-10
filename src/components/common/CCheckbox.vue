<template>
  <div class="cgroup">
    <q-checkbox v-model="chk1" label="One" />
    <q-checkbox v-model="chk2" label="Two" />
    <q-checkbox disable v-model="chk3" label="Three" />
    <q-checkbox disable v-model="chk4" label="Four" />
    <q-option-group
      v-model="group"
      :options="options"
      type="checkbox"
    />
  </div>
</template>
<script>
import { ref } from 'vue';

export default {
  setup() {
    return {
      chk1: ref(false),
      chk2: ref(true),
      chk3: ref(false),
      chk4: ref(true),
      group: ref(['op1']),

      options: [
        {
          label: 'Option 1',
          value: 'op1',
        },
        {
          label: 'Option 2',
          value: 'op2',
        },
        {
          label: 'Option 3',
          value: 'op3',
        },
      ],
    };
  },
};
</script>
