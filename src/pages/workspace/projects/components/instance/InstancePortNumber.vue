<template>

<div class="s_07">
            <p class="sub_title2">포트 번호 입력</p>
            <div class="s_07_main wsize608">
              <div class="port_num_input">
                <div class="c_inpgroup">
                  <p class="info_txt">최대 10개</p>
                  <q-select
                    outlined
                    v-model="shareChipModel"
                    placeholder="포트 번호 입력"
                    use-input
                    use-chips
                    multiple
                    input-debounce="0"
                    @new-value="createValue"
                    :options="filterOptions"
                    @filter="chipFilterFn"
                    class="c_inpchip wsize_full"
                  >
                    <!-- <template v-slot:append>
                      <div class="slotopt"></div>
                    </template>
                    <template v-slot:no-option>
                      <q-item class="no_data">
                        <q-item-section>
                          검색 결과 없습니다.
                        </q-item-section>
                      </q-item>
                    </template> -->
                  </q-select>
                </div>
                <template v-if="filterOptions == false">
                  <q-btn
                    type="button"
                    class="c_btn c_icon medium"
                  >
                    <i class="ico plus" /><span class="txt">Disabled</span>
                  </q-btn>
                </template>
                <template v-else>
                  <q-btn
                    type="button"
                    class="c_btn c_icon medium"
                  >
                    <i class="ico plus" /><span class="txt">Button</span>
                  </q-btn>
                </template>
              </div>
              <div class="port_list_area">
                <template v-if="noMemberList == true">
                  <ul class="port_list_box com_border_box">
                    <li>
                      <p>등록된 포트 번호가 없습니다.</p>
                    </li>
                  </ul>
                </template>
                <template v-else>
                  <ul class="port_list_box add_port_box com_border_box">
                    <li><span class="port_badge">32233<i class="ico cancel" /></span></li>
                    <li><span class="port_badge">32233<i class="ico cancel" /></span></li>
                    <li><span class="port_badge">08~65535<i class="ico cancel" /></span></li>
                    <li><span class="port_badge">32233<i class="ico cancel" /></span></li>
                    <li><span class="port_badge">32233<i class="ico cancel" /></span></li>
                    <li><span class="port_badge">32233<i class="ico cancel" /></span></li>
                    <li><span class="port_badge">32233<i class="ico cancel" /></span></li>
                    <li><span class="port_badge">32233<i class="ico cancel" /></span></li>
                    <li><span class="port_badge">32233<i class="ico cancel" /></span></li>
                    <li><span class="port_badge">32233<i class="ico cancel" /></span></li>
                    <li><span class="port_badge">132135<i class="ico cancel" /></span></li>
                    <li><span class="port_badge">32233<i class="ico cancel" /></span></li>
                    <li><span class="port_badge">08~65535<i class="ico cancel" /></span></li>
                    <li><span class="port_badge">32233<i class="ico cancel" /></span></li>
                    <li><span class="port_badge">08~65535<i class="ico cancel" /></span></li>
                    <li><span class="port_badge">32233<i class="ico cancel" /></span></li>
                    <li><span class="port_badge">08~65535<i class="ico cancel" /></span></li>
                  </ul>
                </template>
              </div>
            </div>
          </div>
</template>

<script setup>
import { ref } from "vue";

const stringOptions = [];
const filterOptions = ref(stringOptions);

const noMemberList = ref(true);

const shareChipModel = ref(null);

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

</script>
<style lang="scss" scoped>
@import "./src/css/projects";
@import "./src/css/table";
</style>
