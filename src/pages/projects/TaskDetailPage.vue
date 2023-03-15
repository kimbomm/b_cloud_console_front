<template>
  <q-page class="p-content p-projects p-make">
    <div class="p-head">
      <q-breadcrumbs class="c_breadcrumb" gutter="none">
        <template v-slot:separator>
          <q-icon />
        </template>
        <q-breadcrumbs-el label="Projects" to="/" />
        <q-breadcrumbs-el label="Test Project" to="/" />
        <q-breadcrumbs-el label="태스크" to="/" />
        <q-breadcrumbs-el label="태스크 생성" />
      </q-breadcrumbs>
      <h1 class="p-title">
        {{ ptitle }}
      </h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <div class="wrap p-task-detail">
        <div class="make_main_cont">
          <div class="s_01">
            <p class="sub_title">태스크 그룹 이름<i class="ess">*</i></p>
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="taskGroupName"
                placeholder="최소 2자 최대 30자"
                clearable
                class="wsize608"
              />
            </div>
          </div>
          <div class="s_02">
            <p class="sub_title">태스크 설명</p>
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="textDesc"
                bottom-slots
                type="textarea"
                placeholder="태스크 설명 입력"
                clearable
                counter
                :count="10"
                maxlength="500"
                class="wsize_full hsize244"
                :input-style="{ height: '100%' }"
              >
              </q-input>
            </div>
          </div>
          <div class="s_task_01">
            <div class="s_task01_head">
              <p class="sub_title2">태스크 입력<i class="ess">*</i></p>
              <q-checkbox
                v-model="chk1"
                label="Multiline 입력"
                class="c_checkbox"
              />
            </div>
            <div class="s_task01_main">
              <div class="s_task01_box com_border_box">
                <template v-if="chk1 === false">
                  <div class="task01_box_head">
                    <p class="sub_title">태스크 이름</p>
                    <p class="sub_title">명령어</p>
                  </div>
                  <div class="task01_box_main" v-for="i in addBox" :key="i">
                    <div class="task_name_input">
                      <div class="c_inpgroup">
                        <q-input
                          outlined
                          v-model="taskName"
                          placeholder="최소 2자 최대 30자"
                          clearable
                          maxlength="30"
                          class="wsize210"
                        />
                      </div>
                    </div>
                    <div class="task_command_input">
                      <div class="c_inpgroup">
                        <q-input
                          outlined
                          v-model="commandInput"
                          placeholder="명령어 입력"
                          clearable
                          class="wsize680"
                        />
                        <q-btn
                          type="button"
                          class="c_btn c_icon medium"
                          @click="addBox++"
                        >
                          <i class="ico plus" /><span class="txt">추가</span>
                        </q-btn>
                        <q-btn
                          type="button"
                          class="c_btn c_icon line medium"
                          @click="addBox--"
                        >
                          <i class="ico minus" /><span class="txt">삭제</span>
                        </q-btn>
                      </div>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="task01_box_head2">
                    <p class="sub_title">태스크 이름</p>
                  </div>
                  <div class="task01_box_main2">
                    <q-input
                      outlined
                      v-model="textDesc"
                      bottom-slots
                      type="textarea"
                      class="wsize_full hsize244"
                      :input-style="{ height: '100%' }"
                    />
                  </div>
                </template>
              </div>
            </div>

            <div class="s_task_01_2">
              <p class="sub_title2">작업경로<i class="ess">*</i></p>
              <div class="c_inpgroup">
                <q-input
                  outlined
                  v-model="workingDir"
                  placeholder="/"
                  clearable
                  class="wsize544"
                />
              </div>
            </div>
          </div>
          <div class="s_task_02">
            <p class="sub_title2">
              호스트 전체 준비 완료시 실행<q-btn class="ibtn help">
                <i class="ico help"
                  ><span class="hidden">도움말</span>
                  <q-popup-edit
                    v-model="helpShow"
                    anchor="top middle"
                    self="top middle"
                    class="c_popover task02_pop"
                  >
                    <div class="inner">
                      태스크 그룹 내 모든 태스크의 호스트가 인식될 때까지
                      대기하였다가, 모두 완료되면 태스크가 실행됩니다.
                    </div>
                  </q-popup-edit>
                </i>
              </q-btn>
            </p>
            <q-toggle v-model="off" />
          </div>
          <div class="s_task_03">
            <p class="sub_title2">
              태스크 동시 실행 최대 개수 설정<q-btn class="ibtn help">
                <i class="ico help"
                  ><span class="hidden">도움말</span>
                  <q-popup-edit
                    v-model="helpShow"
                    anchor="top middle"
                    self="top middle"
                    class="c_popover task03_pop"
                  >
                    <div class="inner">
                      동시 실행되는 태스크 최대 개수를 설정합니다.
                      <b>예시</b>
                      <p class="list_dot">
                        5개 태스크 입력 후 최대 개수 3개로 설정
                      </p>
                      <p class="list_dot">
                        3개 태스크 실행, 2개 대기 상태로 진행
                      </p>
                      <p class="list_dot">
                        실행중인 3개 태스크 중 완료되는 태스크가 있는 경우
                        대기중인 태스크 실행 시작
                      </p>
                    </div>
                  </q-popup-edit>
                </i>
              </q-btn>
            </p>
            <q-toggle v-model="off2" />
            <q-input
              outlined
              v-model="taskConcurrencyNum"
              hint="최소 1, 최대 50 입력 가능"
              placeholder="50"
              v-if="off2 == false"
              disable
              class="c_inp wsize608"
            />
            <q-input
              outlined
              v-model="taskConcurrencyNum"
              hint="최소 1, 최대 50 입력 가능"
              type="number"
              placeholder="50"
              v-if="off2 == true"
              class="c_inp wsize608"
            />
          </div>
          <div class="s_03 pb78">
            <p class="sub_title2">인스턴스 타입<i class="ess">*</i></p>
            <!-- <div class="s_03_main"> -->

            <q-tabs v-model="tab" align="left" class="c_tabs">
              <q-tab name="tabs1" label="CPU"></q-tab>
              <q-tab name="tabs2" label="GPU V100"></q-tab>
              <q-tab name="tabs3" label="GPU A100_40G"></q-tab>
            </q-tabs>

            <div class="now_selected_area">
              <div class="select_box">
                <q-item class="select_title">
                  <p class="select_title_inner">선택된 타입</p>
                </q-item>
                <q-item class="select_value">
                  <p class="select_value_inner">
                    cg.nano / CPU 2 / 18SDF / 80ASD
                  </p>
                </q-item>
              </div>
            </div>
            <div class="s_03_table">
              <easy-data-table
                class="c_table check"
                :headers="instanceHeaders"
                :items="instanceItems"
                :hide-footer="true"
                :body-row-class-name="bodyRowClassNameFunction"
                empty-message="데이터가 없습니다."
              >
                <template #item-checkbox="item">
                  <q-checkbox
                    v-model="itemsSelected"
                    :val="item.title"
                    :disable="item.disabled"
                    @click="onCheck(item)"
                  />
                </template>
                <!-- title -->
                <template #item-title="item">
                  <span class="txt">{{ item.title }}</span>
                </template>
                <!-- cpu -->
                <template #item-cpu="item">
                  <span class="txt">{{ item.cpu }}</span>
                </template>
                <!-- memory -->
                <template #item-memory="item">
                  <span class="txt">{{ item.memory }}</span>
                </template>
                <!-- disk -->
                <template #item-disk="item">
                  <span class="txt">{{ item.disk }}</span>
                </template>
                <!-- 버튼 그룹 -->
                <template #item-buttons="item">
                  <q-btn v-if="item.checkbox" class="text">
                    <span class="txt">선택 취소하기</span>
                  </q-btn>
                </template>
              </easy-data-table>
              <c-pagination />
            </div>
          </div>
          <div class="s_04 pb78">
            <p class="sub_title2">이미지<i class="ess">*</i></p>
            <!-- <div class="s_04_main"> -->

            <q-tabs v-model="tab2" align="left" class="c_tabs">
              <q-tab name="tabs1" label="기본 이미지"></q-tab>
              <q-tab name="tabs2" label="내이미지"></q-tab>
              <q-tab name="tabs3" label="공유받은 이미지"></q-tab>
            </q-tabs>

            <div class="now_selected_area">
              <div class="select_box">
                <q-item class="select_title">
                  <p class="select_title_inner">선택된 타입</p>
                </q-item>
                <q-item class="select_value">
                  <p class="select_value_inner">
                    tensorflow 2.9.0 (python3, cuda11.2, ubuntu20.04)
                  </p>
                </q-item>
              </div>
            </div>
            <template v-if="tab2 == 'tabs1'">
              <div class="table_inner">
                <easy-data-table
                  class="c_table check"
                  v-model:items-selected="itemsSelected"
                  :headers="imgHeader1"
                  :items="imgItems1"
                  :hide-footer="true"
                  :body-row-class-name="bodyRowClassNameFunction"
                  empty-message="데이터가 없습니다."
                >
                  <template #item-checkbox="item">
                    <q-checkbox
                      v-model="itemsSelected"
                      :val="item.title"
                      :disable="item.disabled"
                      @click="onCheck2(item)"
                    />
                  </template>
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
                  <!-- nvida -->
                  <template #item-nvida="item">
                    <span class="txt">{{ item.nvida }}</span>
                  </template>
                  <!-- 버튼 그룹 -->
                  <template #item-buttons="item">
                    <q-btn v-if="item.checkbox" class="text">
                      <span class="txt">선택 취소하기</span>
                    </q-btn>
                  </template>
                </easy-data-table>
                <c-pagination />
              </div>
            </template>
            <template v-if="tab2 === 'tabs2'">
              <template v-if="defaultData == true">
                <div class="table_inner">
                  <easy-data-table
                    class="c_table check"
                    :headers="imgHeader2"
                    :items="imgItems2"
                    :hide-footer="true"
                    :body-row-class-name="bodyRowClassNameFunction"
                    empty-message="데이터가 없습니다."
                  >
                    <template #item-checkbox="item">
                      <q-checkbox
                        v-model="itemsSelected"
                        :val="item.title"
                        :disable="item.disabled"
                        @click="onCheck2(item)"
                      />
                    </template>
                    <!-- title -->
                    <template #item-title="item">
                      <span class="txt">{{ item.title }}</span>
                    </template>
                    <!-- description -->
                    <template #item-description="item">
                      <a href="#">
                        <span class="txt">{{ item.description }}</span>
                        <q-tooltip anchor="bottom middle" class="c_tooltip">
                          <div class="inner">
                            {{ item.description }}
                          </div>
                        </q-tooltip>
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
                      <q-badge
                        v-else-if="item.status === 'error'"
                        class="orange"
                      >
                        <span class="txt">오류</span>
                      </q-badge>
                      <q-badge v-else-if="item.status === 'inStorage'">
                        <span class="txt">저장중</span>
                      </q-badge>
                      <q-item
                        v-else-if="item.status === 'group'"
                        class="badge_group"
                      >
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

                        <q-popup-edit
                          v-model="badgeGroup"
                          self="bottom middle"
                          class="badge_menu"
                        >
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
                      <span class="txt">{{ item.createdAt }}</span>
                    </template>
                    <!-- 버튼 그룹 -->
                    <template #item-buttons="item">
                      <q-btn v-if="item.checkbox" class="text">
                        <span class="txt">선택 취소하기</span>
                      </q-btn>
                    </template>
                  </easy-data-table>
                  <c-pagination />
                </div>
              </template>
              <template v-else>
                <div class="nondata_box">
                  <p class="nondata_txt">생성된 이미지가 없습니다.</p>
                </div>
              </template>
            </template>
            <template v-if="tab2 === 'tabs3'">
              <template v-if="defaultData == true">
                <div class="table_inner">
                  <easy-data-table
                    class="c_table check"
                    :headers="imgHeader3"
                    :items="imgItems3"
                    :hide-footer="true"
                    :body-row-class-name="bodyRowClassNameFunction"
                    empty-message="데이터가 없습니다."
                  >
                    <template #item-checkbox="item">
                      <q-checkbox
                        v-model="itemsSelected"
                        :val="item.title"
                        :disable="item.disabled"
                        @click="onCheck2(item)"
                      />
                    </template>
                    <!-- title -->
                    <template #item-title="item">
                      <span class="txt">{{ item.title }}</span>
                    </template>
                    <!-- description -->
                    <template #item-description="item">
                      <a href="#">
                        <span class="txt">{{ item.description }}</span>
                        <q-tooltip anchor="bottom middle" class="c_tooltip">
                          <div class="inner">
                            {{ item.description }}
                          </div>
                        </q-tooltip>
                      </a>
                    </template>
                    <!-- owner -->
                    <template #item-owner="item">
                      <span class="txt">{{ item.owner }}</span>
                    </template>
                    <!-- 버튼 그룹 -->
                    <template #item-buttons="item">
                      <q-btn v-if="item.checkbox" class="text">
                        <span class="txt">선택 취소하기</span>
                      </q-btn>
                    </template>
                  </easy-data-table>
                  <c-pagination />
                </div>
              </template>
              <template v-else>
                <div class="nondata_box">
                  <p class="nondata_txt">공유받은 이미지가 없습니다.</p>
                </div>
              </template>
            </template>
          </div>
          <div class="s_05 pb78">
            <p class="sub_title2">스토리지</p>
            <template v-if="defaultData == true">
              <div class="s_05_main">
                <div class="select_now_view">
                  <p><span class="change_num">0</span> / 5</p>
                  선택
                </div>
                <div class="table_inner">
                  <easy-data-table
                    class="c_table"
                    :headers="storageHeader"
                    :items="storageItems"
                    :hide-footer="true"
                    :body-row-class-name="bodyRowClassNameFunction"
                    empty-message="데이터가 없습니다."
                  >
                    <template #item-checkbox="item">
                      <q-checkbox
                        v-model="itemsSelected"
                        :val="item.title"
                        :disable="item.disabled"
                        @click="onCheck3(item)"
                      />
                    </template>
                    <!-- title -->
                    <template #item-title="item">
                      <span class="txt">{{ item.title }}</span>
                    </template>
                    <!-- description -->
                    <template #item-description="item">
                      <a href="#">
                        <span class="txt">{{ item.description }}</span>
                        <q-tooltip anchor="bottom middle" class="c_tooltip">
                          <div class="inner">
                            {{ item.description }}
                          </div>
                        </q-tooltip>
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
                    <!-- user -->
                    <template #item-user="item">
                      <span class="txt">{{ item.user }}</span>
                    </template>
                    <!-- authority -->
                    <template #item-authority="item">
                      <span class="txt">{{ item.authority }}</span>
                    </template>
                    <!-- 버튼 그룹 -->
                    <template #item-buttons="item">
                      <q-btn v-if="item.checkbox" class="text">
                        <span class="txt">선택 취소하기</span>
                      </q-btn>
                    </template>
                  </easy-data-table>
                  <c-pagination />
                </div>
              </div>
            </template>
            <template v-else>
              <div class="nondata_box">
                <p class="nondata_txt">이용가능한 스토리지가 없습니다.</p>
              </div>
            </template>
          </div>
          <div class="s_06 pb78">
            <p class="sub_title2">SSH Key<i class="ess">*</i></p>
            <div class="s_06_main">
              <div class="table_inner">
                <easy-data-table
                  class="c_table check"
                  :headers="sshKeyHeader"
                  :items="sshKeyItems"
                  :hide-footer="true"
                  :body-row-class-name="bodyRowClassNameFunction"
                  empty-message="데이터가 없습니다."
                >
                  <template #item-checkbox="item">
                    <q-checkbox
                      v-model="itemsSelected"
                      :val="item.title"
                      :disable="item.disabled"
                      @click="onCheck3(item)"
                    />
                  </template>
                  <!-- title -->
                  <template #item-title="item">
                    <span class="txt">{{ item.title }}</span>
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
                    <span class="txt">{{ item.registrationDat }}</span>
                  </template>
                  <!-- 버튼 그룹 -->
                  <template #item-buttons="item">
                    <q-btn v-if="item.checkbox" class="text">
                      <span class="txt">선택 취소하기</span>
                    </q-btn>
                  </template>
                </easy-data-table>
              </div>
            </div>
          </div>
          <div class="s_task_04">
            <p class="sub_title2">Http Proxy 설정</p>
            <q-toggle v-model="off3" />
          </div>
          <div class="s_task_05">
            <p class="sub_title2">실패시 재시도 횟수</p>
            <div class="c_inpgroup">
              <p class="info_txt">최대 5회</p>
              <q-input
                outlined
                v-model="retryNum"
                placeholder="0"
                clearable
                class="wsize_full"
              />
            </div>
          </div>
          <div class="s_07">
            <div class="sub_title2">
              <p>포트 번호 입력</p>
              <span>최대 태스크 개수 만큼 입력 가능</span>
            </div>

            <div class="s_07_main wsize608">
              <div class="port_num_input">
                <div class="c_inpgroup">
                  <q-select
                    outlined
                    v-model="shareChipModel"
                    placeholder="추가 포트 번호 입력"
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
                        <q-item-section> 검색 결과 없습니다. </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </div>
                <template v-if="filterOptions == false">
                  <q-btn type="button" class="c_btn c_icon medium" disabled>
                    <i class="ico plus" /><span class="txt">Disabled</span>
                  </q-btn>
                </template>
                <template v-else>
                  <q-btn type="button" class="c_btn c_icon medium">
                    <i class="ico plus" /><span class="txt">Button</span>
                  </q-btn>
                </template>
              </div>
              <div class="port_list_area">
                <template v-if="noMemberList == !true">
                  <ul class="port_list_box com_border_box">
                    <li>
                      <p>등록된 포트 번호가 없습니다.</p>
                    </li>
                  </ul>
                </template>
                <template v-else>
                  <ul class="port_list_box add_port_box com_border_box">
                    <li>
                      <span class="port_badge"
                        >32233<i class="ico cancel"
                      /></span>
                    </li>
                    <li>
                      <span class="port_badge"
                        >32233<i class="ico cancel"
                      /></span>
                    </li>
                    <li>
                      <span class="port_badge"
                        >08~65535<i class="ico cancel"
                      /></span>
                    </li>
                    <li>
                      <span class="port_badge"
                        >32233<i class="ico cancel"
                      /></span>
                    </li>
                    <li>
                      <span class="port_badge"
                        >32233<i class="ico cancel"
                      /></span>
                    </li>
                    <li>
                      <span class="port_badge"
                        >32233<i class="ico cancel"
                      /></span>
                    </li>
                    <li>
                      <span class="port_badge"
                        >32233<i class="ico cancel"
                      /></span>
                    </li>
                    <li>
                      <span class="port_badge"
                        >32233<i class="ico cancel"
                      /></span>
                    </li>
                    <li>
                      <span class="port_badge"
                        >32233<i class="ico cancel"
                      /></span>
                    </li>
                    <li>
                      <span class="port_badge"
                        >32233<i class="ico cancel"
                      /></span>
                    </li>
                    <li>
                      <span class="port_badge"
                        >132135<i class="ico cancel"
                      /></span>
                    </li>
                    <li>
                      <span class="port_badge"
                        >32233<i class="ico cancel"
                      /></span>
                    </li>
                    <li>
                      <span class="port_badge"
                        >08~65535<i class="ico cancel"
                      /></span>
                    </li>
                    <li>
                      <span class="port_badge"
                        >32233<i class="ico cancel"
                      /></span>
                    </li>
                    <li>
                      <span class="port_badge"
                        >08~65535<i class="ico cancel"
                      /></span>
                    </li>
                    <li>
                      <span class="port_badge"
                        >32233<i class="ico cancel"
                      /></span>
                    </li>
                    <li>
                      <span class="port_badge"
                        >08~65535<i class="ico cancel"
                      /></span>
                    </li>
                  </ul>
                </template>
              </div>
            </div>
          </div>
        </div>

        <div class="aside_cont">
          <div class="aside_box">
            <p class="section_title">태스크</p>
            <ul class="instance_data task_data">
              <li :class="'i_d0' + i" v-for="(i, a) in datalistLen" :key="i">
                <q-item class="i_data_title">{{ datalist[a].title }}</q-item>
                <q-item class="i_data_value"
                  ><p>{{ datalist[a].value }}</p></q-item
                >
              </li>
            </ul>
            <div class="make_btn">
              <template v-if="datacheck === false">
                <q-btn btnTypes="1" type="button" disabled class="c_btn medium">
                  <span class="txt">태스크 생성</span>
                </q-btn>
              </template>
              <template v-else>
                <q-btn btnTypes="1" type="button" class="c_btn medium">
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

