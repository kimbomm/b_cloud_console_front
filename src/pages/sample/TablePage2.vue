<template>
  <q-page class="p-content p-projects p-index">
    <div class="p-head">
      <q-breadcrumbs class="c_breadcrumb" gutter="none">
        <template v-slot:separator>
          <q-icon />
        </template>
        <q-breadcrumbs-el label="Projects" to="/" />
        <q-breadcrumbs-el label="Test Project" to="/" />
        <q-breadcrumbs-el label="인스턴스" />
      </q-breadcrumbs>
      <h1 class="p-title">
        {{ ptitle }}
      </h1>
      <q-btn class="ibtn setmenu">
        <i class="ico set" /><span class="hidden">설정</span>
        <q-menu class="set_menu">
          <q-list style="min-width: 100px">
            <q-item>
              <q-btn class="item">
                <span class="txt">이름/설명 편집</span>
              </q-btn>
            </q-item>
            <q-item>
              <q-btn class="item">
                <span class="txt">할당량 변경 요청</span>
              </q-btn>
            </q-item>
            <q-item>
              <q-btn class="item">
                <span class="txt">프로젝트 삭제</span>
              </q-btn>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      <p class="desc">
        <span class="txt">Your Summary Information Of The Workspace</span>
      </p>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <section class="section">
        <h2 class="h6">검색 결과가 없을때</h2>
        <easy-data-table
          :headers="headers"
          :items="nodata"
          :hide-footer="true"
          :body-row-class-name="bodyRowClassNameFunction"
          empty-message="생성된 인스턴스가 없습니다."
        >
          <!-- title -->
          <template #item-title="item">
            <q-checkbox
              v-model="itemsSelected2"
              :val="item.id"
              @click="onClick(item)"
            />
            <span class="txt">{{ item.title }}</span>
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
            <q-badge v-else class="c_badge">
              <span class="txt">생성중</span>
            </q-badge>
          </template>
          <!-- ssh -->
          <template #item-ssh="item">
            <q-badge class="copy square ssh icon" @click="onCopy(item)">
              <span class="txt">{{ item.ssh }}</span>
            </q-badge>
          </template>
          <!-- jupyterLab -->
          <template #item-jupyterLab="item">
            <q-badge class="copy square lab icon" @click="onCopy(item)">
              <span class="txt">{{ item.jupyterLab }}</span>
            </q-badge>
          </template>
          <!-- 인스턴스 타입 -->
          <template #item-instanceType="item">
            <q-badge class="text instance" @click="onCopy(item)">
              <span class="txt"
                >{{ item.instanceType
                }}<i class="ico details">
                  <q-tooltip
                    anchor="bottom middle"
                    class="c_tooltip insTypeTool"
                  >
                    <div class="inner">
                      {{ item.instanceType }}
                    </div>
                  </q-tooltip></i
                >
              </span>
            </q-badge>
          </template>
          <!-- 버튼 그룹 -->
          <template #item-buttons="item">
            <div v-if="actionButtons || item.buttons" class="cell btngroup">
              <!-- 초대 요청 확인 -->
              <q-btn v-if="item.buttons">
                <span class="txt">{{ item.buttons.name }}</span>
              </q-btn>

              <!-- row action menu -->
              <q-btn class="c_btn ibtn dot">
                <i class="ico dots" /><span class="txt">클릭</span>
                <q-popup-edit
                  v-model="item.id"
                  class="dots_menu"
                  anchor="top right"
                >
                  <q-list style="min-width: 100px">
                    <q-item v-for="button in actionButtons" :key="button.name">
                      <q-btn
                        class="item"
                        @click="onActions(button.event, item)"
                      >
                        <span class="txt">{{ button.name }}</span>
                      </q-btn>
                    </q-item>
                  </q-list>
                </q-popup-edit>
              </q-btn>
            </div>
          </template>
        </easy-data-table>
      </section>

      <section class="section">
        <h2 class="h6">Type1</h2>
        <easy-data-table
          :headers="headers"
          :items="items"
          :hide-footer="true"
          empty-message="정보가 없습니다."
          @click-row="showRow"
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
            <q-badge v-else class="c_badge">
              <span class="txt">생성중</span>
            </q-badge>
          </template>
          <!-- ssh -->
          <template #item-ssh="item">
            <q-badge class="copy square ssh icon" @click="onCopy(item)">
              <span class="txt">{{ item.ssh }}</span>
            </q-badge>
          </template>
          <!-- jupyterLab -->
          <template #item-jupyterLab="item">
            <q-badge class="copy square lab icon" @click="onCopy(item)">
              <span class="txt">{{ item.jupyterLab }}</span>
            </q-badge>
          </template>
          <!-- 인스턴스 타입 -->
          <template #item-instanceType="item">
            <q-badge class="text instance" @click="onCopy(item)">
              <span class="txt"
                >{{ item.instanceType
                }}<i class="ico details">
                  <q-tooltip
                    anchor="bottom middle"
                    class="c_tooltip insTypeTool"
                  >
                    <div class="inner">
                      {{ item.instanceType }}
                    </div>
                  </q-tooltip></i
                >
              </span>
            </q-badge>
          </template>
          <!-- createdBy -->
          <template #item-createdBy="item">
            <span class="txt clip">{{ item.createdBy }}</span>
          </template>
          <!-- 버튼 그룹 -->
          <template #item-buttons="item">
            <div v-if="actionButtons" class="cell btngroup">
              <q-btn class="c_btn ibtn dot">
                <i class="ico dots" /><span class="txt">클릭</span>
                <q-popup-edit
                  v-model="item.id"
                  class="dots_menu"
                  anchor="top right"
                >
                  <q-list style="min-width: 100px">
                    <q-item v-for="button in actionButtons" :key="button.name">
                      <q-btn
                        class="item"
                        @click="onActions(button.event, item)"
                      >
                        <span class="txt">{{ button.name }}</span>
                      </q-btn>
                    </q-item>
                  </q-list>
                </q-popup-edit>
              </q-btn>
            </div>
          </template>
        </easy-data-table>
      </section>

      <section class="section">
        <h2 class="h6">Type2</h2>
        <easy-data-table
          :headers="headers"
          :items="items"
          :hide-footer="true"
          :body-row-class-name="bodyRowClassNameFunction"
          empty-message="정보가 없습니다."
          @click-row="showRow"
        >
          <!-- title -->
          <template #item-title="item">
            <q-checkbox
              v-model="itemsSelected2"
              :val="item.id"
              :label="item.title"
              @click="onClick(item)"
            />
            <!-- <span class="txt">{{ item.title }}</span> -->
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
            <q-badge v-else class="c_badge">
              <span class="txt">생성중</span>
            </q-badge>
          </template>
          <!-- ssh -->
          <template #item-ssh="item">
            <q-badge class="copy square ssh icon" @click="onCopy(item)">
              <span class="txt">{{ item.ssh }}</span>
            </q-badge>
          </template>
          <!-- jupyterLab -->
          <template #item-jupyterLab="item">
            <q-badge class="copy square lab icon" @click="onCopy(item)">
              <span class="txt">{{ item.jupyterLab }}</span>
            </q-badge>
          </template>
          <!-- 인스턴스 타입 -->
          <template #item-instanceType="item">
            <q-badge class="text instance" @click="onCopy(item)">
              <span class="txt"
                >{{ item.instanceType
                }}<i class="ico details">
                  <q-tooltip
                    anchor="bottom middle"
                    class="c_tooltip insTypeTool"
                  >
                    <div class="inner">
                      {{ item.instanceType }}
                    </div>
                  </q-tooltip></i
                >
              </span>
            </q-badge>
          </template>
          <!-- createdBy -->
          <template #item-createdBy="item">
            <span class="txt clip">{{ item.createdBy }}</span>
          </template>
          <!-- 버튼 그룹 -->
          <template #item-buttons="item">
            <div v-if="actionButtons || item.buttons" class="cell btngroup">
              <!-- 초대 요청 확인 -->
              <q-btn v-if="item.buttons" class="c_btn">
                <span class="txt">{{ item.buttons.name }}</span>
              </q-btn>

              <!-- row action menu -->
              <q-btn class="c_btn ibtn dot">
                <i class="ico dots" /><span class="txt">클릭</span>
                <q-popup-edit
                  v-model="item.id"
                  class="dots_menu"
                  anchor="top right"
                >
                  <q-list style="min-width: 100px">
                    <q-item v-for="button in actionButtons" :key="button.name">
                      <q-btn
                        class="item"
                        @click="onActions(button.event, item)"
                      >
                        <span class="txt">{{ button.name }}</span>
                      </q-btn>
                    </q-item>
                  </q-list>
                </q-popup-edit>
              </q-btn>
            </div>
          </template>
        </easy-data-table>
      </section>

      <section class="section">
        <h2 class="h6">Type3</h2>
        <easy-data-table
          v-model:items-selected="itemsSelected"
          :headers="headers"
          :items="items"
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
            <q-badge v-else class="c_badge">
              <span class="txt">생성중</span>
            </q-badge>
          </template>
          <!-- ssh -->
          <template #item-ssh="item">
            <q-badge class="copy square ssh icon" @click="onCopy(item)">
              <span class="txt">{{ item.ssh }}</span>
            </q-badge>
          </template>
          <!-- jupyterLab -->
          <template #item-jupyterLab="item">
            <q-badge class="copy square lab icon" @click="onCopy(item)">
              <span class="txt">{{ item.jupyterLab }}</span>
            </q-badge>
          </template>
          <!-- 인스턴스 타입 -->
          <template #item-instanceType="item">
            <q-badge class="text instance" @click="onCopy(item)">
              <span class="txt"
                >{{ item.instanceType
                }}<i class="ico details">
                  <q-tooltip
                    anchor="bottom middle"
                    class="c_tooltip insTypeTool"
                  >
                    <div class="inner">
                      {{ item.instanceType }}
                    </div>
                  </q-tooltip></i
                >
              </span>
            </q-badge>
          </template>
          <!-- createdBy -->
          <template #item-createdBy="item">
            <span class="txt clip">{{ item.createdBy }}</span>
          </template>
          <!-- 버튼 그룹 -->
          <template #item-buttons="item">
            <div v-if="actionButtons || item.buttons" class="cell btngroup">
              <!-- 초대 요청 확인 -->
              <q-btn v-if="item.buttons" class="c_btn">
                <span class="txt">{{ item.buttons.name }}</span>
              </q-btn>

              <!-- row action menu -->
              <q-btn class="c_btn ibtn dot">
                <i class="ico dots" /><span class="txt">클릭</span>
                <q-popup-edit
                  v-model="item.id"
                  class="dots_menu"
                  anchor="top right"
                >
                  <q-list style="min-width: 100px">
                    <q-item v-for="button in actionButtons" :key="button.name">
                      <q-btn
                        class="item"
                        @click="onActions(button.event, item)"
                      >
                        <span class="txt">{{ button.name }}</span>
                      </q-btn>
                    </q-item>
                  </q-list>
                </q-popup-edit>
              </q-btn>
            </div>
          </template>
        </easy-data-table>
      </section>

      <section class="section">
        <h2 class="h6">Type4</h2>
        <easy-data-table
          v-model:items-selected="itemsSelected"
          :headers="headers"
          :items="items"
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
          <!-- ssh -->
          <template #item-ssh="item">
            <q-badge class="copy square ssh icon" @click="onCopy(item)">
              <span class="txt">{{ item.ssh }}</span>
            </q-badge>
          </template>
          <!-- jupyterLab -->
          <template #item-jupyterLab="item">
            <q-badge class="copy square lab icon" @click="onCopy(item)">
              <span class="txt">{{ item.jupyterLab }}</span>
            </q-badge>
          </template>
          <!-- 인스턴스 타입 -->
          <template #item-instanceType="item">
            <q-badge class="text instance" @click="onCopy(item)">
              <span class="txt"
                >{{ item.instanceType
                }}<i class="ico details">
                  <q-tooltip
                    anchor="bottom middle"
                    class="c_tooltip insTypeTool"
                  >
                    <div class="inner">
                      {{ item.instanceType }}
                    </div>
                  </q-tooltip></i
                >
              </span>
            </q-badge>
          </template>
          <!-- createdBy -->
          <template #item-createdBy="item">
            <span class="txt clip">{{ item.createdBy }}</span>
          </template>
          <!-- 버튼 그룹 -->
          <template #item-buttons="item">
            <q-btn v-if="item.checkbox" class="text"
              ><span class="txt">선택 취소하기</span></q-btn
            >
          </template>
        </easy-data-table>
      </section>

      <!-- tr 선택 시 하나만 check -->
      <section class="section">
        <h2 class="h6">Type5</h2>
        <easy-data-table
          :headers="headers"
          :items="items"
          :hide-footer="true"
          empty-message="정보가 없습니다."
          @click-row="showRowChecked"
          :id="tableId"
          :body-row-class-name="bodyRowClassNameFunctionCheck"
        >
          <!-- title -->
          <template #item-title="item">
            <a href="javascript:void()">
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
            <q-badge v-else class="c_badge">
              <span class="txt">생성중</span>
            </q-badge>
          </template>
          <!-- ssh -->
          <template #item-ssh="item">
            <q-badge class="copy square ssh icon" @click="onCopy(item)">
              <span class="txt">{{ item.ssh }}</span>
            </q-badge>
          </template>
          <!-- jupyterLab -->
          <template #item-jupyterLab="item">
            <q-badge class="copy square lab icon" @click="onCopy(item)">
              <span class="txt">{{ item.jupyterLab }}</span>
            </q-badge>
          </template>
          <!-- 인스턴스 타입 -->
          <template #item-instanceType="item">
            <q-badge class="text instance" @click="onCopy(item)">
              <span class="txt"
                >{{ item.instanceType
                }}<i class="ico details">
                  <q-tooltip
                    anchor="bottom middle"
                    class="c_tooltip insTypeTool"
                  >
                    <div class="inner">
                      {{ item.instanceType }}
                    </div>
                  </q-tooltip></i
                >
              </span>
            </q-badge>
          </template>
          <!-- createdBy -->
          <template #item-createdBy="item">
            <span class="txt clip">{{ item.createdBy }}</span>
          </template>
          <!-- 버튼 그룹 -->
          <template #item-buttons="item">
            <div v-if="actionButtons" class="cell btngroup">
              <q-btn class="c_btn ibtn dot">
                <i class="ico dots" /><span class="txt">클릭</span>
                <q-popup-edit
                  v-model="item.id"
                  class="dots_menu"
                  anchor="top right"
                >
                  <q-list style="min-width: 100px">
                    <q-item v-for="button in actionButtons" :key="button.name">
                      <q-btn
                        class="item"
                        @click="onActions(button.event, item)"
                      >
                        <span class="txt">{{ button.name }}</span>
                      </q-btn>
                    </q-item>
                  </q-list>
                </q-popup-edit>
              </q-btn>
            </div>
          </template>
        </easy-data-table>
      </section>

      <section class="section">
        <h2 class="h6">관리 - 프로젝트</h2>
        <easy-data-table
          :headers="mngTaskHeader"
          :items="mngTaskItems"
          :hide-footer="true"
          empty-message="정보가 없습니다."
        >
          <!-- title -->
          <template #item-title="item">
            <span class="txt">{{ item.title }}</span>
          </template>
          <!-- Description -->
          <template #item-desc="item">
            <a href="#">
              <span class="txt">{{ item.desc }}</span>
            </a>
          </template>
          <!--
            상태값(status)
            1. running, 운영중, 실행중, ON
            2. stopped, 정지 | 오류 | 취소 | 실패
            3. 생성중 | 삭제중 | 대기중 | 재시작중 | OFF
          -->
          <template #item-status="item">
            <q-badge v-if="item.status === 'running'" class="green">
              <span class="txt">ON</span>
            </q-badge>
            <q-badge v-else class="c_badge">
              <span class="txt">OFF</span>
            </q-badge>
          </template>
          <!-- GPU -->
          <template #item-gpu="item">
            <!--
              사용량(usage)
              1. low : 0% ~ 50%
              2. middle : 51% ~ 90%
              3. high : 91% ~ 100%
            -->
            <q-item v-if="item.status === 'running'" class="cell">
              <div v-if="item.gpu === 'low'" class="usage">
                <i class="ico low" />
                <span class="txt">44 / 100</span>
              </div>
              <div v-else-if="item.gpu === 'middle'" class="usage">
                <i class="ico middle" />
                <span class="txt">13 / 100</span>
              </div>
              <div v-else-if="item.gpu === 'high'" class="usage">
                <i class="ico high" />
                <span class="txt">33 / 100</span>
              </div>
              <div v-else class="usage">
                <span class="txt">-</span>
              </div>
            </q-item>
            <q-item v-else class="cell">
              <div v-if="item.gpu === 'low'" class="usage">
                <span class="txt">543</span>
              </div>
              <div v-else-if="item.gpu === 'middle'" class="usage">
                <span class="txt">23</span>
              </div>
              <div v-else-if="item.gpu === 'high'" class="usage">
                <span class="txt">44</span>
              </div>
              <div v-else class="usage">
                <span class="txt">-</span>
              </div>
            </q-item>
          </template>
          <!-- V100 -->
          <template #item-v100="item">
            <!--
              사용량(usage)
              1. low : 0% ~ 50%
              2. middle : 51% ~ 90%
              3. high : 91% ~ 100%
            -->
            <q-item v-if="item.status === 'running'" class="cell">
              <div v-if="item.v100 === 'low'" class="usage">
                <i class="ico low" />
                <span class="txt">2 / 100</span>
              </div>
              <div v-else-if="item.v100 === 'middle'" class="usage">
                <i class="ico middle" />
                <span class="txt">13 / 100</span>
              </div>
              <div v-else-if="item.v100 === 'high'" class="usage">
                <i class="ico high" />
                <span class="txt">33 / 100</span>
              </div>
              <div v-else class="usage">
                <span class="txt">-</span>
              </div>
            </q-item>
            <q-item v-else class="cell">
              <div v-if="item.v100 === 'low'" class="usage">
                <span class="txt">12</span>
              </div>
              <div v-else-if="item.v100 === 'middle'" class="usage">
                <span class="txt">23</span>
              </div>
              <div v-else-if="item.v100 === 'high'" class="usage">
                <span class="txt">44</span>
              </div>
              <div v-else class="usage">
                <span class="txt">-</span>
              </div>
            </q-item>
          </template>
          <!-- A100_400G -->
          <template #item-g400="item">
            <!--
              사용량(usage)
              1. low : 0% ~ 50%
              2. middle : 51% ~ 90%
              3. high : 91% ~ 100%
            -->
            <q-item v-if="item.status === 'running'" class="cell">
              <div v-if="item.g400 === 'low'" class="usage">
                <i class="ico low" />
                <span class="txt">44 / 100</span>
              </div>
              <div v-else-if="item.g400 === 'middle'" class="usage">
                <i class="ico middle" />
                <span class="txt">13 / 100</span>
              </div>
              <div v-else-if="item.g400 === 'high'" class="usage">
                <i class="ico high" />
                <span class="txt">33 / 100</span>
              </div>
              <div v-else class="usage">
                <span class="txt">-</span>
              </div>
            </q-item>
            <q-item v-else class="cell">
              <div v-if="item.g400 === 'low'" class="usage">
                <span class="txt">543</span>
              </div>
              <div v-else-if="item.g400 === 'middle'" class="usage">
                <span class="txt">23</span>
              </div>
              <div v-else-if="item.g400 === 'high'" class="usage">
                <span class="txt">44</span>
              </div>
              <div v-else class="usage">
                <span class="txt">-</span>
              </div>
            </q-item>
          </template>
          <!-- A100_80G -->
          <template #item-g80="item">
            <!--
              사용량(usage)
              1. low : 0% ~ 50%
              2. middle : 51% ~ 90%
              3. high : 91% ~ 100%
            -->
            <q-item v-if="item.status === 'running'" class="cell">
              <div v-if="item.g80 === 'low'" class="usage">
                <i class="ico low" />
                <span class="txt">44 / 100</span>
              </div>
              <div v-else-if="item.g80 === 'middle'" class="usage">
                <i class="ico middle" />
                <span class="txt">13 / 100</span>
              </div>
              <div v-else-if="item.g80 === 'high'" class="usage">
                <i class="ico high" />
                <span class="txt">33 / 100</span>
              </div>
              <div v-else class="usage">
                <span class="txt">-</span>
              </div>
            </q-item>
            <q-item v-else class="cell">
              <div v-if="item.g80 === 'low'" class="usage">
                <span class="txt">543</span>
              </div>
              <div v-else-if="item.g80 === 'middle'" class="usage">
                <span class="txt">23</span>
              </div>
              <div v-else-if="item.g80 === 'high'" class="usage">
                <span class="txt">44</span>
              </div>
              <div v-else class="usage">
                <span class="txt">-</span>
              </div>
            </q-item>
          </template>
          <!-- 버튼 그룹 -->
          <template #item-buttons="item">
            <div v-if="actionButtons2" class="cell">
              <q-btn class="c_btn ibtn dot">
                <i class="ico dots" /><span class="txt">클릭</span>
                <q-popup-edit
                  v-model="item.id"
                  class="dots_menu"
                  anchor="top right"
                >
                  <q-list style="min-width: 100px">
                    <q-item v-for="button in actionButtons2" :key="button.name">
                      <q-btn
                        class="item"
                        @click="onActions(button.event, item)"
                      >
                        <span class="txt">{{ button.name }}</span>
                      </q-btn>
                    </q-item>
                  </q-list>
                </q-popup-edit>
              </q-btn>
            </div>
          </template>
        </easy-data-table>
      </section>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";

