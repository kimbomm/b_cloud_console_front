<template>
  <div class="s_07">
    <p class="sub_title2">포트 번호 입력</p>
    <div class="s_07_main wsize608">
      <div class="port_num_input">
        <div class="c_inpgroup">
          <p class="info_txt">최대 10개</p>

          <c-input-text
            class="wsize_full"
            v-model:value="portNumber"
            placeholder="포트 번호 입력"
            type="Number"
            :rules="inputRules"
            :disable="isInput"

          />
        </div>

        <q-btn type="button" class="c_btn c_icon medium" :disabled="isCreateButton" @click="addPosrtNumber()">
          <i class="ico plus" /><span class="txt">Disabled</span>
        </q-btn>
      </div>
      <div class="port_list_area">
        <template v-if="addPortNumbers.length > 0">
          <ul class="port_list_box add_port_box com_border_box">
            <li v-for="(port,index) in addPortNumbers" :key="port" @click="removePort(port,index)">
              <span class="port_badge">{{ port.number }}<i class="ico cancel" /></span>
            </li>
          </ul>

        </template>
        <template v-else>
          <ul class="port_list_box com_border_box">
            <li>
              <p>등록된 포트 번호가 없습니다.</p>
            </li>
          </ul>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import CInputText from "components/common/CInputText.vue";

const emit = defineEmits(["instancePortNumber"]);
const portNumber = ref(null);
const isInput = ref(false);
const addPortNumbers = ref([
  // { number: 333 },
]);

const makeAddPortNumbers = computed(() => addPortNumbers.value.map((item) => item.number));

const checkDuplicates = (value) => {
  if (addPortNumbers.value.some((port) => port.number === parseInt(value, 10))) {
    return false;
  }
  return true;
};

const isCreateButton = computed(() => {
  const duplicates = checkDuplicates(portNumber.value);
  return (!portNumber.value || portNumber.value < 80 || portNumber.value > 65535) || !duplicates;
});

const inputRules = ref([
  (value) => {
    if (!value) {
      return "";
    }
  },
  (value) => (value >= 80 && value <= 65535) || "80~65535 입력 가능",
  (value) => {
    if (!checkDuplicates(value)) {
      return "중복 입력 불가.";
    }
    return "";
  }
]);

const inputReset = () => {
  portNumber.value = null;
};

const addPosrtNumber = () => {
  if (addPortNumbers.value.length < 10) {
    console.log("portNumber.value", portNumber.value);
    addPortNumbers.value.push({ number: parseInt(portNumber.value, 10) });
  } else {
    isInput.value = true;
  }
  emit("instancePortNumber", makeAddPortNumbers.value);
  inputReset();
};

const removePort = (index) => {
  addPortNumbers.value.splice(index, 1);
  emit("instancePortNumber", makeAddPortNumbers.value);
};

</script>
<style lang="scss" scoped>
@import "./src/css/projects";
@import "./src/css/table";
</style>
