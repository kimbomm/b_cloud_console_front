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
                      <q-tooltip anchor="bottom middle" class="c_tooltip">
                        <div class="inner">
                          {{ item.title }}
                        </div>
                      </q-tooltip>
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
              <div class="s_03_pagenav disflex_C mt32">
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
              <template v-if="tab2 === 'tabs1'">
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
                        <q-tooltip anchor="bottom middle" class="c_tooltip">
                          <div class="inner">
                            {{ item.title }}
                          </div>
                        </q-tooltip>
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
                <div class="s_04_pagenav disflex_C mt32">
                  <CPagination />
                </div>
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
                          <q-tooltip anchor="bottom middle" class="c_tooltip">
                            <div class="inner">
                              {{ item.title }}
                            </div>
                          </q-tooltip>
                        </a>
                      </template>
                      <!--
                        상태값(status)
                        1. running, 운영중, 실행중
                        2. stopped, 정지 | 오류 | 취소 | 실패
                        3. 생성중 | 삭제중 | 대기중 | 재시작중
                      -->
                      <template #item-status="item">
                        <q-badge v-if="item.status === 'running'" class="green">
                          <span class="txt">운영중</span>
                        </q-badge>
                        <q-badge v-else-if="item.status === 'stopped'" class="orange">
                          <span class="txt">정지</span>
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
                      <!-- 버튼 그룹 -->
                      <template #item-buttons="item">
                        <q-btn v-if="item.checkbox" class="text">
                          <span class="txt">선택 취소하기</span>
                          </q-btn>
                      </template>
                    </EasyDataTable>
                  </div>
                  <div class="s_04_pagenav disflex_C mt32">
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
                          <q-tooltip anchor="bottom middle" class="c_tooltip">
                            <div class="inner">
                              {{ item.title }}
                            </div>
                          </q-tooltip>
                        </a>
                      </template>
                      <!--
                        상태값(status)
                        1. running, 운영중, 실행중
                        2. stopped, 정지 | 오류 | 취소 | 실패
                        3. 생성중 | 삭제중 | 대기중 | 재시작중
                      -->
                      <template #item-status="item">
                        <q-badge v-if="item.status === 'running'" class="green">
                          <span class="txt">운영중</span>
                        </q-badge>
                        <q-badge v-else-if="item.status === 'stopped'" class="orange">
                          <span class="txt">정지</span>
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
                      <!-- 버튼 그룹 -->
                      <template #item-buttons="item">
                        <q-btn v-if="item.checkbox" class="text">
                          <span class="txt">선택 취소하기</span>
                          </q-btn>
                      </template>
                    </EasyDataTable>
                  </div>
                  <div class="s_04_pagenav disflex_C mt32">
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
                  <!-- title -->
                  <template #item-title="item">
                    <a href="#">
                      <span class="txt">{{ item.title }}</span>
                      <q-tooltip anchor="bottom middle" class="c_tooltip">
                        <div class="inner">
                          {{ item.title }}
                        </div>
                      </q-tooltip>
                    </a>
                  </template>
                  <!--
                    상태값(status)
                    1. running, 운영중, 실행중
                    2. stopped, 정지 | 오류 | 취소 | 실패
                    3. 생성중 | 삭제중 | 대기중 | 재시작중
                  -->
                  <template #item-status="item">
                    <q-badge v-if="item.status === 'running'" class="green">
                      <span class="txt">운영중</span>
                    </q-badge>
                    <q-badge v-else-if="item.status === 'stopped'" class="orange">
                      <span class="txt">정지</span>
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

                      <q-popup-edit v-model="badgeGroup" self="bottom middle" class="badge_menu">
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
                  <!-- 버튼 그룹 -->
                  <template #item-buttons="item">
                    <q-btn v-if="item.checkbox" class="text">
                      <span class="txt">선택 취소하기</span>
                      </q-btn>
                  </template>
                </EasyDataTable>
              </div>
              <div class="s_05_pagenav disflex_C mt32">
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
                        <q-tooltip anchor="bottom middle" class="c_tooltip">
                          <div class="inner">
                            {{ item.title }}
                          </div>
                        </q-tooltip>
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
              </template>
              <template v-else>
                <div class="com_nondata_area">
                  <div class="nondata_box">
                    <p class="nondata_txt">생성된 인스턴스가 없습니다.</p>
                    <div class="nondata_btn">
                      <CButton
                        :size-types="2"
                        :btn-types="1"
                        :btn-names="dataRegister"
                      />
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
                  <q-input
                    outlined
                    v-model="textName2"
                    placeholder="포트 번호 입력"
                    clearable
                    class="wsize_full"
                  />
                </div>
                <q-btn
                  type="button"
                  class="c_btn c_icon medium"
                  disabled
                >
                  <i class="ico plus" /><span class="txt">Disabled</span>
                </q-btn>
              </div>
              <div class="port_list_area">
                <ul class="port_list_box com_border_box">
                  <li>
                    <p>등록된 포트 번호가 없습니다.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="aside_cont">
          <div class="aside_box">
            <p class="section_title">인스턴스</p>
            <ul class="instance_data">
              <li class="i_d01">
                <p class="i_data_title">이름</p>
                <p class="i_data_value">인스턴스 이름</p>
              </li>
              <li class="i_d02">
                <p class="i_data_title">인스턴스 타입</p>
                <p class="i_data_value">Tesla V100</p>
              </li>
              <li class="i_d03">
                <p class="i_data_title">GPU</p>
                <p class="i_data_value">1</p>
              </li>
              <li class="i_d04">
                <p class="i_data_title">CPU</p>
                <p class="i_data_value">14</p>
              </li>
              <li class="i_d05">
                <p class="i_data_title">Memory</p>
                <p class="i_data_value">122GB</p>
              </li>
              <li class="i_d06">
                <p class="i_data_title">Disk</p>
                <p class="i_data_value">80GiB</p>
              </li>
              <li class="i_d07">
                <p class="i_data_title">스토리지</p>
                <p class="i_data_value">개인 스토리지 외 3개</p>
              </li>
              <li class="i_d08">
                <p class="i_data_title">SSH/JupyterLab</p>
                <p class="i_data_value">SSH</p>
              </li>
              <li class="i_d09">
                <p class="i_data_title">포트번호</p>
                <p class="i_data_value">-</p>
              </li>
            </ul>
            <div class="make_btn">
              <template v-if="datacheck === datacheck">
                <CButton
                  :size-types="2"
                  :btn-types="11"
                  :btn-names="btnDis"
                />
              </template>
              <template v-else>
                <CButton
                  :size-types="2"
                  :btn-types="1"
                  :btn-names="btnName"
                />
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
import CButton from "components/common/CButton.vue";