const title = ref("Projects");
useMeta(() => ({
  title: title.value,
}));

const ptitle = ref(title);

const badgeGroup = ref(false);

const itemsSelected = ref([]);
const itemsSelected2 = ref([]);
const nodata = [];
const headers = [
  {
    text: "ID",
    value: "id",
    width: 80,
    sortable: false,
    checkbox: true,
  },
  {
    text: "인스턴스 이름",
    value: "title",
    width: 150,
    widthAuto: true,
    sortable: true,
  },
  {
    text: "상태",
    value: "status",
    width: 150,
    sortable: true,
  },
  {
    text: "ssh",
    value: "ssh",
    width: 100,
    sortable: false,
  },
  {
    text: "JupyterLab",
    value: "jupyterLab",
    width: 150,
    sortable: true,
  },
  {
    text: "인스턴스 타입",
    value: "instanceType",
    width: 120,
    sortable: false,
  },
  {
    text: "GPU",
    value: "gpu",
    width: 80,
    sortable: false,
  },
  {
    text: "CPU",
    value: "cpu",
    width: 80,
    sortable: false,
  },
  {
    text: "생성일시",
    value: "createdAt",
    width: 180,
    sortable: true,
  },
  {
    text: "생성자",
    value: "createdBy",
    width: 100,
    sortable: true,
  },
  {
    text: "",
    value: "buttons",
    width: 80,
    widthAuto: true,
  },
];
const items = [
  {
    id: 132,
    title: "A인스턴스A인스턴스A인스턴스A인스턴스A인스턴스A인 30자",
    status: "running",
    ssh: "ssh",
    jupyterLab: "JupyterLab",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdAt: "2023.01.12 10:33:21",
    createdBy: "root.choi (root.choi@kakaobrain.com)",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    },
    buttons: {
      name: "초대요청 확인",
    },
  },
  {
    id: 34,
    title: "A인스턴스A인스턴스10자",
    status: "stopped",
    ssh: "ssh",
    jupyterLab: "JupyterLab",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdAt: "2023.01.12 10:33:21",
    createdBy: "root.choi (root.choi@kakaobrain.com)",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    },
  },
  {
    id: 99999,
    title: "A인스턴스A인스턴스A인스턴스A인 20자",
    status: "group",
    ssh: "ssh",
    jupyterLab: "JupyterLab",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdAt: "2023.01.12 10:33:21",
    createdBy: "root.choi (root.choi@kakaobrain.com)",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    },
  },
];

