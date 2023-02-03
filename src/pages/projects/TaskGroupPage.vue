<template>
  <q-page class="p-content p-projects p-detail">
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
                  <p class="sub_title">00태스크 1-1
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
                <p class="user_data_title">태스크 그룹ID</p>
                <div class="user_data_value">
                  <p>01ws-00prj-inst-00001</p>
                </div>
              </li>
              <li class="u_d02 making_user_data">
                <p class="user_data_title">생성자</p>
                <div class="user_data_value">
                  <p class="user_name">김카브</p>
                  <p class="user_mail">root.choi@kakaobrain.com</p>
                </div>
              </li>
              <li class="u_d03">
                <p class="user_data_title">생성일시</p>
                <div class="user_data_value">
                  <p>2023.10.11 13:49pm</p>
                </div>
              </li>
              <li class="u_d04">
                <p class="user_data_title">작업경로</p>
                <div class="user_data_value">
                  <p>/working_dir</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="instance_type">
          <div class="type_box com_box">
            <p class="sub_title">인스턴스 타입</p>
            <span class="text">V1.XLARGE (1GPU | 14CPU | MEM 122GiB | DISK 80GiB)</span>

            <ul class="type_list">
              <li class="t_list01">
                <p class="type_list_title">GPU 모델</p>
                <p class="type_list_vlaue">TESLA_V100</p>
              </li>
              <li class="t_list02">
                <p class="type_list_title">GPU</p>
                <p class="type_list_vlaue">2</p>
              </li>
              <li class="t_list03">
                <p class="type_list_title">CPU</p>
                <p class="type_list_vlaue">14</p>
              </li>
              <li class="t_list04">
                <p class="type_list_title">Memory</p>
                <p class="type_list_vlaue">122 GB</p>
              </li>
              <li class="t_list05">
                <p class="type_list_title">Disk <span>기본용량</span></p>
                <p class="type_list_vlaue">80 GiB</p>
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
              <table class="etc_cont">
                <tr>
                  <th>호스트 전체 준비 완료시 실행</th>
                  <td>ON</td>
                </tr>
                <tr>
                  <th>http proxy 설정</th>
                  <td>ON</td>
                </tr>
                <tr>
                  <th>입력 포트 번호</th>
                  <td>29838,29333,30001</td>
                </tr>
                <tr>
                  <th>태스크 동시실행 최대 개수</th>
                  <td>3</td>
                </tr>
                <tr>
                  <th>재시도 횟수</th>
                  <td>0</td>
                </tr>
              </table>
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
              <!-- title -->
              <template #item-title="item">
                <a href="#">
                  <span class="txt">{{ item.title }}</span>
                  <q-tooltip
                    anchor="bottom middle"
                    class="c_tooltip"
                  >
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
                <q-badge
                  v-if="item.status === 'running'"
                  class="green"
                >
                  <span class="txt">운영중</span>
                </q-badge>
                <q-badge
                  v-else-if="item.status === 'stopped'"
                  class="orange"
                >
                  <span class="txt">정지</span>
                </q-badge>
                <q-badge
                  v-else
                  class="c_badge"
                >
                  <span class="txt">생성중</span>
                </q-badge>
              </template>
              <!-- ssh -->
              <template #item-ssh="item">
                <q-badge
                  class="copy square ssh icon"
                  @click="onCopy(item)"
                >
                  <span class="txt">{{ item.ssh }}</span>
                </q-badge>
              </template>
              <!-- 인스턴스 타입 -->
              <template #item-instanceType="item">
                <q-badge
                  class="text instance icon"
                  @click="onCopy(item)"
                >
                  <span class="txt">{{ item.instanceType }}</span>

                  <q-tooltip
                    anchor="bottom middle"
                    class="c_tooltip"
                  >
                    <div class="inner">
                      {{ item.instanceType }}
                    </div>
                  </q-tooltip>
                </q-badge>
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
    text: "ID", value: "id", width: 80, sortable: false, checkbox: true
  },
  {
    text: "태스크 이름", value: "title", sortable: true
  },
  {
    text: "상태", value: "status", width: 100, sortable: true
  },
  {
    text: "ssh", value: "ssh", width: 100, sortable: false
  },
  {
    text: "GPU", value: "gpu", width: 80, sortable: false
  },
  {
    text: "CPU", value: "cpu", width: 80, sortable: false
  },
  {
    text: "인스턴스 타입", value: "instanceType", width: 160, sortable: false
  },
  {
    text: "생성일시", value: "createdAt", width: 180, sortable: true
  },
  {
    text: "완료일시", value: "endDat", width: 180, sortable: true
  },
  {
    text: "로그확인", value: "logCheck", width: 100, sortable: true
  },
  { text: "", value: "buttons", width: 150 },
];
const items = [
  {
    id: 342,
    title: "dfsdfasdrwerwerwer",
    status: "running",
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
      name: "초대요청 확인"
    }
  },
  {
    id: 342,
    title: "dfsdfasdrwerwerwer",
    status: "stopped",
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
      name: "초대요청 확인"
    }
  },
  {
    id: 342,
    title: "dfsdfasdrwerwerwer",
    status: "stopping",
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
      name: "초대요청 확인"
    }
  },
];

const actionButtons = [
  { name: "이용현황", event: "state" },
  { name: "공유관리", event: "share" },
  { name: "스냅샷 관리", event: "mngSnap" },
  { name: "스냅샷 생성", event: "crtSnap" },
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
</script>

<style lang="scss" scoped>
@import "./src/css/projects";
@import "./src/css/table";
</style>
