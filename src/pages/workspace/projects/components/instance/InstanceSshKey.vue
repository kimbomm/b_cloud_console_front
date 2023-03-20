<template>
  <div class="s_03 pb78">
    <p class="sub_title2">SSH Key<i class="ess">*</i></p>
    <div class="s_03_main">
      <template v-if="isDefaultData">
        <div class="s_03_table">
          <easy-data-table
            :headers="sshKeyHeader"
            :items="sshKeyItems"
            :hide-footer="true"
            empty-message="정보가 없습니다."
            @click-row="showRowChecked"
            :id="tableId"
            :body-row-class-name="bodyRowClassNameFunctionCheck"
          >
            <!-- name -->
            <template #item-title="item">
              <span class="txt">{{ item.name }}</span>
            </template>
            <!-- fingerprint -->
            <template #item-cpu="item">
              <span class="txt">{{ item.fingerprint }}</span>
            </template>
            <!-- 등록일시 -->
            <template #item-memory="item">
              <span class="txt">{{ item.created_at }}</span>
            </template>
          </easy-data-table>

          <div class="disflex_C mt32">
            <c-pagination />
          </div>
        </div>
      </template>

      <template v-else>
        <div class="com_nondata_area">
          <div class="nondata_box">
            <p class="nondata_txt">생성된 인스턴스가 없습니다.</p>
            <div class="nondata_btn">
              <q-btn
                btnTypes="1"
                type="button"
                class="c_btn medium"
                @click="createSSKey()"
              >
                <span class="txt">등록하기</span>
              </q-btn>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { UserService } from "src/services";
import { useRouter, useRoute } from "vue-router";

import CPagination from "components/common/CPagination.vue";

const router = useRouter();
const route = useRoute();
const { workspaceId } = route.params;

const itemsSelected = ref([]);
const emit = defineEmits(["instanceSSKeySelected"]);

const props = defineProps({
  userId: {
    type: Number,
  },
});

// SSH Key 테이블
const sshKeyHeader = [
  {
    text: "이름",
    value: "title",
    width: 190,
    sortable: false,
  },
  {
    text: "Fingerprint",
    value: "fingerprint",
    widthAuto: true,
    width: 280,
    sortable: false,
  },
  {
    text: "등록일시",
    value: "created_at",
    width: 328,
    sortable: false,
  },
];

const sshKeyItems = ref([
  {
    id: 1,
    name: "dummy-user-key",
    type: "ssh-rsa",
    fingerprint: "SHA256:T/AjzO3EwGUAKPPviSXPnTIjrxhgPWmZjQ/JOU+nAzo",
    description: "",
    created_at: "2023-03-17T17:00:14Z",
  },
  {
    id: 2,
    name: "dummy-user-key",
    type: "ssh-rsa",
    fingerprint: "SHA256:T/AjzO3EwGUAKPPviSXPnTIjrxhgPWmZjQ/JOU+nAzo222",
    description: "",
    created_at: "2023-03-17T17:00:14Z222",
  },
]);

const createSSKey = () => {
  router.push({
    path: `/workspace/${workspaceId}/my`,
    hash: "#key",
  });
};

const isDefaultData = computed(() => !!sshKeyItems.value?.length);

// function makeFingerprint(list) {
//   const regex = /^SHA256:T\/(.*)$/;
//   const match = regex.exec(list);
//   return match ? match[1] : "";
// }

// const makeSSHkey = computed(() => {
//   for (let i = 0; i < sshKeyItems.value.length; i++) {
//     const key = sshKeyItems.value[i];
//     const fingerprint = makeFingerprint(key.fingerprint);
//     return fingerprint;
//   }
// });

const getSSHKeys = async () => {
  try {
    const result = await UserService.getSSHKeys(props.userId);

    sshKeyItems.value = result.ssh_keys;
  } catch (error) {
    console.log(error);
  }
};

const bodyRowClassNameFunctionCheck = (item) => {
  const classList = [];
  /*
   * disabled 처리
   * 예시) 리소스 할당량 초과
   * */
  if (item.id === 132) {
    classList.push("row-isdim");
  }
  return classList.join(" ");
};

/* row 클릭 시 해당 행 checked */
const tableId = "SSkeyType";
const showRowChecked = (item) => {
  const nNum = sshKeyItems.value.findIndex((n) => n.id === item.id);
  sshKeyItems.value.splice(0, 0, ...sshKeyItems.value.splice(nNum, 1));

  const selected = document.querySelectorAll(`#${tableId} table tr`);
  selected.forEach((tr, index) => tr.classList.toggle("row-isCheck", index === 1));
  itemsSelected.value = item;
  emit("instanceSSKeySelected", item.id);
};

onMounted(() => {
  getSSHKeys();
});
</script>

<style lang="scss" scoped>
@import "./src/css/projects";
@import "./src/css/table";
</style>
