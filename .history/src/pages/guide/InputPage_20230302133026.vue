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
            <CInput />

            <!-- Base Text Disabled -->
            <CInput disable />

            <!-- Base Text Error -->
            <q-input
              outlined
              v-model="texterror"
              bottom-slots
              :error="!isValid"
              hint="Description"
              placeholder="Placeholder Text"
              class="c_inp"
            >
              <template v-slot:error>
                Error!
              </template>
            </q-input>

            <!-- Base Text Success -->
            <q-input
              outlined
              v-model="comfirm"
              placeholder="Placeholder Text"
              hint="Comfirmed!"
              clearable
              class="c_inp q-field--positive"
            >
              <template v-slot:hint>
                Comfirmed!
              </template>
            </q-input>
          </div>
        </div>

        <h2 class="h6">Input - type="password"</h2>
        <div class="group">
          <div class="c_inpgroup">
            <!-- Password -->
            <q-input
              outlined
              v-model="password"
              placeholder="비밀번호 입력"
              hint="Description"
              clearable
              class="c_inp c_password"
              :type="isPwd ? 'password' : 'text'"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  :class="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>

            <!-- Password Disabled -->
            <q-input
              outlined
              v-model="password"
              placeholder="1q2w3e4r%T"
              hint="Description"
              clearable
              disable
              class="c_inp c_password"
              :type="isPwd ? 'password' : 'text'"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  :class="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>

            <!-- Password Error -->
            <q-input
              outlined
              v-model="passworderror"
              bottom-slots
              hint="Description"
              placeholder="비밀번호 입력"
              class="c_inp c_password"
              :error="!isPwdValid"
              :type="isPwd ? 'password' : 'text'"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  :class="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
              <template v-slot:error>
                Error!
              </template>
            </q-input>

            <!-- Password Success -->
            <q-input
              outlined
              v-model="password"
              placeholder="비밀번호 입력"
              hint="Comfirmed!"
              clearable
              class="c_inp c_password q-field--positive"
              :type="isPwd ? 'password' : 'text'"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  :class="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>
        </div>

        <h2 class="h6">Input - type="Suffix"</h2>
        <div class="group">
          <div class="c_inpgroup">
            <q-input
              outlined
              v-model="suffix"
              placeholder="Placeholder Text"
              hint="Description"
              prefix="Prefix"
              suffix="Suffix"
              clearable
              class="wsize_full"
            >
              <template v-slot:prepend>
                <q-icon name="search" class="ico_search" />
              </template>
              <template v-slot:append>
                <q-icon />
              </template>
            </q-input>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="h6">Input - Search</h2>
        <div class="group">
          <div class="c_inpgroup">
            <q-select
              outlined
              v-model="searchModel"
              placeholder="사용자, 프로젝트, 워크스페이스 검색"
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              :options="options"
              @filter="filterFn"
              clearable
              class="c_inpchip"
            >
              <template v-slot:prepend>
                <q-icon name="search" class="ico_search" />
              </template>
              <template v-slot:no-option>
                <q-item class="inner_loading">
                  <q-inner-loading
                    :showing="visible"
                    label="잠시만 기다려 주세요..."
                    label-class="loading_text"
                  />
                </q-item>
                <q-item class="no_data">
                  <q-item-section>
                    검색 결과 없습니다.
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <q-select
              outlined
              v-model="searchModel"
              placeholder="사용자, 프로젝트, 워크스페이스 검색"
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              :options="options"
              @filter="filterFn"
              clearable
              disable
              class="c_inpchip"
            >
              <template v-slot:prepend>
                <q-icon name="search" class="ico_search" />
              </template>
              <template v-slot:no-option>
                <q-item class="inner_loading">
                  <q-inner-loading
                    :showing="visible"
                    label="잠시만 기다려 주세요..."
                    label-class="loading_text"
                  />
                </q-item>
                <q-item class="no_data">
                  <q-item-section>
                    검색 결과 없습니다.
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="h6">Input - Search Typing - dropdown - check</h2>
        <div class="group">
          <div class="c_inpgroup">
            <q-select
              outlined
              v-model="chipModel"
              use-input
              use-chips
              multiple
              input-debounce="0"
              @new-value="createValue"
              :options="filterOptions"
              @filter="chipFilterFn"
              clearable
              class="c_inpchip"
            >
              <template v-slot:prepend>
                <q-icon name="search" class="ico_search" />
              </template>
              <template v-slot:no-option>
                <q-item class="no_data">
                  <q-item-section>
                    검색 결과 없습니다.
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="h6">Input - dropdown - check</h2>
        <div class="group">
          <div class="c_inpgroup">
            <q-select
              outlined
              v-model="chipModel"
              use-input
              use-chips
              multiple
              input-debounce="0"
              @new-value="createValue"
              :options="filterOptions"
              @filter="chipFilterFn"
              class="c_inpchip"
            >
              <template v-slot:prepend>
                <q-icon name="search" class="ico_search" />
              </template>
              <template v-slot:append>
                <div class="slotopt"></div>
              </template>
              <template v-slot:no-option>
                <q-item class="no_data">
                  <q-item-section>
                    검색 결과 없습니다.
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
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
            <q-input
              outlined
              v-model="date"
              placeholder="2022.01.01"
              class="inp_calendar"
            >
              <template v-slot:prepend>
                <q-icon class="ico_calendar">
                  <q-popup-proxy :offset="[15, 18]" class="c_datepicker">
                    <q-date
                      v-model="date"
                      mask="YYYY.MM.DD"
                      class="datepicker"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

            <q-input
              outlined
              v-model="date"
              :value="dateRange"
              class="inp_calendar"
            >
              <template v-slot:prepend>
                <q-icon class="ico_calendar">
                  <q-popup-proxy :offset="[15, 18]" class="c_datepicker">
                    <q-date
                      v-model="dateRange"
                      mask="YYYY.MM.DD"
                      range
                      multiple
                      class="datepicker"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
        <div class="group">
          <div class="fakebg">
            <div class="from">
              <q-input
                outlined
                v-model="dateFrom"
                placeholder="2023.01.01"
                class="inp_calendar"
              >
                <template v-slot:prepend>
                  <q-icon class="ico_calendar">
                    <q-popup-proxy :offset="[0, 0]" class="c_datepicker">
                      <q-date
                        v-model="dateFrom"
                        mask="YYYY.MM.DD"
                        class="datepicker"
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-input
                outlined
                v-model="timeFrom"
                placeholder="12:00"
                class="inp_time"
              >
                <template v-slot:append>
                  <q-icon name="access_time">
                    <q-popup-proxy
                      :offset="[100, 0]"
                      class="c_time"
                    >
                      <q-time v-model="timeFrom" mask="HH:mm">
                        <q-btn v-close-popup label="확인" color="primary" flat />
                      </q-time>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <i class="bar" />
            <div class="to">
              <q-input
                outlined
                v-model="dateTo"
                placeholder="2023.01.01"
                class="inp_calendar"
              >
                <template v-slot:prepend>
                  <q-icon class="ico_calendar">
                    <q-popup-proxy
                      :offset="[150, 0]"
                      class="c_datepicker"
                    >
                      <q-date
                        v-model="dateTo"
                        mask="YYYY.MM.DD"
                        class="datepicker"
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-input
                outlined
                v-model="timeTo"
                placeholder="12:00"
                class="inp_time"
              >
                <template v-slot:append>
                  <q-icon name="access_time">
                    <q-popup-proxy
                      :offset="[240, 0]"
                      class="c_time"
                    >
                      <q-time v-model="timeTo" mask="HH:mm">
                        <q-btn v-close-popup label="확인" color="primary" flat />
                      </q-time>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { useMeta } from "quasar";
