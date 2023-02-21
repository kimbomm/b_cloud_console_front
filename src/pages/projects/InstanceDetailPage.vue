<template>
  <q-page class="p-content p-projects p-make">
    <div class="p-head">
      <q-breadcrumbs
        class="c_breadcrumb"
        gutter="none"
      >
        <template v-slot:separator>
          <q-icon />
        </template>
        <q-breadcrumbs-el
          label="Projects"
          to="/"
        />
        <q-breadcrumbs-el
          label="Test Project"
          to="/"
        />
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
          <div class="s_01">
            <p class="sub_title">인스턴스 이름<i class="ess">*</i></p>
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="textName"
                placeholder="최소 2자 최대 30자"
                clearable
                class="wsize608"
              />
            </div>
          </div>
          <div class="s_02">
            <p class="sub_title">인스턴스 설명</p>
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="textDesc"
                bottom-slots
                type="textarea"
                placeholder="인스턴스 설명 입력"
                clearable
                counter
                :count="10"
                maxlength="500"
                class="wsize_full hsize244"
                :input-style="{height: '100%'}"
              >
              </q-input>
            </div>
          </div>
          <div class="s_03 pb78">
            <p class="sub_title2">인스턴스 타입<i class="ess">*</i></p>
            <div class="s_03_main">
              <div class="s_03_tab">
                <q-tabs
                  v-model="tab"
                  align="left"
                  class="c_tabs"
                >
                  <q-tab
                    name="tabs1"
                    label="CPU"
                  ></q-tab>
                  <q-tab
                    name="tabs2"
                    label="GPU Tesla V100"
                  ></q-tab>
                  <q-tab
                    name="tabs3"
                    label="GPU Tesla A100_40G"
                  ></q-tab>
                </q-tabs>
              </div>
              <div class="now_selected_area">
                <div class="select_box">
                  <q-item class="select_title">
                    <p class="select_title_inner">선택된 타입</p>
                  </q-item>
                  <q-item class="select_value">
                    <p class="select_value_inner">cg.nano (CPU 2 / MEM 122GB / DISK 80GiB)</p>
                  </q-item>
                </div>
              </div>
              <div class="s_03_table">
                <EasyDataTable
                  v-model:items-selected="itemsSelected"
                  :headers="instanceHeaders"
                  :items="instanceItems"
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
                  <!-- cpu -->
                  <template #item-cpu="item">
                    <a href="#">
                      <span class="txt">{{ item.cpu }}</span>
                    </a>
                  </template>
                  <!-- memory -->
                  <template #item-memory="item">
                    <a href="#">
                      <span class="txt">{{ item.memory }}</span>
                    </a>
                  </template>
                  <!-- disk -->
                  <template #item-disk="item">
                    <a href="#">
                      <span class="txt">{{ item.disk }}</span>
                    </a>
                  </template>
                  <!-- 버튼 그룹 -->
                  <template #item-buttons="item">
                    <q-btn v-if="item.checkbox" class="text">
                      <span class="txt">선택 취소하기</span>
                      </q-btn>
                  </template>
                </EasyDataTable>
              </div>
              <div class="disflex_C mt32">
                <CPagination />
              </div>
            </div>
          </div>
          <div class="s_04 pb78">
            <p class="sub_title2">이미지<i class="ess">*</i></p>
            <div class="s_04_main">
              <div class="s_04_tab">
                <q-tabs
                  v-model="tab2"
                  align="left"
                  class="c_tabs"
                >
                  <q-tab
                    name="tabs1"
                    label="기본 이미지"
                  ></q-tab>
                  <q-tab
                    name="tabs2"
                    label="내이미지"
                  ></q-tab>
                  <q-tab
                    name="tabs3"
                    label="공유받은 이미지"
                  ></q-tab>
                </q-tabs>
              </div>
              <div class="now_selected_area">
                <div class="select_box">
                  <q-item class="select_title">
                    <p class="select_title_inner">선택된 타입</p>
                  </q-item>
                  <q-item class="select_value">
                    <p class="select_value_inner">tensorflow 2.9.0 (python3, cuda11.2, ubuntu20.04)</p>
                  </q-item>
                </div>
              </div>
              <template v-if="tab2 === 'tabs1'">
                <template v-if="defaultData == true">
                  <div class="s_04_table">
                    <EasyDataTable
                      v-model:items-selected="itemsSelected"
                      :headers="imgHeader1"
                      :items="imgItems1"
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
                      <!-- nvida -->
                      <template #item-nvida="item">
                        <a href="#">
                          <span class="txt">{{ item.nvida }}</span>
                        </a>
                      </template>
                      <!-- 버튼 그룹 -->
                      <template #item-buttons="item">
                        <q-btn v-if="item.checkbox" class="text">
                          <span class="txt">선택 취소하기</span>
                          </q-btn>
                      </template>
                    </EasyDataTable>
                  </div>
                  <div class="disflex_C mt32">
                    <CPagination />
                  </div>
                </template>
                <template v-else>
                  <div class="com_nondata_area">
                    <div class="nondata_box">
                      <p class="nondata_txt">생성된 이미지가 없습니다.</p>
                    </div>
                  </div>
                </template>
              </template>
              <template v-if="tab2 === 'tabs2'">
                <template v-if="defaultData == true">
                  <div class="s_04_table">
                    <EasyDataTable
                      v-model:items-selected="itemsSelected"
                      :headers="imgHeader2"
                      :items="imgItems2"
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
                      <!-- description -->
                      <template #item-description="item">
                        <a href="#">
                          <span class="txt">{{ item.description }}</span>
                        </a>
                      </template>
                        <!--
                          상태값(status)
                          1. sharing, 저장(공유)
                          2. error, 오류
                          3. inStorage, 저장중
                        -->
                        <template #item-status="item">
                          <q-badge v-if="item.status === 'sharing'" class="green">
                            <span class="txt">저장(공유)</span>
                          </q-badge>
                          <q-badge v-else-if="item.status === 'error'" class="orange">
                            <span class="txt">오류</span>
                          </q-badge>
                          <q-badge v-else-if="item.status === 'inStorage'">
                            <span class="txt">저장중</span>
                          </q-badge>
                          <q-item v-else-if="item.status === 'group'" class="badge_group">
                            <div class="badge">
                              <q-badge class="green">
                                <span class="txt">7</span>
                              </q-badge>
                              <q-badge class="orange">
                                <span class="txt">20</span>
                              </q-badge>
                              <q-badge class="c_badge">
                                <span class="txt">27</span>
                              </q-badge>
                            </div>

                            <q-popup-edit v-model="badgeGroup"
                            self="bottom middle" class="badge_menu">
                              <div class="inner">
                                <q-list>
                                  <q-item>
                                    <q-item-section>
                                      <div class="badge_item">
                                        <q-badge class="green">
                                          <span class="txt">실행중</span>
                                        </q-badge>
                                        <span class="count">2</span>
                                      </div>
                                    </q-item-section>
                                    <q-item-section>
                                      <div class="badge_item">
                                        <q-badge>
                                          <span class="txt">생성중</span>
                                        </q-badge>
                                        <span class="count">2</span>
                                      </div>
                                    </q-item-section>
                                  </q-item>
                                  <q-item>
                                    <q-item-section>
                                      <div class="badge_item">
                                        <q-badge class="green">
                                          <span class="txt">완료</span>
                                        </q-badge>
                                        <span class="count">5</span>
                                      </div>
                                    </q-item-section>
                                    <q-item-section>
                                      <div class="badge_item">
                                        <q-badge>
                                          <span class="txt">재시작중</span>
                                        </q-badge>
                                        <span class="count">5</span>
                                      </div>
                                    </q-item-section>
                                  </q-item>
                                  <q-item>
                                    <q-item-section>
                                      <div class="badge_item">
                                        <q-badge class="orange">
                                          <span class="txt">취소</span>
                                        </q-badge>
                                        <span class="count">10</span>
                                      </div>
                                    </q-item-section>
                                    <q-item-section>
                                      <div class="badge_item">
                                        <q-badge>
                                          <span class="txt">취소중</span>
                                        </q-badge>
                                        <span class="count">10</span>
                                      </div>
                                    </q-item-section>
                                  </q-item>
                                  <q-item>
                                    <q-item-section>
                                      <div class="badge_item">
                                        <q-badge class="orange">
                                          <span class="txt">실패</span>
                                        </q-badge>
                                        <span class="count">10</span>
                                      </div>
                                    </q-item-section>
                                    <q-item-section>
                                      <div class="badge_item">
                                        <q-badge>
                                          <span class="txt">삭제중</span>
                                        </q-badge>
                                        <span class="count">10</span>
                                      </div>
                                    </q-item-section>
                                  </q-item>
                                </q-list>
                              </div>
                            </q-popup-edit>
                          </q-item>
                          <q-badge v-else class="c_badge">
                            <span class="txt">생성중</span>
                          </q-badge>
                        </template>
                      <!-- createdAt -->
                      <template #item-createdAt="item">
                        <a href="#">
                          <span class="txt">{{ item.createdAt }}</span>
                        </a>
                      </template>
                      <!-- 버튼 그룹 -->
                      <template #item-buttons="item">
                        <q-btn v-if="item.checkbox" class="text">
                          <span class="txt">선택 취소하기</span>
                          </q-btn>
                      </template>
                    </EasyDataTable>
                  </div>
                  <div class="disflex_C mt32">
                    <CPagination />
                  </div>
                </template>
                <template v-else>
                  <div class="com_nondata_area">
                    <div class="nondata_box">
                      <p class="nondata_txt">생성된 이미지가 없습니다.</p>
                    </div>
                  </div>
                </template>
              </template>
              <template v-if="tab2 === 'tabs3'">
                <template v-if="defaultData == true">
                  <div class="s_04_table">
                    <EasyDataTable
                      v-model:items-selected="itemsSelected"
                      :headers="imgHeader3"
                      :items="imgItems3"
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
                      <!-- description -->
                      <template #item-description="item">
                        <a href="#">
                          <span class="txt">{{ item.description }}</span>
                        </a>
                      </template>
                      <!-- owner -->
                      <template #item-owner="item">
                        <a href="#">
                          <span class="txt">{{ item.owner }}</span>
                        </a>
                      </template>
                      <!-- 버튼 그룹 -->
                      <template #item-buttons="item">
                        <q-btn v-if="item.checkbox" class="text">
                          <span class="txt">선택 취소하기</span>
                          </q-btn>
                      </template>
                    </EasyDataTable>
                  </div>
                  <div class="disflex_C mt32">
                    <CPagination />
                  </div>
                </template>
                <template v-else>
                  <div class="com_nondata_area">
                    <div class="nondata_box">
                      <p class="nondata_txt">공유받은 이미지가 없습니다.</p>
                    </div>
                  </div>
                </template>
              </template>
            </div>
          </div>
          <div class="s_05 pb78">
            <p class="sub_title2">스토리지</p>
            <div class="s_05_main">
              <div class="select_now_view">
                <p>
                  <span class="change_num">0</span> / 5
                </p>
                선택
              </div>
              <div class="s_05_table">
                <EasyDataTable
                  v-model:items-selected="itemsSelected"
                  :headers="storageHeader"
                  :items="storageItems"
                  :hide-footer="true"
                  :body-row-class-name="bodyRowClassNameFunction"
                  empty-message="정보가 없습니다."
                >
                  <!-- 이름 -->
                  <template #item-title="item">
                    <a href="#">
                      <span class="txt">{{ item.title }}</span>
                    </a>
                  </template>
                  <!-- description -->
                  <template #item-description="item">
                    <a href="#">
                      <span class="txt">{{ item.description }}</span>
                    </a>
                  </template>
                  <!--
                    상태값(status)
                    1. running, 운영중
                    2. deleting, 삭제중
                    3. restoring, 복구중
                  -->
                  <template #item-status="item">
                    <q-badge v-if="item.status === 'running'" class="green">
                      <span class="txt">운영중</span>
                    </q-badge>
                    <q-badge v-else-if="item.status === 'deleting'">
                      <span class="txt">삭제중</span>
                    </q-badge>
                    <q-badge v-else-if="item.status === 'restoring'">
                      <span class="txt">복구중</span>
                    </q-badge>
                  </template>
                  <!-- 소유자 -->
                  <template #item-user="item">
                    <a href="#">
                      <span class="txt">{{ item.user }}</span>
                    </a>
                  </template>
                  <!-- 접근권한 -->
                  <template #item-authority="item">
                    <a href="#">
                      <span class="txt">{{ item.authority }}</span>
                    </a>
                  </template>
                  <!-- 버튼 그룹 -->
                  <template #item-buttons="item">
                    <q-btn v-if="item.checkbox" class="text">
                      <span class="txt">선택 취소하기</span>
                      </q-btn>
                  </template>
                </EasyDataTable>
              </div>
              <div class="disflex_C mt32">
                <CPagination />
              </div>
            </div>
          </div>
          <div class="s_06 pb78">
            <p class="sub_title2">SSH Key<i class="ess">*</i></p>
            <div class="s_06_main">
              <template v-if="defaultData == true">
                <div class="s_06_table">
                  <EasyDataTable
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
                      </a>
                    </template>
                    <!-- registrationDat -->
                    <template #item-registrationDat="item">
                      <a href="#">
                        <span class="txt">{{ item.registrationDat }}</span>
                      </a>
                    </template>
                  </EasyDataTable>
                </div>
              </template>
              <template v-else>
                <div class="com_nondata_area">
                  <div class="nondata_box">
                    <p class="nondata_txt">생성된 인스턴스가 없습니다.</p>
                    <div class="nondata_btn">
                      <q-btn
                      btnTypes=1
                      type="button"
                      class="c_btn medium"
                      >
                        <span class="txt">등록하기</span>
                      </q-btn>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
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
                </div>
                <template v-if="filterOptions == false">
                  <q-btn
                    type="button"
                    class="c_btn c_icon medium"
                    disabled
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
        </div>

        <div class="aside_cont">
          <div class="aside_box">
            <p class="section_title">인스턴스</p>
            <ul class="instance_data">
              <li class="i_d01">
                <q-item class="i_data_title">이름</q-item>
                <q-item class="i_data_value"><p>인스턴스 이름</p></q-item>
              </li>
              <li class="i_d02">
                <q-item class="i_data_title">인스턴스 타입</q-item>
                <q-item class="i_data_value"><p>Tesla V100</p></q-item>
              </li>
              <li class="i_d03">
                <q-item class="i_data_title">이미지</q-item>
                <q-item class="i_data_value"><p>tensorflow 2.9.0<br>(python3, cuda11.2, ubuntu20.04)</p></q-item>
              </li>
              <li class="i_d04">
                <q-item class="i_data_title">GPU</q-item>
                <q-item class="i_data_value"><p>1</p></q-item>
              </li>
              <li class="i_d05">
                <q-item class="i_data_title">CPU</q-item>
                <q-item class="i_data_value"><p>14</p></q-item>
              </li>
              <li class="i_d06">
                <q-item class="i_data_title">Memory</q-item>
                <q-item class="i_data_value"><p>122GB</p></q-item>
              </li>
              <li class="i_d07">
                <q-item class="i_data_title">Disk</q-item>
                <q-item class="i_data_value"><p>80GiB</p></q-item>
              </li>
              <li class="i_d08">
                <q-item class="i_data_title">스토리지</q-item>
                <q-item class="i_data_value"><p>개인 스토리지 외 3개</p></q-item>
              </li>
              <li class="i_d09">
                <q-item class="i_data_title">SSH/JupyterLab</q-item>
                <q-item class="i_data_value"><p>SSH</p></q-item>
              </li>
              <li class="i_d10">
                <q-item class="i_data_title">포트번호</q-item>
                <q-item class="i_data_value"><p>-</p></q-item>
              </li>
            </ul>
            <div class="make_btn">
              <template v-if="datacheck === false">
                <q-btn
                  btnTypes=1
                  type="button"
                  disabled
                  class="c_btn medium"
                >
                  <span class="txt">태스크 생성</span>
                </q-btn>
              </template>
              <template v-else>
                <q-btn
                  btnTypes=1
                  type="button"
                  class="c_btn medium"
                >
                  <span class="txt">태스크 생성</span>
                </q-btn>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import CPagination from "components/common/CPagination.vue";

