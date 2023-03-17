<template>
  <q-page class="p-content p-projects p-make">
    <div class="p-head">
      <q-breadcrumbs
        class="c_breadcrumb"
        gutter="none"
      >
        <template v-slot:separator>
          <q-icon />
        </template>
        <q-breadcrumbs-el
          label="Projects"
          to="/"
        />
        <q-breadcrumbs-el
          label="Test Project"
          to="/"
        />
        <q-breadcrumbs-el label="인스턴스" />
      </q-breadcrumbs>
      <h1 class="p-title">
        {{ ptitle }}
      </h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <div class="wrap p-inst-detail">
        <div class="make_main_cont">
          <!-- 이름/설명 -->
          <InstanceNameDescription
            @instanceName ="updateInstanceName"
            @instanceDescription ="updateInstanceDescription"
          />

          <!-- 인스턴스 타입 -->
          <InstanceType
          @instanceTypeSelected="updateInstanceTypeSelected"
          />

          <!-- 이미지 -->
          <InstanceImage
          :workspaceId=" workspaceId"
          :userId="userId"
          @imageSelected="updateimageSelected"
          />

        <!-- 스토리지 -->
        <InstanceStorage/>

        <!-- ssh -->
        <InstanceSshKey/>

        <!-- 포트번호 -->
        <InstancePortNumber/>

        </div>

        <div class="aside_cont">
          <div class="aside_box">
            <p class="section_title">인스턴스</p>
            <ul class="instance_data">
              <li :class="`i_d0${i+1}`" v-for="(list,i) in datalist" :key="list">
                <q-item class="i_data_title">{{list.title}}</q-item>
                <q-item class="i_data_value"><p>{{list.value}}</p></q-item>
              </li>
            </ul>
            <div class="make_btn">
              <template v-if="datacheck === false">
                <q-btn
                  btnTypes=1
                  type="button"
                  disabled
                  class="c_btn medium"
                >
                  <span class="txt">태스크 생성</span>
                </q-btn>
              </template>
              <template v-else>
                <q-btn
                  btnTypes=1
                  type="button"
                  class="c_btn medium"
                >
                  <span class="txt">태스크 생성</span>
                </q-btn>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { useMeta } from "quasar";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useCommonStore } from "stores/useCommonStore.js";

import InstanceNameDescription from "./components/instance/InstanceNameDescription.vue";
import InstanceType from "./components/instance/InstanceType.vue";
import InstanceImage from "./components/instance/InstanceImage.vue";
import InstanceStorage from "./components/instance/InstanceStorage.vue";
import InstanceSshKey from "./components/instance/InstanceSshKey.vue";
import InstancePortNumber from "./components/instance/InstancePortNumber.vue";

const route = useRoute();
const { me } = storeToRefs(useCommonStore());
const { workspaceId } = route.params;
const userId = computed(() => me.value.id);

const title = ref("인스턴스 생성");
useMeta(() => ({
  title: title.value,
}));

onMounted(() => {
  console.log("userId", userId);
});
const currentInput = ref({
  instanceName: "",
  instanceDescription: "",
  instanceTypeSelected: {
    cpu: "",
    gpu: "",
    mem: "",
    disk: ""
  }

});

const updateInstanceName = (value) => {
  currentInput.value.instanceName = value;
};

const updateInstanceDescription = (value) => {
  currentInput.value.instanceDescription = value;
};
const updateInstanceTypeSelected = (value) => {
  currentInput.value.instanceTypeSelected = {
    cpu: value.cpu,
    gpu: value.gpu,
    mem: value.mem,
  };
};

const ptitle = ref(title);
const datacheck = ref(false);

/**
 * 설명: 복사하기 버튼 이벤트
 * @param { object } rowData get table row data
 */

/**
 * 설명: row Action 버튼 이벤트
 * @param { string } eventName action event name
 * @param { object } rowData get table row data
 */

const datalist = ref([

  { title: "이름", value: computed(() => (currentInput.value.instanceName === "" ? "-" : currentInput.value.instanceName)) },
  { title: "인스턴스 타입", value: "Tesla V100" },
  { title: "GPU", value: computed(() => (currentInput.value.instanceTypeSelected.gpu === "" ? "-" : currentInput.value.instanceTypeSelected.gpu)) },
  { title: "CPU", value: computed(() => (currentInput.value.instanceTypeSelected.cpu === "" ? "-" : currentInput.value.instanceTypeSelected.cpu)) },
  { title: "Memory", value: computed(() => (currentInput.value.instanceTypeSelected.mem === "" ? "-" : currentInput.value.instanceTypeSelected.mem)) },
  { title: "Disk", value: "80GiB" }, // ??disk
  { title: "이미지", value: "tensorflow 2.9.0 \n(python3, cuda11.2, ubuntu20.04)" },
  { title: "스토리지", value: "개인 스토리지 외 3개" },
  { title: "SSH/JupyterLab", value: "tda" },
  { title: "포트번호", value: "-" },
]);
</script>

<style lang="scss" scoped>
@import "./src/css/projects";
@import "./src/css/table";
</style>
