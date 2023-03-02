<template>
  <q-page class="p-content p-projects p-detail">
    <div class="p-head">
      <q-breadcrumbs class="c_breadcrumb" gutter="none">
        <template v-slot:separator>
          <q-icon />
        </template>
        <q-breadcrumbs-el label="Projects" to="/" />
        <q-breadcrumbs-el label="Test Project" to="/" />
        <q-breadcrumbs-el label="태스크" to="/" />
        <q-breadcrumbs-el label="00태스크 1-1" />
      </q-breadcrumbs>
      <div class="p-detail-head">
        <h1 class="p-title">
          {{ ptitle }}
        </h1>
        <div class="monitoring_btn">
          <q-btn
            btnTypes="1"
            type="button"
            class="c_btn medium"
            @click="workspaceHistoryBModal = true"
          >
            <span class="txt">모니터링</span>
          </q-btn>
        </div>
      </div>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <div class="wrap p-taskView">
        <div class="user_info">
          <div class="user_box com_border_box">
            <p class="sub_title">기본정보</p>
            <ul class="user_box_main">
              <li class="u_d01">
                <q-item>
                  <p class="user_data_title">태스크 그룹 ID</p>
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
                  <p class="user_data_title">태스크 ID</p>
                </q-item>
                <q-item class="user_data_value">
                  <p>01ws-00prj-task-12312</p>
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
              <li class="u_d05">
                <q-item>
                  <p class="user_data_title">시작일시</p>
                </q-item>
                <q-item class="user_data_value">
                  <p>2023.10.11 12:33:44</p>
                </q-item>
              </li>
              <li class="u_d06">
                <q-item>
                  <p class="user_data_title">완료일시</p>
                </q-item>
                <q-item class="user_data_value">
                  <p>2023.11.12 13:49pm</p>
                </q-item>
              </li>
              <li class="u_d07">
                <q-item>
                  <p class="user_data_title">태스크 그룹 이름</p>
                </q-item>
                <q-item class="user_data_value">
                  <p>taskgroup1</p>
                </q-item>
              </li>
              <li class="u_d08 status_data">
                <q-item>
                  <p class="user_data_title">현재상태</p>
                </q-item>
                <q-item class="user_data_value">
                  <span class="operating">실행중</span>
                </q-item>
              </li>
              <li class="u_d09">
                <q-item>
                  <p class="user_data_title">테스크 이름</p>
                </q-item>
                <q-item class="user_data_value">
                  <p>task1</p>
                </q-item>
              </li>
              <li class="u_d10 tpye_data">
                <q-item>
                  <p class="user_data_title">SSH 명령어 복사</p>
                </q-item>
                <div class="user_data_value">
                  <q-btn @click="triggerSuccess('top-right')">
                    <span class="ssh_btn">ssh</span>
                  </q-btn>
                </div>
              </li>
              <li class="u_d11">
                <q-item>
                  <p class="user_data_title">호스트</p>
                </q-item>
                <q-item class="user_data_value">
                  <p>gpu-cloud-vnode224.dakao.io</p>
                </q-item>
              </li>
            </ul>
          </div>
        </div>

        <div class="task_command">
          <div class="t_command_box com_box">
            <p class="sub_title">태스크 명령어</p>
            <ul class="command_list">
              <li>
                <p class="com_txt">
                  ~~~celebAHQwobg_EG3D_fromfs_FrzGBbMapSyn16.yaml
                </p>
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
            <div class="ins_port com_box">
              <p class="sub_title">포트정보</p>
              <div class="port_list">
                <div class="p_title">
                  <p class="internal_title">Internal URL</p>
                  <p class="external_title">External URL</p>
                </div>
                <q-scroll-area style="height: 180px">
                  <ul class="port_box">
                    <li v-for="(i, a) in portList" :key="i">
                      <p class="p_input_data">{{ portItem[a].internalItem }}</p>
                      <p class="p_external_data">
                        {{ portItem[a].externalItem
                        }}<i
                          class="ico copy"
                          @click="triggerSuccess2('top-right')"
                        />
                      </p>
                    </li>
                  </ul>
                </q-scroll-area>
              </div>
            </div>
            <div class="ins_etc com_box">
              <p class="sub_title">기타 정보</p>
              <div class="etc_cont">
                <div>
                  <div class="theadarea">호스트 전체 준비 완료시 실행</div>
                  <div class="tbodyarea">ON</div>
                </div>
                <div>
                  <div class="theadarea">태스크 동시실행 최대 개수</div>
                  <div class="tbodyarea">3</div>
                </div>
                <div>
                  <div class="theadarea">http proxy 설정</div>
                  <div class="tbodyarea">ON</div>
                </div>
                <div>
                  <div class="theadarea">재시도 횟수</div>
                  <div class="tbodyarea">0</div>
                </div>
                <div>
                  <div class="theadarea">추가 포트 번호</div>
                  <div class="tbodyarea">23335 ~ 23337</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>

  <!-- Start : [프로젝트 - 인스턴스] B 워크스페이스 리소스 사용 이력(꺽은선 그래프 + 달력 + 시계) 팝업 -->
  <q-dialog v-model="workspaceHistoryBModal" class="c_dialog large">
    <q-card>
      <q-card-section class="c_dialog_body">
        <p class="title">
          <strong>모니터링</strong>
        </p>
        <section class="section" aria-label="인스턴스 이름">
          <p class="sub_title">인스턴스 이름</p>
          <p class="desc">
            V1.Xlarge(v100 GPU 1 / CPU 14 / MEM 122GB / DISK 80GB)
          </p>
          <div class="searcharea">
            <CDropdown
              v-model:selected="chartSelectedBasic"
              :label="chartOptlabel"
              :options="chartSelOpt"
            />
            <CDropdown
              v-model:selected="chartSelectedBasic2"
              :label="chartOptlabel2"
              :options="chartSelOpt2"
            />
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
                      <q-popup-proxy :offset="[100, 0]" class="c_time">
                        <q-time v-model="timeFrom" mask="HH:mm">
                          <q-btn
                            v-close-popup
                            label="확인"
                            color="primary"
                            flat
                          />
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
                      <q-popup-proxy :offset="[150, 0]" class="c_datepicker">
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
                      <q-popup-proxy :offset="[240, 0]" class="c_time">
                        <q-time v-model="timeTo" mask="HH:mm">
                          <q-btn
                            v-close-popup
                            label="확인"
                            color="primary"
                            flat
                          />
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
          </div>
          <q-card v-model="chartModel" class="apexchart">
            <div class="chart_head">
              <div class="chart_legend">
                <div class="blue">GPU(%)</div>
                <div class="coral">GPU Memory (Cache+PSS, %)</div>
                <div class="mint">RSS Memory (%)</div>
              </div>
              <q-btn class="ibtn">
                <i class="ico refresh" /><span class="hidden">재설정</span>
              </q-btn>
            </div>
            <div class="chart_body">
              <apexchart
                v-if="chartModel === chartModel"
                height="324"
                type="line"
                :options="chartOptions"
                :series="series"
              ></apexchart>
              <div v-else class="loading">
                <div class="loading_text" />
              </div>
            </div>
          </q-card>
        </section>
      </q-card-section>
      <q-card-actions class="c_dialog_foot">
        <q-btn label="닫기" class="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!-- End : [프로젝트 - 인스턴스] B 워크스페이스 리소스 사용 이력(꺽은선 그래프 + 달력 + 시계) 팝업 -->