const title = ref("인스턴스 생성");
useMeta(() => ({
  title: title.value,
}));

const ptitle = ref(title);
const tab = ref("tabs1");
const tab2 = ref("tabs1");
const datacheck = ref(false);
const textName = ref(null);
const defaultData = ref(true);
const noMemberList = ref(true);

const itemsSelected = ref([]);
const shareChipModel = ref(null);
const stringOptions = [];
const filterOptions = ref(stringOptions);
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

// 인스턴스 타입 테이블
const instanceHeaders = [
  {
    text: "이름", value: "title", width: 200, sortable: false
  },
  {
    text: "CPU", value: "cpu", width: 140, sortable: false
  },
  {
    text: "Memory", value: "memory", width: 140, sortable: false
  },
  {
    text: "Disk", value: "disk", width: 140, sortable: false
  },
];
const instanceItems = [
  {
    title: "CG.nano",
    cpu: "8",
    memory: "18GiB",
    disk: "80GiB",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    },
  },
  {
    title: "CG.nano",
    cpu: "7",
    memory: "18GiB",
    disk: "80GiB",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    },
  },
  {
    title: "CG.nano",
    cpu: "9",
    memory: "18GiB",
    disk: "80GiB",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    },
  },
];
// 이미지 테이블_기본이미지
const imgHeader1 = [
  {
    text: "이름", value: "title", width: 380, sortable: false
  },
  {
    text: "NVIDA 드라이브 최소버전", value: "nvida", width: 240, sortable: false
  },
];
const imgItems1 = [
  {
    title: "tensorflow 2.9.0  (python3, cuda11.2, ubuntu20.04)",
    nvida: "400.0008",
  },
  {
    title: "tensorflow 2.9.0  (python3, cuda11.2, ubuntu20.04)",
    nvida: "450.0008",
  },
];
// 이미지 테이블_내이미지
const imgHeader2 = [
  {
    text: "이름", value: "title", width: 150, sortable: false
  },
  {
    text: "설명", value: "description", width: 150, sortable: false
  },
  {
    text: "상태", value: "status", width: 110, sortable: false
  },
  {
    text: "생성일시", value: "createdAt", width: 180, sortable: false
  },
];
const imgItems2 = [
  {
    title: "내 이미지 1",
    description: "내 이미지 1",
    status: "sharing",
    createdAt: "2023.09.02 07:30:44",
  },
  {
    title: "내 이미지 1",
    description: "내 이미지 1",
    status: "inStorage",
    createdAt: "2023.09.02 07:30:44",
  },
  {
    title: "내 이미지 1",
    description: "내 이미지 1",
    status: "error",
    createdAt: "2023.09.02 07:30:44",
  },
];
// 이미지 테이블_공유받은 이미지
const imgHeader3 = [
  {
    text: "이름", value: "title", width: 120, sortable: false
  },
  {
    text: "설명", value: "description", width: 270, sortable: false
  },
  {
    text: "공유자", value: "owner", width: 230, sortable: false
  },
];
const imgItems3 = [
  {
    title: "내 이미지1",
    description: "내 이미지 1",
    owner: "Kayle(kayle.k@kakaobrain.com)",
  },
  {
    title: "내 이미지1",
    description: "택스트용 내 이미지 생성 테스트 텍스트",
    owner: "Kayle(kayle.k@kakaobrain.com)",
  },
  {
    title: "내 이미지1",
    description: "내 이미지 3",
    owner: "Kayle(kayle.k@kakaobrain.com)",
  },
];

