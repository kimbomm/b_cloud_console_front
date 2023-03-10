<template>
  <q-page class="p-content p-support p-write">
    <div class="p-head">
      <q-breadcrumbs
        class="c_breadcrumb"
        gutter="none"
      >
        <template v-slot:separator>
          <q-icon />
        </template>
        <q-breadcrumbs-el
          label="Workspace Manager"
          to="/support"
        />
        <q-breadcrumbs-el
          label="Support"
          to="/support"
        />
      </q-breadcrumbs>
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <div class="p-body">
      <p class="title">
        유형
        <span class="essential">*</span>
      </p>
      <c-dropdown
        class="type-dropdown"
        v-model:selected="selectedBasic"
        :label="label"
        :options="options"
        @click="visible"
      />
      <div class="view_contents bg">
        <template v-if="visible === 'A'">
          <p class="type">유형을 선택해주세요</p>
        </template>
        <!-- 고객지원-문의하기-스토리지 할당량 변경 -->
        <template v-if="visible === 'B'">
          <section class="section">
            <p class="title mb24">
              워크스페이스 스토리지 요청 할당량 입력
              <span class="essential">*</span>
            </p>
            <div class="unit_type">
              <span class="tit">현재 사용량</span>
              <span class="counter">
                <em class="usage">190</em>
                <i class="bar">/</i>
                <strong class="quota">450</strong>
              </span>
            </div>
            <div class="c_inpgroup flex-end">
              <q-input
                outlined
                v-model="quota1"
                type="number"
                placeholder="50GiB 단위 입력"
                clearable
                class="inp_unit"
              >
                <template v-slot:append>
                  <span class="unit">GiB</span>
                </template>
              </q-input>
              <span class="desc">최대 50,000</span>
            </div>
          </section>
          <section class="section">
            <p class="title mb8">요청 내용</p>
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="textDesc"
                bottom-slots
                type="textarea"
                placeholder="문의내용을 입력해주세요."
                counter
                :count="10"
                maxlength="1000"
                class="wsize_full hsize328 fs16"
              />
            </div>
          </section>
        </template>

        <!-- 고객지원-문의하기-리소스 할당량 변경 -->
        <template v-if="visible === 'C'">
          <section class="section">
            <p class="title mb24">
              CPU, GPU 할당 요청량 입력
              <span class="essential">*</span>
            </p>
            <p class="sub_title mb24">CPU</p>
            <div class="unit_type">
              <span class="useage">현재 할당량</span>
              <span class="counter">190</span>
            </div>
            <div class="unit_type">
              <span class="req">요청량</span>
              <div class="c_inpgroup flex-end">
                <q-input
                  outlined
                  v-model="quota2"
                  type="number"
                  placeholder="0"
                  clearable
                  class="inp_unit"
                />
                <span class="desc">권장 0</span>
              </div>
            </div>
            <p class="sub_title">Tesla A100</p>
            <div class="unit_type">
              <span class="useage">현재 할당량</span>
              <span class="counter">190</span>
            </div>
            <div class="unit_type">
              <span class="req">요청량</span>
              <div class="c_inpgroup flex-end">
                <q-input
                  outlined
                  v-model="quota3"
                  type="number"
                  placeholder="0"
                  clearable
                  class="inp_unit"
                />
              </div>
            </div>
          </section>
          <section class="section">
            <p class="title mb8">요청 내용</p>
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="textDesc"
                bottom-slots
                type="textarea"
                placeholder="문의내용을 입력해주세요."
                counter
                :count="10"
                maxlength="1000"
                class="wsize_full hsize328 fs16"
              />
            </div>
          </section>
        </template>

        <!-- 고객지원-문의하기-오류/버그 제보 -->
        <template v-if="visible === 'D'">
          <section class="section">
            <p class="title mb8">
              제목
              <span class="essential">*</span>
            </p>
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="textName"
                placeholder="제목을 입력해주세요."
                counter
                :count="10"
                maxlength="100"
                clearable
                class="wsize_full"
              />
            </div>
          </section>
          <section class="section">
            <p class="title mb8">
              내용
              <span class="essential">*</span>
            </p>
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="textDesc"
                bottom-slots
                type="textarea"
                placeholder="문의내용을 입력해주세요."
                counter
                :count="10"
                maxlength="1000"
                class="wsize_full hsize328 fs16"
              />
            </div>
          </section>
          <section class="section mb24">
            <p class="title mb24">파일 업로드</p>
            <c-uploader />
          </section>
        </template>

        <!-- 고객지원-문의하기-기타문의 -->
        <template v-if="visible === 'E'">
          <section class="section">
            <p class="title mb8">
              제목
              <span class="essential">*</span>
            </p>

            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="textName"
                placeholder="제목을 입력해주세요."
                counter
                :count="10"
                maxlength="100"
                clearable
                class="wsize_full"
              />
            </div>
          </section>
          <section class="section">
            <p class="title mb8">
              내용
              <span class="essential">*</span>
            </p>
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="textDesc"
                bottom-slots
                type="textarea"
                placeholder="문의내용을 입력해주세요."
                counter
                :count="10"
                maxlength="1000"
                class="wsize_full hsize244 pl-px"
                :input-style="{height: '100%'}"
              />
            </div>
          </section>
          <section class="section mb24">
            <p class="title mb24">파일 업로드</p>
            <c-uploader />
          </section>
        </template>
      </div>
      <template v-if="visible === 'B' || visible === 'C'">
        <div class="c_btngroup f_end">
          <c-button
            :btn-names="'요청하기'"
            :disabled="true"
            @click="triggerInfo()"
          />
        </div>
      </template>
      <template v-if="visible === 'D'">
        <div class="c_btngroup f_end">
          <c-button
            :btn-names="'제보하기'"
            :disabled="true"
            @click="triggerInfo2()"
          />
        </div>
      </template>
      <template v-if="visible === 'E'">
        <div class="c_btngroup f_end">
          <c-button
            :btn-names="'문의하기'"
            :disabled="true"
            @click="triggerInfo2()"
          />
        </div>
      </template>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import { $useCmFn } from "src/composables/useCommonFunction.js";
import CButton from "components/common/CButton.vue";
import CDropdown from "components/common/CDropdown.vue";
import CUploader from "components/common/CUploader.vue";

const title = ref("Support");

useMeta(() => ({
  title: title.value,
}));

const ptitle = ref(title);

const visible = ref("E");
const label = ref("유형선택");
const options = ref([
  { label: "유형선택", value: 0 },
  { label: "워크스페이스 스토리지 용량 변경(관리자 전용)", value: 1 },
  { label: "워크스페이스 CPU,GPU 할당량 변경(관리자 전용)", value: 2 },
  { label: "오류/버그 제보", value: 3 },
  { label: "기타문의", value: 4 },
]);

const quota1 = ref(null);
const quota2 = ref(null);
const quota3 = ref(null);

const triggerInfo = () => {
  $useCmFn.onNotify({
    message: "문의내용이 접수되었습니다.",
    type: "positive",
  });
};
const triggerInfo2 = () => {
  $useCmFn.onNotify({
    message: "제보내용이 접수되었습니다.",
    type: "positive",
  });
};
</script>

<style lang="scss" scoped>
@import 'src/css/support';
</style>