const title = ref("인스턴스 생성");
useMeta(() => ({
  title: title.value,
}));

const ptitle = ref(title);
const tab = ref("tabs1");
const tab2 = ref("tabs1");
const datacheck = ref(false);
const btnName = ref("인스턴스 생성");
const btnDis = ref("인스턴스 생성");
const textName = ref(null);
const textName2 = ref(null);
const defaultData = ref(true);
const dataRegister = ref("등록하기");

const itemsSelected = ref([]);

// 인스턴스 타입 테이블
const instanceHeaders = [
  {
    text: "이름", value: "title", width: 400, sortable: false
  },
  {
    text: "CPU", value: "cpu", width: 80, sortable: false
  },
  {
    text: "Memory", value: "memory", width: 180, sortable: false
  },
  {
    text: "Disk", value: "disk", width: 100, sortable: false
  },
  { text: "", value: "buttons", width: 150 },
];
const instanceItems = [
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
];
// 이미지 테이블_기본이미지
const imgHeader1 = [
  {
    text: "이름", value: "title", width: 580, sortable: false
  },
  {
    text: "NVIDA 드라이브 최소버전", value: "nvida", width: 382, sortable: false
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
    text: "이름", value: "title", width: 190, sortable: false
  },
  {
    text: "설명", value: "description", width: 274, sortable: false
  },
  {
    text: "상태", value: "status", width: 190, sortable: false
  },
  {
    text: "생성일시", value: "createdAt", width: 276, sortable: false
  },
];
const imgItems2 = [
  {
    title: "내 이미지 1",
    description: "내 이미지 1",
    status: "running",
    createdAt: "2023.09.02 07:30:44",
  },
  {
    title: "내 이미지 1",
    description: "내 이미지 1",
    status: "stopping",
    createdAt: "2023.09.02 07:30:44",
  },
];
// 이미지 테이블_공유받은 이미지
const imgHeader3 = [
  {
    text: "이름", value: "title", width: 190, sortable: false
  },
  {
    text: "설명", value: "description", width: 480, sortable: false
  },
  {
    text: "공유자", value: "owner", width: 276, sortable: false
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
    text: "이름", value: "title", width: 150, sortable: false
  },
  {
    text: "설명", value: "description", width: 400, sortable: false
  },
  {
    text: "상태", value: "status", width: 100, sortable: false
  },
  {
    text: "소유자", value: "user", width: 150, sortable: false
  },
  {
    text: "접근권한", value: "authority", width: 150, sortable: false
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
    status: "stopped",
    user: "root.choi",
    authority: "읽기쓰기",
  },
  {
    title: "프로젝트2",
    description: "aa개인 스토리지",
    status: "running",
    user: "root.choi",
    authority: "읽기쓰기",
  },
];

// SSH Key 테이블
const sshKeyHeader = [
  {
    text: "이름", value: "title", width: 190, sortable: false
  },
  {
    text: "Fingerprint", value: "fingerprint", width: 430, sortable: false
  },
  {
    text: "등록일시", value: "registrationDat", width: 330, sortable: false
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