// 스토리지 테이블
const storageHeader = [
  {
    text: "이름", value: "title", width: 100, sortable: false
  },
  {
    text: "설명", value: "description", width: 220, sortable: false
  },
  {
    text: "상태", value: "status", width: 90, sortable: false
  },
  {
    text: "소유자", value: "user", width: 100, sortable: false
  },
  {
    text: "접근권한", value: "authority", width: 110, sortable: false
  },
];
const storageItems = [
  {
    title: "프로젝트",
    description: "aa개인 스토리지1",
    status: "running",
    user: "root.choi",
    authority: "읽기쓰기",
  },
  {
    title: "프로젝트",
    description: "aa개인 스토리지aa개인 스토리지aa개인 스토리지aa개인 스토리지",
    status: "deleting",
    user: "root.choi",
    authority: "읽기쓰기",
  },
  {
    title: "프로젝트2",
    description: "aa개인 스토리지",
    status: "restoring",
    user: "root.choi",
    authority: "읽기쓰기",
  },
];

// SSH Key 테이블
const sshKeyHeader = [
  {
    text: "이름", value: "title", width: 120, sortable: false
  },
  {
    text: "Fingerprint", value: "fingerprint", width: 300, sortable: false
  },
  {
    text: "등록일시", value: "registrationDat", width: 200, sortable: false
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

/**
 * 버튼 및 checkbox 에 대한 이벤트 존재할 시 class 삽입
 */
const bodyRowClassNameFunction = (item) => {
  const classList = [];
  if (item.buttons) classList.push("row-button");
  if (item.checkbox) classList.push("row-selected");
  return classList.join(" ");
};

/**
 * 설명: 복사하기 버튼 이벤트
 * @param { object } rowData get table row data
 */

/**
 * 설명: row Action 버튼 이벤트
 * @param { string } eventName action event name
 * @param { object } rowData get table row data
 */
</script>

<style lang="scss" scoped>
@import "./src/css/projects";
@import "./src/css/table";
</style>
