<template>
  <q-page class="p-content p-projects p-detail">
    <div class="p-head">
      <q-breadcrumbs class="c_breadcrumb" gutter="none">
        <template v-slot:separator>
          <q-icon />
        </template>
        <q-breadcrumbs-el label="Projects" to="/" />
        <q-breadcrumbs-el label="Test Project" to="/" />
        <q-breadcrumbs-el label="태스크" />
      </q-breadcrumbs>
      <h1 class="p-title">
        {{ ptitle }}
      </h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <div class="wrap p-taskGroupView">
        <div class="user_info">
          <div class="user_box com_border_box">
            <div class="user_box_head">
              <template v-if="datacheck === true">
                <div class="basis_view">
                  <p class="sub_title">
                    00태스크 1-1
                    <i class="ico modify" @click="datacheck = false" />
                  </p>
                </div>
              </template>
              <template v-else>
                <div class="modify_view">
                  <div class="ins_subtitle_input">
                    <p class="m_sub_title">태스크 그룹 이름</p>
                    <div class="m_modify_main">
                      <q-input
                        outlined
                        v-model="textName"
                        placeholder="최소 2자 최대 30자 입력"
                        clearable
                        class="wsize608"
                      />
                      <div class="modify_btn">
                        <q-btn
                          label="취소"
                          class="line"
                          @click="datacheck = true"
                        />
                        <q-btn
                          label="저장"
                          class="primary"
                          @click="datacheck = true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>

            <ul class="user_box_main">
              <li class="u_d01">
                <q-item>
                  <p class="user_data_title">태스크 그룹ID</p>
                </q-item>
                <q-item class="user_data_value">
                  <p>01ws-00prj-inst-00001</p>
                </q-item>
              </li>
              <li class="u_d02 making_user_data">
                <q-item>
                  <p class="user_data_title">생성자</p>
                </q-item>
                <div class="user_data_value">
                  <q-item>
                    <p class="user_name">김카브</p>
                  </q-item>
                  <q-item>
                    <p class="user_mail">root.choi@kakaobrain.com</p>
                  </q-item>
                </div>
              </li>
              <li class="u_d03">
                <q-item>
                  <p class="user_data_title">생성일시</p>
                </q-item>
                <q-item class="user_data_value">
                  <p>2023.10.11 13:49pm</p>
                </q-item>
              </li>
              <li class="u_d04">
                <q-item>
                  <p class="user_data_title">작업경로</p>
                </q-item>
                <q-item class="user_data_value">
                  <p>/working_dir</p>
                </q-item>
              </li>
            </ul>
          </div>
        </div>

        <div class="instance_type">
          <div class="type_box com_box">
            <p class="sub_title">인스턴스 타입</p>
            <span class="text"
              >V1.XLARGE (1GPU | 14CPU | MEM 122GiB | DISK 80GiB)</span
            >

            <ul class="type_list">
              <li :class="'t_list0' + i" v-for="(i, a) in typeList" :key="i">
                <q-item>
                  <p class="type_list_title">
                    {{ typeItem[a].typeTitle }}
                    <span> {{ typeItem[a].basicTxt }}</span>
                  </p>
                </q-item>
                <q-item>
                  <p class="type_list_value">{{ typeItem[a].typeValue }}</p>
                </q-item>
              </li>
            </ul>
          </div>
        </div>

        <div class="instance_date">
          <div class="ins_data_inner">
            <div class="ins_img com_box">
              <p class="sub_title">이미지</p>
              <ul class="ins_img_cont">
                <li class="img_list01">
                  <p>내이미지</p>
                  <span>테스트용 내 이미지 생성</span>
                </li>
              </ul>
            </div>
            <div class="ins_storage com_box">
              <p class="sub_title">스토리지</p>
              <ul class="ins_storage_cont">
                <li class="storage_list01">
                  <p class="s_title">MLTEST 프로젝트 스토리지</p>
                  <p class="s_type">읽기전용</p>
                </li>
                <li class="storage_list02">
                  <p class="s_title">MLTEST 프로젝트 스토리지</p>
                  <p class="s_type">읽기전용</p>
                </li>
                <li class="storage_list03">
                  <p class="s_title">MLTEST 프로젝트 스토리지</p>
                  <p class="s_type">읽기전용</p>
                </li>
                <li class="storage_list04">
                  <p class="s_title">MLTEST 프로젝트 스토리지</p>
                  <p class="s_type">읽기전용</p>
                </li>
                <li class="storage_list05">
                  <p class="s_title">MLTEST 프로젝트 스토리지</p>
                  <p class="s_type">읽기전용</p>
                </li>
              </ul>
            </div>
            <div class="ins_etc com_box">
              <p class="sub_title">기타 정보</p>
              <q-scroll-area style="height: 200px">
                <div class="etc_cont">
                  <div>
                    <div class="theadarea">호스트 전체 준비 완료시 실행</div>
                    <div class="tbodyarea">ON</div>
                  </div>
                  <div>
                    <div class="theadarea">http proxy 설정</div>
                    <div class="tbodyarea">ON</div>
                  </div>
                  <div>
                    <div class="theadarea">입력 포트 번호</div>
                    <div class="tbodyarea">29838,29333,30001</div>
                  </div>
                  <div>
                    <div class="theadarea">태스크 동시실행 최대 개수</div>
                    <div class="tbodyarea">3</div>
                  </div>
                  <div>
                    <div class="theadarea">재시도 횟수</div>
                    <div class="tbodyarea">0</div>
                  </div>
                </div>
              </q-scroll-area>
            </div>
          </div>
        </div>

        <div class="task_table_area">
          <p class="sub_title">태스크</p>
          <div class="task_inner">
            <EasyDataTable
              :headers="headers"
              :items="items"
              :hide-footer="true"
              empty-message="정보가 없습니다."
              @click-row="showRow"
            >
              <!-- id -->
              <template #item-id="item">
                <span class="txt clip">{{ item.id }}</span>
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
              <!--
                상태값(status)
                1. finished, 완료
                2. stopped, 실패
                3. pending, 대기중
                4. making, 생성중
                5. starting, 실행중
                6. canceling, 취소중
                7. cancel, 취소
                8. deleting, 삭제중
                9. unknown
              -->
              <template #item-status="item">
                <q-badge v-if="item.status === 'finished'" class="green">
                  <span class="txt">완료</span>
                </q-badge>
                <q-badge v-else-if="item.status === 'stopped'" class="orange">
                  <span class="txt">실패</span>
                </q-badge>
                <q-badge v-else-if="item.status === 'pending'" class="c_badge">
                  <span class="txt">대기중</span>
                </q-badge>
                <q-badge v-else-if="item.status === 'making'" class="c_badge">
                  <span class="txt">생성중</span>
                </q-badge>
                <q-badge v-else-if="item.status === 'starting'" class="c_badge">
                  <span class="txt">실행중</span>
                </q-badge>
                <q-badge
                  v-else-if="item.status === 'canceling'"
                  class="c_badge"
                >
                  <span class="txt">취소중</span>
                </q-badge>
                <q-badge v-else-if="item.status === 'deleting'" class="c_badge">
                  <span class="txt">삭제중</span>
                </q-badge>
                <q-badge v-else-if="item.status === 'cancel'" class="c_badge">
                  <span class="txt">취소</span>
                </q-badge>
                <q-badge v-else class="c_badge">
                  <span class="txt">Unknown</span>
                </q-badge>
              </template>
              <!-- ssh -->
              <template #item-ssh="item">
                <q-badge class="copy square ssh icon" @click="onCopy(item)">
                  <span class="txt">{{ item.ssh }}</span>
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
                          {{ item.instanceType }}
                          {{ item.instanceType }}
                        </div>
                      </q-tooltip></i
                    >
                  </span>
                </q-badge>
              </template>
              <!-- cpu -->
              <template #item-cpu="item">
                <span class="txt">{{ item.cpu }}</span>
              </template>
              <!-- gpu -->
              <template #item-gpu="item">
                <span class="txt">{{ item.gpu }}</span>
              </template>
              <!-- createdAt -->
              <template #item-createdAt="item">
                <span class="txt">{{ item.createdAt }}</span>
              </template>
              <!-- endDate -->
              <template #item-endDate="item">
                <span class="txt">{{ item.endDate }}</span>
              </template>
              <!-- logCheck -->
              <template #item-logCheck="item">
                <a href="#">
                  <span class="txt logbadge">{{ item.logCheck }}</span>
                </a>
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
                        <q-item
                          v-for="button in actionButtons"
                          :key="button.name"
                        >
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
            </EasyDataTable>
          </div>
          <div class="task_pagenav disflex_C">
            <CPagination />
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

