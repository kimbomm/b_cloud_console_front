<template>
  <div class="uploader">
    <ul>
      <li v-for="(file, i) in files" :key="i">
        <label :for="`file-${i}`">
          <input
            :id="`file-${i}`"
            :name="`file-${i}`"
            type="file"
            :value="file"
            @change="onChange"
          />
          <button>추가하기</button>
        </label>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref } from "vue";

const file = ref(null);
const files = ref([file.value]);

// const onChange = (event) => {
//   console.log(event.target.value);
// };
</script>
<style lang="scss" scoped>
input {
  // display: none;
}
</style>
