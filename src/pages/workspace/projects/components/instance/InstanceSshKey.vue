<template>
  <div class="s_06 pb78">
    <p class="sub_title2">SSH Key<i class="ess">*</i></p>
    <div class="s_06_main">
      <template v-if="defaultData == true">
        <div class="s_06_table">
          <easy-data-table
            v-model:items-selected="itemsSelected"
            :headers="sshKeyHeader"
            :items="sshKeyItems"
            :hide-footer="true"
            :body-row-class-name="bodyRowClassNameFunction"
            empty-message="정보가 없습니다."
          >
            <!-- title -->
            <template #item-title="item">
              <a href="#">
                <span class="txt">{{ item.title }}</span>
              </a>
            </template>
            <!-- fingerprint -->
            <template #item-fingerprint="item">
              <a href="#">
                <span class="txt">{{ item.fingerprint }}</span>
                <q-tooltip anchor="bottom middle" class="c_tooltip">
                  <div class="inner">
                    {{ item.fingerprint }}
                  </div>
                </q-tooltip>
              </a>
            </template>
            <!-- registrationDat -->
            <template #item-registrationDat="item">
              <a href="#">
                <span class="txt">{{ item.registrationDat }}</span>
              </a>
            </template>
          </easy-data-table>
        </div>
      </template>
      <template v-else>
        <div class="com_nondata_area">
          <div class="nondata_box">
            <p class="nondata_txt">생성된 인스턴스가 없습니다.</p>
            <div class="nondata_btn">
              <q-btn btnTypes="1" type="button" class="c_btn medium">
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
import { ref } from "vue";

const defaultData = ref(true);
const itemsSelected = ref([]);

// SSH Key 테이블
const sshKeyHeader = [
  {
    text: "이름",
    value: "title",
    width: 110,
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
    value: "registrationDat",
    width: 200,
    sortable: false,
  },
];
const sshKeyItems = [
  {
    title: "개인용",
    fingerprint: "61:a2:62:d0:7e:3d:c9:0a:4e:fe:83:6c:14:bc:fa:0f",
    registrationDat: "2023.11.21  04:33:34",
  },
  {
    title: "기업용",
    fingerprint: "61:a2:62:d0:7e:3d:c9:0a:4e:fe:83:6c:14:bc:fa:0f",
    registrationDat: "2023.11.21  04:33:34",
  },
];
</script>

<style lang="scss" scoped>
@import "./src/css/projects";
@import "./src/css/table";
</style>
