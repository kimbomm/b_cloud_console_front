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
      <div class="wrap p-taskGroupView">
        <div class="user_info">
          <div class="user_box com_border_box">
            <div class="user_box_head">
              <template v-if="datacheck === datacheck">
                <div class="basis_view">
                  <p class="sub_title">00태스크 1-1 <i class="ico modify" /></p>
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
                        <q-btn label="취소" class="line" />
                        <q-btn label="저장" class="primary" />
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
             <CTable
              :title="title"
              :columns="columns"
              :data="data"
              :action-buttons="actionButtons"
              @action="respAction"
            />
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
import CTable from "src/components/common/CTable.vue";

const title = ref("태스크 그룹 상세정보");
const textName = ref(null);
const datacheck = ref(true);
useMeta(() => ({
  title: title.value,
}));

const ptitle = ref(title);

const columns = [
  {
    name: "id",
    field: "id",
    label: "태스크 ID",
    required: true,
    align: "center",
    sortable: true,
  },
  {
    name: "instance",
    field: "instance",
    label: "태스크 이름",
    align: "left",
    sortable: true,
    type: "link",
  },
  {
    name: "status",
    field: "status",
    label: "상태",
    align: "left",
    type: "tag",
  },
  {
    name: "ssh",
    field: "ssh",
    label: "ssh",
    align: "left",
    sortable: false,
    type: "copy",
  },
  {
    name: "gpu",
    field: "gpu",
    label: "GPU",
    align: "left",
    sortable: false,
  },
  {
    name: "cpu",
    field: "cpu",
    label: "CPU",
    align: "left",
    sortable: false,
  },
  {
    name: "instanceType",
    field: "instanceType",
    label: "인스턴스 타입",
    align: "left",
    type: "tooltip",
  },
  {
    name: "createdAt",
    field: "createdAt",
    label: "시작일시",
    align: "left",
    sortable: true,
    type: "datetime"
  },
  {
    name: "scheduledAt",
    field: "scheduledAt",
    label: "완료일시",
    align: "left",
    sortable: true,
    type: "datetime"
  },
  {
    name: "logCheck",
    field: "logCheck",
    label: "로그확인",
    align: "cneter",
    sortable: false,
  },
];
const data = [
  {
    id: 342,
    instance: "인스턴스 이름 인스턴스 이름 인스턴스 이름",
    status: "running",
    ssh: "ssh",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdAt: "2023.01.12 10:33:21",
    scheduledAt: "2023.01.12 10:33:21",
    createdBy: "Root.choi",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal"
    }
  },
  {
    id: 342,
    instance: "인스턴스 이름 인스턴스 이름 인스턴스 이름",
    status: "stopped",
    ssh: "ssh",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdAt: "2023.01.12 10:33:21",
    scheduledAt: "2023.01.12 10:33:21",
    createdBy: "Root.choi",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal"
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
const respAction = (eventObj) => {
  const eventName = eventObj.event;
  // const rowData = eventObj.data;
  // console.log(rowData);
  switch (eventName) {
    case "state":
      break;
    case "share":
      break;
    case "mngSnap":
      break;
    case "crtSnap":
      break;
    case "delete":
      break;
    default:
      break;
  }
};
</script>

<style lang="scss" scoped>
</style>
