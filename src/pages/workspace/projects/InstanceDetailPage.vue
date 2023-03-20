<template>
  <q-page class="p-content p-projects p-make">
    <div class="p-head">
      <q-breadcrumbs class="c_breadcrumb" gutter="none">
        <template v-slot:separator>
          <q-icon />
        </template>
        <q-breadcrumbs-el label="Projects" to="/" />
        <q-breadcrumbs-el label="Test Project" to="/" />
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
            @instanceName="(value)=>{    currentInput.instanceName = value}"
            @instanceDescription="(value)=>{  currentInput.instanceDescription = value}"
          />

          <!-- 인스턴스 타입 -->
          <InstanceType @instanceTypeSelected="updateInstanceTypeSelected" />

          <!-- 이미지 -->
          <InstanceImage
            :workspaceId="workspaceId"
            :userId="userId"
            @instanceImage=" (value)=>{ currentInput.instanceImage = value}"
            @instanceImageId="(value)=>{  currentInput.instanceImageId = value}"
          />

          <!-- 스토리지 -->
          <InstanceStorage :userId="userId" />

          <!-- ssh -->
          <InstanceSshKey
            :userId="userId"
            @instanceSSKeySelected="(value)=>{  currentInput.instanceSSKeySelected = value}"
            @instanceSSKeySelectedId="(value)=>{  currentInput.instanceSSKeySelectedId = value}"
          />

          <!-- 포트번호 -->
          <InstancePortNumber @instancePortNumber="(value)=>{
            currentInput.instancePortNumber = value
          }" />
        </div>

        <div class="aside_cont">
          <div class="aside_box">
            <p class="section_title">인스턴스</p>
            <ul class="instance_data">
              <li :class="`i_d0${i + 1}`" v-for="(list, i) in datalist" :key="list">
                <q-item class="i_data_title">{{ list.title }}</q-item>
                <q-item class="i_data_value"
                  ><p>{{ list.value }}</p></q-item
                >
              </li>
            </ul>
            <div class="make_btn">
              <q-btn btnTypes="1" type="button" class="c_btn medium" :disable="isCreateTask" @click="createTask()">
                <span class="txt">태스크 생성</span>
              </q-btn>
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
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useCommonStore } from "stores/useCommonStore.js";
import { InstanceService } from "src/services";
import { $useCmFn } from "src/composables/useCommonFunction.js";

import InstanceNameDescription from "./components/instance/InstanceNameDescription.vue";
import InstanceType from "./components/instance/InstanceType.vue";
import InstanceImage from "./components/instance/InstanceImage.vue";
import InstanceStorage from "./components/instance/InstanceStorage.vue";
import InstanceSshKey from "./components/instance/InstanceSshKey.vue";
import InstancePortNumber from "./components/instance/InstancePortNumber.vue";

const route = useRoute();
const router = useRouter();

const { me } = storeToRefs(useCommonStore());
const { workspaceId, projectId } = route.params;
const userId = computed(() => me.value.id);

const title = ref("인스턴스 생성");
useMeta(() => ({
  title: title.value,
}));

onMounted(() => {});
const currentInput = ref({
  instanceName: "",
  instanceDescription: "",
  instanceTypeSelected: {
    cpu: null,
    gpu: null,
    mem: null,
    disk: null,
  },
  instanceImageId: null,
  instanceImage: "",
  instanceSSKeySelected: null,
  instanceSSKeySelectedId: null,
  instancePortNumber: [],
});

const postParams = ref({
  nickname: computed(() => currentInput.value.instanceName),
  description: computed(() => currentInput.value.instanceDescription),
  image_id: computed(() => currentInput.value.instanceImageId),
  owner_id: 1, // ?
  instance_type: "test.cpu100m",
  ssh_key_id: computed(() => currentInput.value.instanceSSKeySelectedId),
  extra_ports: computed(() => currentInput.value.instancePortNumber),
  proxy_on: true
});

const isCreateTask = computed(() => postParams.value.nickname === ""
  || postParams.value.description === ""
  || postParams.value.image_id === null
  || postParams.value.instance_type === null
  || postParams.value.ssh_key_id === null
  || postParams.value.extra_ports.length === 0);

const updateInstanceTypeSelected = (value) => {
  currentInput.value.instanceTypeSelected = {
    cpu: value.cpu,
    gpu: value.gpu,
    mem: value.mem,
  };
};

/* *  성공 메세지 */
const triggerSuccess = (message) => {
  $useCmFn.onNotify({
    message,
    type: "positive",
  });
};

const triggerFails = (message) => {
  $useCmFn.onNotify({
    message,
    type: "negative",
  });
};

const createTask = async () => {
  try {
    await InstanceService.createIntance(projectId, postParams.value);
    triggerSuccess("인스턴스가 생성되었습니다.");
    setTimeout(() => {
      router.push(`/workspace/${workspaceId}/projects/${projectId}`);
    }, 100);
  } catch (error) {
    triggerFails("인스턴스 생성을 실패하였습니다. 다시 시도해주세요.");
    console.log(error);
  }
};

const ptitle = ref(title);

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
  { title: "이름", value: computed(() => (currentInput.value.instanceName === "" ? "-" : currentInput.value.instanceName)), },
  { title: "인스턴스 타입", value: "Tesla V100" },
  { title: "GPU", value: computed(() => (currentInput.value.instanceTypeSelected.gpu === "" ? "-" : currentInput.value.instanceTypeSelected.gpu)) },
  { title: "CPU", value: computed(() => (currentInput.value.instanceTypeSelected.cpu === "" ? "-" : currentInput.value.instanceTypeSelected.cpu)) },
  { title: "Memory", value: computed(() => (currentInput.value.instanceTypeSelected.mem === "" ? "-" : currentInput.value.instanceTypeSelected.mem)) },
  { title: "Disk", value: "80GiB" }, // ??disk
  { title: "이미지", value: computed(() => (currentInput.value.instanceImage === "" ? "-" : currentInput.value.instanceImage)), },
  { title: "스토리지", value: "개인 스토리지 외 3개" },
  { title: "SSH/JupyterLab", value: "tda" },
  { title: "포트번호", value: computed(() => (currentInput.value.instancePortNumber.length > 0 ? currentInput.value.instancePortNumber.join(",") : "-")), },
]);
</script>

<style lang="scss" scoped>
@import "./src/css/projects";
@import "./src/css/table";
</style>
