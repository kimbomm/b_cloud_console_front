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
      <p class="type">유형&nbsp;<span class="essential">*</span></p>
      <CDropdown
        class="type-dropdown"
        v-model:selected="selectedBasic"
        :label="label"
        :options="options"
        @click="visible"
      />
      <div
        class="type-area area-box"
        v-if="visible === 'A'"
      >
        <p class="type-area_text">유형을 선택해주세요</p>
      </div>
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
          <section
            class="request-input"
            aria-label="프로젝트 설명"
          >
            <p class="sub_title">요청 내용</p>
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
              >
              </q-input>
            </div>
          </section>
        </div>
        <div class="q_btngroup">
          <q-btn
            label="요청하기"
            class="primary req-btn"
            @click="triggerSuccess1('top-right')"
            disabled
          />
        </div>
      </template>
      <!-- 고객지원-문의하기-리소스 할당량 변경 -->
      <template v-else-if="visible === 'C'">
        <div class="resource-area area-box">
          <p class="title">CPU, GPU 할당 요청량 입력&nbsp;<span class="essential">*</span></p>
          <section
            class="section"
            aria-label="CPU"
          >
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
                  v-model="quota1"
                  type="number"
                  placeholder="0"
                  clearable
                  class="inp_unit"
                >
                </q-input>
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
                  v-model="quota2"
                  type="number"
                  placeholder="0"
                  clearable
                  class="inp_unit"
                >
                </q-input>
              </div>
            </div>
            <section
              class="request-input"
              aria-label="프로젝트 설명"
            >
              <p class="sub_title">요청 내용</p>
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
          </section>
        </div>
        <div class="q_btngroup">
          <q-btn
            label="요청하기"
            class="primary req-btn"
            @click="triggerSuccess1('top-right')"
            disabled
          />
        </div>
        <!-- to="/support" -->
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
          <CUploader />
        </div>
        <div class="q_btngroup">
          <q-btn
            label="제보하기"
            class="primary req-btn"
            @click="triggerSuccess2('top-right')"
            disabled
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
          <CUploader />
        </div>
        <div class="q_btngroup">
          <q-btn
            label="문의하기"
            class="primary req-btn"
            @click="triggerSuccess3('top-right')"
            disabled
          />
        </div>
      </template>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import { useMeta, useQuasar } from "quasar";
import CDropdown from "components/common/CDropdown.vue";
import CUploader from "components/common/CUploader.vue";

const visible = ref("C");
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

const $q = useQuasar();
const quota1 = ref(null);
const quota2 = ref(null);

const triggerSuccess1 = (position) => {
  setTimeout(() => {
    $q.notify({
      type: "positive",
      message: "문의내용이 접수되었습니다.",
      icon: "positive",
      position,
      actions: [
        {
          label: "닫기",
          class: "xclose",
          handler: () => {
            /* console.log('') */
          },
        },
      ],
      timeout: 3000,
    });
  }, 100);
};

const triggerSuccess2 = (position) => {
  setTimeout(() => {
    $q.notify({
      type: "positive",
      message: "제보내용이 접수되었습니다.",
      icon: "positive",
      position,
      actions: [
        {
          label: "닫기",
          class: "xclose",
          handler: () => {
            /* console.log('') */
          },
        },
      ],
      timeout: 3000,
    });
  }, 100);
};

const triggerSuccess3 = (position) => {
  setTimeout(() => {
    $q.notify({
      type: "positive",
      message: "문의내용이 접수되었습니다.",
      icon: "positive",
      position,
      actions: [
        {
          label: "닫기",
          class: "xclose",
          handler: () => {
            /* console.log('') */
          },
        },
      ],
      timeout: 3000,
    });
  }, 100);
};
</script>

<style lang="scss" scoped>
.q_btngroup {
  display: flex;
  justify-content: flex-end;
}
</style>