import CInput from "components/common/CInput.vue";
import CDropdown from "components/common/CDropdown.vue";

const title = ref("Input");
useMeta(() => ({
  title: title.value,
}));
const ptitle = ref(title);
const texterror = ref("Texterror");
const passworderror = ref("1q2w3e4r%T");
const suffix = ref("");
const comfirm = ref("Text");
const password = ref("");
const isPwd = ref(true);
const isValid = computed(() => texterror.value.length <= 8);
const isPwdValid = computed(() => passworderror.value.length <= 8);

// Typing - dropdown - check
const visible = ref(true);
const searchModel = ref(null);
const chipModel = ref(null);
const model1 = ref("읽기쓰기");
// const selectDate = ref(null);
// const selectDateRange = ref(null);
const date = ref(null);
const dateRange = ref(
  { from: "2023.01.09", to: "2023.01.30" }
);

const dateFrom = ref(null);
const timeFrom = ref(null);
const dateTo = ref(null);
const timeTo = ref(null);

const options1 = [
  "읽기쓰기", "읽기", "삭제",
];
const stringOptions = [
  "사용자", "프로젝트", "워크스페이스"
];
const options = ref(stringOptions);
const filterOptions = ref(stringOptions);
const filterFn = (val, update) => {
  update(() => {
    const needle = val.toLowerCase();
    options.value = stringOptions.filter((v) => v.toLowerCase().indexOf(needle) > -1);
  });
};
const createValue = (val, done) => {
  if (val.length > 0) {
    if (!stringOptions.includes(val)) {
      stringOptions.push(val);
    }
    done(val, "toggle");
  }
};
const chipFilterFn = (val, update) => {
  update(() => {
    if (val === "") {
      filterOptions.value = stringOptions;
    } else {
      const needle = val.toLowerCase();
      filterOptions.value = stringOptions.filter(
        (v) => v.toLowerCase().indexOf(needle) > -1
      );
    }
  });
};
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
