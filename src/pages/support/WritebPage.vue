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
      <p class="type">유형 <span class="essential">*</span></p>
      <c-dropdown
        class="type-dropdown"
        v-model:selected="selectedBasic"
        :label="label"
        :options="options"
        @click="visible"
      />
      <template v-if="visible === 'A'">
        <div class="type-area area-box">
          <p class="type-area_text">유형을 선택해주세요</p>
        </div>
      </template>
      <!-- 고객지원-문의하기-스토리지 할당량 변경 -->
      <template v-else-if="visible === 'B'">
        <div class="amount-area area-box">
          <p class="area-title">워크스페이스 스토리지 요청 할당량 입력&nbsp;<span class="essential">*</span></p>
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
          <div class="request-input" aria-label="프로젝트 설명">
            <p class="req_title" style="margin-bottom: 8px">요청 내용</p>
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
          </div>
        </div>
        <div class="c_btngroup f_end">
          <c-button
            :btn-names="'요청하기'"
            :disabled="true"
            class="req"
            @click="triggerInfo()"
          />
        </div>
      </template>
      <!-- 고객지원-문의하기-리소스 할당량 변경 -->
      <template v-else-if="visible === 'C'">
        <div class="resource-area area-box">
          <p class="title">CPU, GPU 할당 요청량 입력&nbsp;<span class="essential">*</span></p>
          <section class="section" aria-label="CPU">
            <p class="sub-title">CPU</p>
            <div class="unit_type">
              <span class="tit">현재 할당량</span>
              <span class="counter">
                <em class="usage">190</em>
              </span>
            </div>
            <div class="req-box">
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
            <p class="sub-title">Tesla A100</p>
            <div class="unit_type">
              <span class="tit">현재 할당량</span>
              <span class="counter">
                <em class="usage">190</em>
              </span>
            </div>
            <div class="req-box">
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
            <div class="request-input">
              <p class="req_title">요청 내용</p>
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
            </div>
          </section>
        </div>
        <div class="c_btngroup f_end">
          <c-button
            :btn-names="'요청하기'"
            :disabled="true"
            class="req"
            @click="triggerInfo()"
          />
        </div>
      </template>
      <!-- 고객지원-문의하기-오류/버그 제보 -->
      <template v-else-if="visible === 'D'">
        <div class="report-area area-box">
          <p class="title">제목&nbsp;<span class="essential">*</span></p>
          <div class="c_inpgroup">
            <q-input
              outlined
              v-model="textDesc"
              bottom-slots
              type="textarea"
              placeholder="제목을 입력해주세요."
              counter
              :count="10"
              maxlength="100"
              class="wsize_full hsize118 pl-px"
              :input-style="{height: '100%'}"
            />
          </div>
          <p class="title">내용&nbsp;<span class="essential">*</span></p>
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
          <p class="title-file">파일 업로드</p>
          <c-uploader />
        </div>
        <div class="c_btngroup f_end">
          <c-button
            :btn-names="'제보하기'"
            :disabled="true"
            class="req"
            @click="triggerInfo2()"
          />
        </div>
      </template>
      <!-- 고객지원-문의하기-기타문의 -->
      <template v-else-if="visible === 'E'">
        <div class="report-area area-box">
          <p class="title">제목&nbsp;<span class="essential">*</span></p>
          <div class="c_inpgroup">
            <q-input
              outlined
              v-model="textDesc"
              bottom-slots
              type="textarea"
              placeholder="제목을 입력해주세요."
              counter
              :count="10"
              maxlength="100"
              class="wsize_full hsize118 pl-px"
              :input-style="{height: '100%'}"
            />
          </div>
          <p class="title">내용&nbsp;<span class="essential">*</span></p>
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
          <p class="title-file">파일 업로드</p>
          <c-uploader />
        </div>
        <div class="c_btngroup f_end">
          <c-button
            :btn-names="'문의하기'"
            :disabled="true"
            class="req"
            @click="triggerInfo()"
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

const visible = ref("B");
const title = ref("Support");
const label = ref("유형선택");

useMeta(() => ({
  title: title.value,
  visible: "",
}));

const ptitle = ref(title);

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
