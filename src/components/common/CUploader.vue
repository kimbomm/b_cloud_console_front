<template>
  <div class="c_uploader">
    <div class="uploader-input">
      <input
        v-for="(file, i) in files"
        :key="`file-${i}`"
        ref="inputFile"
        :name="`file-${i}`"
        type="file"
        :value="file.value"
        @change="onChange"
        class="hidden"
      />
    </div>
    <template v-for="(file, i) in files" :key="i">
      <div v-if="file.src" class="imgwrap">
        <div class="imgbox"><img :src="file.src" alt="" /></div>
        <q-btn @click="onRemove(i)" class="ibtn cancel circle">
          <i class="ico close" /><span class="hidden">삭제</span>
        </q-btn>
        <!-- 첨부된 이미지 클릭 시 해당 이미지 보기 class is-show 이미지가 안 뜰 경우 박스 사이즈 500x500 -->
        <q-item class="imgmodal">
          <div class="inner">
            <picture class="picture">
              <img :src="file.src" alt="" />
            </picture>
            <!-- Start : 이미지가 안 뜰 경우 박스 사이즈 500x500 -->
            <picture class="picture none"></picture>
            <!-- End : 이미지가 안 뜰 경우나 에러일 경우 -->
            <q-btn class="ibtn xclose large">
              <span class="hidden">닫기</span>
            </q-btn>
          </div>
        </q-item>
      </div>
    </template>
    <q-btn class="c_btn c_icon upload" @click="onClick">
      <i class="ico plus" /><span class="hidden">파일추가</span>
    </q-btn>
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
</style>