const mngTaskHeader = [
  {
    text: "프로젝트 이름",
    value: "title",
    width: 155,
    sortable: true,
  },
  {
    text: "프로젝트 설명",
    value: "desc",
    width: 133,
    widthAuto: true,
    sortable: false,
  },
  {
    text: "할당량 설정",
    value: "status",
    width: 130,
    sortable: true,
  },
  {
    text: "GPU",
    value: "gpu",
    width: 120,
    sortable: true,
  },
  {
    text: "V100",
    value: "v100",
    width: 120,
    sortable: true,
  },
  {
    text: "A100_400G",
    value: "g400",
    width: 120,
    sortable: true,
  },
  {
    text: "A100_80G",
    value: "g80",
    width: 120,
    sortable: true,
  },
  { text: "", value: "buttons", width: 80 },
];
const mngTaskItems = [
  {
    title: "aa프로젝트1",
    desc: "프로젝트 설명프로젝트 설명프로젝트 설명",
    status: "running",
    gpu: "low",
    v100: "low",
    g400: "middle",
    g80: "high",
    buttons: {
      name: "초대요청 확인",
    },
  },
  {
    title: "aa프로젝트1",
    desc: "프로젝트 설명프로젝트 설명프로젝트 설명",
    status: "",
    gpu: "low",
    v100: "low",
    g400: "middle",
    g80: "high",
    buttons: {
      name: "초대요청 확인",
    },
  },
];

