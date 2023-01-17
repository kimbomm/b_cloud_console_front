<template>
  <div class="uploader">
    <div class="uploader-input">
      <input
        v-for="(file, i) in files"
        :key="`file-${i}`"
        ref="inputFile"
        :name="`file-${i}`"
        type="file"
        :value="file.value"
        @change="onChange"
      />
    </div>
    <template v-for="(file, i) in files" :key="i">
      <div v-if="file.src">
        <img :src="file.src" />
        <button @click="onRemove(i)">삭제</button>
      </div>
    </template>
    <button class="c_button" @click="onClick">추가하기</button>
  </div>
</template>
<script setup>
import { ref } from "vue";

const file = ref(null);
const files = ref([
  { value: file.value, src: null }
]);

const addImagePreview = (src) => {
  const fileVal = files.value;
  fileVal[fileVal.length - 1].src = src;
};

const addFiles = () => {
  files.value.push({
    value: file.value,
    src: null
  });
};

const onChange = (event) => {
  const fileReader = new FileReader();
  fileReader.onload = (e) => {
    addImagePreview(e.target.result);
    addFiles();
  };
  fileReader.readAsDataURL(event.target.files[0]);
};

const onRemove = (idx) => {
  const removeConfirm = confirm("삭제하시겠습니까?");
  if (removeConfirm) {
    files.value.splice(idx, 1);
  }
};

const inputFile = ref(null);
const onClick = () => {
  inputFile.value[files.value.length - 1].click();
};
</script>
<style lang="scss" scoped>
input {
  display: none;
}
.uploader {
  display: flex;
  gap: 5px;
  &-input {
    display: none;
  }
  div,
  .c_button {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    border: 1px gray solid;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  div {
    position: relative;
  }
}
</style>