const title = ref("태스크 그룹 상세정보");
const textName = ref(null);
const datacheck = ref(true);
useMeta(() => ({
  title: title.value,
}));

const ptitle = ref(title);

const headers = [
  {
    text: "ID",
    value: "id",
    width: 65,
    sortable: false,
    checkbox: true,
  },
  {
    text: "태스크 이름",
    value: "title",
    width: 160,
    widthAuto: true,
    sortable: true,
  },
  {
    text: "상태",
    value: "status",
    width: 100,
    sortable: true,
  },
  {
    text: "ssh",
    value: "ssh",
    width: 80,
    sortable: false,
  },
  {
    text: "GPU",
    value: "gpu",
    width: 60,
    sortable: false,
  },
  {
    text: "CPU",
    value: "cpu",
    width: 60,
    sortable: false,
  },
  {
    text: "인스턴스 타입",
    value: "instanceType",
    width: 115,
    sortable: false,
  },
  {
    text: "생성일시",
    value: "createdAt",
    width: 165,
    sortable: true,
  },
  {
    text: "완료일시",
    value: "endDat",
    width: 165,
    sortable: true,
  },
  {
    text: "로그확인",
    value: "logCheck",
    width: 100,
    sortable: true,
  },
  { text: "", value: "buttons", width: 80 },
];
const items = [
  {
    id: 342,
    title: "dfsdfasdrwerwerwer",
    status: "finished",
    ssh: "ssh",
    gpu: "49.5%",
    cpu: "100%",
    instanceType: "V1.XLARGE",
    createdAt: "2023.01.12 10:33:21",
    endDat: "2023.01.12 10:33:21",
    logCheck: "LOG",
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
    id: 342,
    title: "dfsdfasdrwerwerwer",
    status: "starting",
    ssh: "ssh",
    gpu: "49.5%",
    cpu: "100%",
    instanceType: "V1.XLARGE",
    createdAt: "2023.01.12 10:33:21",
    endDat: "-",
    logCheck: "LOG",
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
    id: 342,
    title: "dfsdfasdrwerwerwer",
    status: "canceling",
    ssh: "ssh",
    gpu: "49.5%",
    cpu: "100%",
    instanceType: "V1.XLARGE",
    createdAt: "2023.01.12 10:33:21",
    endDat: "2023.01.12 10:33:21",
    logCheck: "LOG",
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
    id: 342,
    title: "dfsdfasdrwerwesdfsdfsdfsdfsdfsdfsdfsdfewrwer",
    status: "pending",
    ssh: "ssh",
    gpu: "49.5%",
    cpu: "100%",
    instanceType: "V1.XLARGE",
    createdAt: "2023.01.12 10:33:21",
    endDat: "2023.01.12 10:33:21",
    logCheck: "LOG",
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
    id: 342,
    title: "dfsdfasdrwerwerwer",
    status: "deleting",
    ssh: "ssh",
    gpu: "49.5%",
    cpu: "100%",
    instanceType: "V1.XLARGE",
    createdAt: "2023.01.12 10:33:21",
    endDat: "2023.01.12 10:33:21",
    logCheck: "LOG",
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
    id: 342,
    title: "dfsdfasdrwerwerwer",
    status: "cancel",
    ssh: "ssh",
    gpu: "49.5%",
    cpu: "100%",
    instanceType: "V1.XLARGE",
    createdAt: "2023.01.12 10:33:21",
    endDat: "-",
    logCheck: "LOG",
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
    id: 342,
    title: "dfsdfasdrwerwerwer",
    status: "making",
    ssh: "ssh",
    gpu: "49.5%",
    cpu: "100%",
    instanceType: "V1.XLARGE",
    createdAt: "2023.01.12 10:33:21",
    endDat: "2023.01.12 10:33:21",
    logCheck: "LOG",
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
    id: 342,
    title: "dfsdfasdrwerwesdfsdfsdfsdfsdfsdfsdfsdfewrwer",
    status: "stopped",
    ssh: "ssh",
    gpu: "49.5%",
    cpu: "100%",
    instanceType: "V1.XLARGE",
    createdAt: "2023.01.12 10:33:21",
    endDat: "2023.01.12 10:33:21",
    logCheck: "LOG",
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
    id: 342,
    title: "dfsdfasdrwerwesdfsdfsdfsdfsdfsdfsdfsdfewrwer",
    status: "group",
    ssh: "ssh",
    gpu: "49.5%",
    cpu: "100%",
    instanceType: "V1.XLARGE",
    createdAt: "2023.01.12 10:33:21",
    endDat: "2023.01.12 10:33:21",
    logCheck: "LOG",
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
];

const actionButtons = [
  { name: "재생성", event: "regeneratory" },
  { name: "취소", event: "cancel" },
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

const showRow = (item) => {
  console.log(item);
};

const typeItem = [
  { typeTitle: "GPU 모델", typeValue: "TESLA_V100" },
  { typeTitle: "GPU", typeValue: "2" },
  { typeTitle: "CPU", typeValue: "14" },
  { typeTitle: "Memory", typeValue: "122 GB" },
  { typeTitle: "Disk", typeValue: "80 GiB", basicTxt: "기본용량" },
];
const typeList = typeItem.length;
</script>

<style lang="scss" scoped>
@import "./src/css/projects";
@import "./src/css/table";
</style>
