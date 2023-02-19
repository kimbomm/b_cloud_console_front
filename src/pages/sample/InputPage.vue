<template>
  <div class="p-content p-guide p-input">
    <div class="p-head">
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <section class="section">
        <h2 class="h6">Input - type="text"</h2>
        <div class="group">
          <div class="c_inpgroup">
            <!-- Base Text -->
            <c-input-text
              v-model:value="inputValue"
              placeholder="Placeholder Text"
              hint="Description"
            />

            <!-- Base Text Disabled -->
            <c-input-text
              v-model:value="inputValue"
              placeholder="Placeholder Text"
              hint="Description"
              disable
            />

            <!-- Base Text validation -->
            <c-input-text
              v-model:value="inputValue"
              placeholder="Placeholder Text"
              hint="Description"
              :rules="inputRules"
            />
          </div>
        </div>

        <h2 class="h6">Input - type="password"</h2>
        <div class="group">
          <div class="c_inpgroup">
            <!-- Password -->
            <c-input-text
              v-model:value="passwordValue"
              type="password"
              placeholder="비밀번호 입력"
              hint="Description"
              clearable
            />

            <!-- Password Disabled -->
            <c-input-text
              v-model:value="passwordValue"
              type="password"
              placeholder="비밀번호 입력"
              hint="Description"
              disable
            />

            <!-- Password Error -->
            <c-input-text
              v-model:value="passwordValue"
              type="password"
              placeholder="비밀번호 입력"
              hint="Description"
              :rules="inputRules"
            />
          </div>
        </div>

        <h2 class="h6">Input - type="Suffix"</h2>
        <div class="group">
          <div class="c_inpgroup">
            <c-input-text
              v-model:value="suffixValue"
              placeholder="Placeholder Text"
              hint="Description"
              prefix="Prefix"
              suffix="Suffix"
              class="wsize_full"
              :clearable="true"
            >
              <template v-slot:prepend>
                <q-icon name="search" class="ico_search" />
              </template>
            </c-input-text>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="h6">Input - Search</h2>
        <div class="group">
          <div class="c_inpgroup">
            <c-search-select
              placeholder="사용자, 프로젝트, 워크스페이스 검색"
              :options="options"
              :use-input="true"
              :clearable="true"
              :loading="true"
            />
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="h6">Input - Search Typing - dropdown - check</h2>
        <div class="group">
          <div class="c_inpgroup">
            <c-search-select
              placeholder=""
              :options="options"
              :clearable="true"
              :use-chips="true"
              :use-input="true"
              :multiple="true"
            />
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="h6">Input - dropdown - check</h2>
        <div class="group">
          <div class="c_inpgroup">
            <c-search-select
              placeholder=""
              :options="options"
              :clearable="true"
              :use-chips="true"
              :use-input="true"
              :multiple="true"
            />
            <div class="c_selectgroup">
              <CDropdown
                v-model:selected="model1"
                :label="'읽기쓰기'"
                :options="options1"
                :type="'text'"
              />
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="h6">Input - datepicker</h2>
        <div class="group">
          <div class="c_inpgroup">
            <c-datepicker
              :value="dateInput"
              :placeholder="'2022.01.01'"
            />
          </div>
        </div>
        <h2 class="h6">Input - datepicker-range</h2>
        <div class="group">
            <c-datepicker-range
              :from-value="dateRange.from"
              :to-value="dateRange.to"
              :placeholder="'YYYY.MM.DD'"
            />
        </div>
        <!-- TODO:
          1. range-time popup 내부 레이아웃 수정 필요
          2. from time 결정시 to time disabled 필요
        -->
        <h2 class="h6">Input - datepicker-range-time (팝업 수정 필요)</h2>
        <div class="group">
          <c-datepicker-range-time
            :from-value="dateTimeFrom"
            :to-value="dateTimeTo"
            :placeholder="'YYYY.MM.DD HH:mm'"
          />
        </div>
      </section>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useMeta, date } from "quasar";
import CInputText from "components/common/CInputText.vue";
import CSearchSelect from "components/common/CSearchSelect.vue";
import CDropdown from "components/common/CDropdown.vue";
import CDatepicker from "components/common/CDatepicker.vue";
import CDatepickerRange from "src/components/common/CDatepickerRange.vue";
import CDatepickerRangeTime from "src/components/common/CDatepickerRangeTime.vue";

const title = ref("Input");
useMeta(() => ({
  title: title.value,
}));
const ptitle = ref(title);
const inputValue = ref("123456789");
const inputRules = [
  (value) => (!!value) || "required",
  (value) => (value.length <= 8) || "8자를 넘을 수 없습니다"
];
const suffixValue = ref("");
const passwordValue = ref("");

const model1 = ref("읽기쓰기");
// const selectDate = ref(null);
// const selectDateRange = ref(null);
const dateInput = ref(date.formatDate(new Date(), "YYYY.MM.DD"));
const dateRange = ref({
  from: date.formatDate(new Date(), "YYYY.MM.DD"),
  to: date.formatDate(new Date(), "YYYY.MM.DD")
});

// const dateFrom = ref(null);
// const timeFrom = ref(null);
// const dateTo = ref(null);
// const timeTo = ref(null);
const dateTimeFrom = ref(date.formatDate(new Date(), "YYYY.MM.DD"));
const dateTimeTo = ref(date.formatDate(new Date(), "YYYY.MM.DD"));

const options1 = [
  "읽기쓰기", "읽기", "삭제",
];
const stringOptions = [
  "사용자", "프로젝트", "워크스페이스"
];
const options = ref(stringOptions);
onMounted(() => {});
</script>
<style lang="scss" scoped>
.p-content{
  &.p-input{
    padding-bottom:500px;
  }
}
.section{
  &:not(:first-child){
    margin-top:50px;
  }
  h2{
    margin-bottom:10px;
  }
  .h6{
    &:not(:first-child){
      margin-top:50px;
    }
  }
}
.group{
  margin-top:20px;
}
.inp_calendar:not(:last-child){
  margin-right:10px;
}
.c_inp{
  &:not(:last-child){
    margin-right:20px;
  }
}
.q-select:not(:first-child){
  margin-top:20px;
}
.c_selectgroup{
}
.c_inpgroup:not(:first-child){
  margin-top:20px;
}
</style>