/**
 * 버튼 및 checkbox 에 대한 이벤트 존재할 시 class 삽입
 */
const bodyRowClassNameFunction = (item) => {
  const classList = [];
  if (item.buttons) classList.push("row-button");
  if (item.checkbox) classList.push("row-selected");
  if (item.disabled) classList.push("row-disabled");
  return classList.join(" ");
};

const actionButtons = [
  { name: "이용현황", event: "state" },
  { name: "공유관리", event: "share" },
  { name: "스냅샷 관리", event: "mngSnap" },
  { name: "스냅샷 생성", event: "crtSnap" },
  { name: "삭제", event: "delete" },
];
const actionButtons2 = [
  { name: "편집", event: "edit" },
  { name: "삭제", event: "delete" },
];

/**
 * 설명: 복사하기 버튼 이벤트
 * @param { object } rowData get table row data
 */
const onCopy = (rowData) => {
  console.log(rowData);
};

/**
 * 설명: row Action 버튼 이벤트
 * @param { string } eventName action event name
 * @param { object } rowData get table row data
 */
const onActions = (eventName, rowData) => {
  console.log(eventName, rowData);
};

const onClick = (item) => {
  console.log(item);
};

const bodyRowClassNameFunctionCheck = (item) => {
  console.log("itemitemitem", item);
  const classList = [];

  /*
   * disabled 처리
   * 예시) 리소스 할당량 초과
   * */
  if (item.id === 132) {
    classList.push("row-isdim");
  }
  return classList.join(" ");
};

/* row 클릭 시 해당 행 checked */
const tableId = "Type5";
const showRowChecked = (item) => {
  const nNum = items.value.findIndex((n) => n.id === item.id);
  document.querySelectorAll(`#${tableId} table tr`).forEach((tr, i) => tr.classList.toggle("row-isCheck", i === nNum + 1));
};

const showRow = (item) => {
  console.log(item);
};
</script>

<style lang="scss" scoped>
@import "./src/css/table";
.section {
  h2 {
    margin-bottom: 10px;
  }
  ~ .section {
    margin-top: 50px;
  }
}
.group {
  margin-top: 20px;
}

/* row 클릭 시 */
::v-deep {
  .row-isCheck {
    color: blue !important;
  }
  .row-isdim {
    color: #b1b1b1 !important;
  }
}
</style>