</template>
<script setup>
import { ref } from "vue";
import { useMeta, useQuasar } from "quasar";

const title = ref("태스크 상세정보");
const $q = useQuasar();
useMeta(() => ({
  title: title.value,
}));

const ptitle = ref(title);
const portItem = [
  {
    internalItem: "task1:33221",
    externalItem: "http://gpu-cloud-vnode95.dakao.io:10472",
  },
  {
    internalItem: "task1:33231",
    externalItem: "http://gpu-cloud-vnode95.dakao.io:10472",
  },
  {
    internalItem: "task1:33241",
    externalItem: "http://gpu-cloud-vnode95.dakao.io:10472",
  },
  {
    internalItem: "task1:33221",
    externalItem: "http://gpu-cloud-vnode95.dakao.io:10472",
  },
  {
    internalItem: "task1:33241",
    externalItem: "http://gpu-cloud-vnode95.dakao.io:10472",
  },
];
const portList = portItem.length;

const triggerSuccess = (position) => {
  setTimeout(() => {
    $q.notify({
      type: "positive",
      message: "SSH 접속 명령어가 복사되었습니다.",
      icon: "positive",
      position,
      actions: [
        {
          label: "닫기",
          class: "xclose",
          handler: () => {
            /* console.log('') */
          },
        },
      ],
      timeout: 500,
    });
  }, 100);
};
const triggerSuccess2 = (position) => {
  setTimeout(() => {
    $q.notify({
      type: "positive",
      message: "External URL이 복사되었습니다.",
      icon: "positive",
      position,
      actions: [
        {
          label: "닫기",
          class: "xclose",
          handler: () => {
            /* console.log('') */
          },
        },
      ],
      timeout: 500,
    });
  }, 100);
};
const typeItem = [
  { typeTitle: "GPU 모델", typeValue: "TESLA_V100" },
  { typeTitle: "GPU", typeValue: "2" },
  { typeTitle: "CPU", typeValue: "14" },
  { typeTitle: "Memory", typeValue: "122 GB" },
  { typeTitle: "Disk", typeValue: "80 GiB", basicTxt: "기본용량" },
];
const typeList = typeItem.length;