const title = ref("태스크 생성");
useMeta(() => ({
  title: title.value,
}));

const ptitle = ref(title);
const tab = ref("tabs1");
const tab2 = ref("tabs1");
const taskName = ref(null);
const taskGroupName = ref(null);
const commandInput = ref(null);
const retryNum = ref(null);
const workingDir = ref(null);
const textDesc = ref(null);
const chk1 = ref(false);
const off = ref(false);
const off2 = ref(false);
const off3 = ref(false);
const taskConcurrencyNum = ref(null);
const datacheck = ref(false);
const defaultData = ref(true);
const addBox = ref(1);

const itemsSelected = ref([]);
const noMemberList = ref(true);
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
    text: "",
    value: "checkbox",
    width: 80,
  },
  {
    text: "이름",
    value: "title",
    width: 133,
    widthAuto: true,
    sortable: false,
  },
  {
    text: "CPU",
    value: "cpu",
    width: 150,
    sortable: false,
  },
  {
    text: "Memory",
    value: "memory",
    width: 150,
    sortable: false,
  },
  {
    text: "Disk",
    value: "disk",
    width: 150,
    sortable: false,
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
      gpu_device_model: "V100",
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
      gpu_device_model: "V100",
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
      gpu_device_model: "V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    },
  },
];
// 이미지 테이블_기본이미지
const imgHeader1 = [
  {
    text: "",
    value: "checkbox",
    width: 80,
  },
  {
    text: "이름",
    value: "title",
    width: 320,
    widthAuto: true,
    sortable: false,
  },
  {
    text: "NVIDA 드라이브 최소버전",
    value: "nvida",
    width: 270,
    sortable: false,
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
    text: "",
    value: "checkbox",
    width: 80,
  },
  {
    text: "이름",
    value: "title",
    width: 140,
    sortable: false,
  },
  {
    text: "설명",
    value: "description",
    width: 130,
    widthAuto: true,
    sortable: false,
  },
  {
    text: "상태",
    value: "status",
    width: 120,
    sortable: false,
  },
  {
    text: "생성일시",
    value: "createdAt",
    width: 206,
    sortable: false,
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
    text: "",
    value: "checkbox",
    width: 80,
  },
  {
    text: "이름",
    value: "title",
    width: 170,
    sortable: false,
  },
  {
    text: "설명",
    value: "description",
    width: 133,
    widthAuto: true,
    sortable: false,
  },
  {
    text: "공유자",
    value: "owner",
    width: 280,
    sortable: false,
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
    text: "",
    value: "checkbox",
    width: 80,
  },
  {
    text: "이름",
    value: "title",
    width: 100,
    sortable: false,
  },
  {
    text: "설명",
    value: "description",
    width: 133,
    widthAuto: true,
    sortable: false,
  },
  {
    text: "상태",
    value: "status",
    width: 103,
    sortable: false,
  },
  {
    text: "소유자",
    value: "user",
    width: 150,
    sortable: false,
  },
  {
    text: "접근권한",
    value: "authority",
    width: 150,
    sortable: false,
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
    text: "",
    value: "checkbox",
    width: 80,
  },
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
    width: 328,
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

const datalist = [
  { title: "그룹 이름", value: "태스크 그룹 이름" },
  { title: "태스크 개수", value: 3 },
  { title: "작업경로", value: "/working_dir" },
  { title: "호스트 전체 준비 완료시 실행", value: "Off" },
  { title: "동시실행 최대 개수", value: 3 },
  { title: "인스턴스 타입", value: "V100" },
  { title: "GPU", value: 1 },
  { title: "CPU", value: 14 },
  { title: "Memory", value: "122GB" },
  { title: "Disk", value: "80GiB" },
  {
    title: "이미지",
    value: "tensorflow 2.9.0 (python3, cuda11.2, ubuntu20.04)",
  },
  { title: "스토리지", value: "aa프로젝트 1 스토리지 외 4개" },
  { title: "Http proxy", value: "On" },
  { title: "재시도 횟수", value: 0 },
  { title: "추가 포트 번호", value: "-" },
];
const datalistLen = datalist.length;
</script>

<style lang="scss" scoped>
@import "./src/css/projects";
</style>