const workspaceHistoryBModal = ref(false);

const chartSelectedBasic = ref(null);
const chartSelectedBasic2 = ref(null);

const chartOptlabel = ref("선택");
const chartOptlabel2 = ref("선택");
const chartSelOpt = ref([
  { label: "GPU", value: 0 },
  { label: "GPU Memory (Cache+PSS, %)", value: 1 },
  { label: "RSS Memory (%)", value: 2 },
]);
const chartSelOpt2 = ref([
  { label: "직접입력", value: 1 },
  { label: "최근 1시간", value: 2 },
  { label: "최근 3시간", value: 3 },
  { label: "최근 6시간", value: 4 },
  { label: "최근 12시간", value: 5 },
  { label: "최근 24시간", value: 6 },
  { label: "최근 7일", value: 7 },
  { label: "최근 30일", value: 8 },
]);
const dateFrom = ref(null);
const timeFrom = ref(null);
const dateTo = ref(null);
const timeTo = ref(null);

const chartOptions = {
  chart: {
    height: 350,
    type: "line",
    dropShadow: {
      enabled: true,
      color: "#000",
      top: 0,
      left: 0,
      blur: 10,
      opacity: 0,
    },
    toolbar: {
      show: false,
    },
    fontFamily: "Inter, 'Noto Sans KR'",
  },
  title: {
    text: ".",
    align: "right",
  },
  subtitle: {
    text: undefined,
    align: "center",
    margin: 10,
    offsetX: 0,
    offsetY: 0,
    floating: false,
    style: {
      fontSize: "12px",
      fontWeight: "normal",
      fontFamily: undefined,
      color: "#9699a2",
    },
  },
  legend: {
    show: false,
    showForSingleSeries: false,
    showForNullSeries: true,
    showForZeroSeries: true,
    position: "top",
    horizontalAlign: "left",
    floating: true,
    offsetY: -30,
    offsetX: -20,
    labels: {
      colors: "#000000",
    },
  },
  colors: ["#FF6955", "#363CE5", "#63D8CF"],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 1,
    curve: "straight",
  },
  grid: {
    borderColor: "#E8ECF1",
    row: {
      colors: ["#E8ECF1", "transparent"], // takes an array which will be repeated on columns
      opacity: 0,
    },
  },
  markers: {
    size: 0,
  },
  xaxis: {
    categories: [
      "",
      "10/1",
      "",
      "10/5",
      "",
      "10/10",
      "",
      "10/20",
      "",
      "10/28",
      "",
    ],
    title: {
      text: "",
    },
    labels: {
      show: true,
      style: {
        colors: ["#000"],
        fontSize: "12px",
        fontFamily: "Inter, 'Noto Sans KR'",
        fontWeight: 400,
      },
    },
    tooltip: {
      enabled: false,
      formatter: undefined,
      offsetY: 0,
      style: {
        fontSize: 0,
        fontFamily: 0,
      },
    },
  },
  yaxis: [
    {
      seriesName: "GPU(%)",
      show: true,
      tickAmount: 5,
      min: 0,
      max: 250,
    },
    {
      seriesName: "GPU Memory (Cache+PSS, %)",
      show: false,
      tickAmount: 5,
      min: 0,
      max: 250,
    },
    {
      opposite: true,
      seriesName: "RSS Memory (%)",
      show: false,
      tickAmount: 5,
      min: 0,
      max: 250,
    },
  ],
};
const series = [
  {
    name: "GPU(%)",
    data: [200, 240, 240, 240, 230, 200, 240, 240, 240, 230, 230],
  },
  {
    name: "GPU Memory (Cache+PSS, %)",
    data: [80, 100, 150, 80, 230, 80, 100, 150, 80, 180, 150],
  },
  {
    name: "RSS Memory (%)",
    data: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
  },
];
</script>

<style lang="scss" scoped>
@import "./src/css/projects";
@import "./src/css/table";
</style>
