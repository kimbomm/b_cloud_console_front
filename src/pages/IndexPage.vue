<template>
  <q-page class="p-content p-console">
    <div class="p-head">
      <h1 class="p-title">Dashboard</h1>
      <p class="desc">
        <i class="ico time" />
        <span class="txt">업데이트 시간 <span class="time">{{ updateTime }}</span></span>
      </p>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <q-banner class="c_banner">
        <template v-slot:avatar>
          <q-icon class="noti" />
        </template>
        <div class="bn_head">
          <em class="state">서비스</em>
          <strong class="title">스토리지 안내드립니다.</strong>
        </div>
        <div class="bn_body">
          스토리지 사용 안내 드립니다.
          스토리지 사용 안내 드립니다.
          스토리지 사용 안내 드립니다.
          스토리지 사용 안내 드립니다.
          스토리지 사용 안내 드립니다.
          스토리지 사용 안내 드립니다.
          스토리지 사용 안내 드립니다.
        </div>
        <template v-slot:action>
          <q-btn class="xclose" />
        </template>
      </q-banner>
      <!-- Slides -->
      <div class="section card-box">
        <!-- slide 1 -->
        <div class="card">
          <q-carousel
            v-model="slide"
            animated
            arrows
            navigation
            infinite
            class="c_carousel dark"
          >
          <q-carousel-slide :name="1">
            <template v-if="instanceData === instanceData">
              <div class="carousel_caption">
                <div class="text_title">인스턴스 36</div>
                <div class="text_subtitle">인스턴스1</div>
                <div class="text_desc">V100 2GPU/14CPU MeM 122GB DISK 80GB</div>
                <a href="#" class="morelink"><span>더보기</span></a>
              </div>
              <div class="carousel_body">
                <div class="info_section">
                  <div class="circle_state">
                    <em>상태</em>
                    <!--
                      인스턴스 상태
                      대기중, 정지중, 삭제중, 시작중, Unknown
                      운영중 = class green 추가 색상 구분하기 위한 class
                      정지, 오류 = class red 추가 색상 구분하기 위한 class
                    -->
                    <strong>대기중</strong>
                  </div>

                  <!-- chart UI -->
                  <div
                    v-for="(chart, i) in charts" :key="`${i}`"
                    class="circle_chart"
                  >
                    <div class="circle" :style="`--value:${chart.value}`">
                      <svg viewBox="0 0 600 600">
                        <defs>
                          <linearGradient id="paint0_linear" x1="50" x2="200" y1="200" y2="450"
                            gradientUnits="userSpaceOnUse">
                            <stop stop-color="#FF0000" />
                            <stop offset="1" stop-color="#4992FF" />
                          </linearGradient>
                        </defs>
                        <circle pathLength="100" />
                      </svg>
                    </div>
                    <div class="circle_in">
                      <em>{{ chart.label }}</em>
                      <strong :data-rate="`${chart.value}`" />
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="nodata">생성한 인스턴스가 없습니다.</div>
            </template>
            <div class="carousel_time">
              <i class="ico clock" />최근 24시간
            </div>
          </q-carousel-slide>
          <q-carousel-slide :name="2">
            <template v-if="taskData === taskData">
              <div class="carousel_caption">
                <div class="text_title">태스크 19</div>
                <div class="text_subtitle">태스크1</div>
                <div class="text_desc">V100 2GPU/14CPU MeM 122GB DISK 80GB</div>
                <a href="#" class="morelink"><span>더보기</span></a>
              </div>
              <div class="carousel_body">
                <div class="info_section">
                  <div class="circle_state">
                    <em>상태</em>
                    <!--
                      태스크 상태
                      대기중, 생성중, 취소, 취소중, 삭제중, Unknown
                      실행중, 완료 = class green 추가 색상 구분하기 위한 class
                      실패, 오류 = class red 추가 색상 구분하기 위한 class
                    -->
                    <strong class="red">취소</strong>
                  </div>

                  <!-- chart UI -->
                  <div
                    v-for="(chart, i) in charts" :key="`${i}`"
                    class="circle_chart"
                  >
                    <div class="circle" :style="`--value:${chart.value}`">
                      <svg viewBox="0 0 600 600">
                        <defs>
                          <linearGradient id="paint0_linear" x1="50" x2="200" y1="200" y2="450"
                            gradientUnits="userSpaceOnUse">
                            <stop stop-color="#FF0000" />
                            <stop offset="1" stop-color="#4992FF" />
                          </linearGradient>
                        </defs>
                        <circle pathLength="100" />
                      </svg>
                    </div>
                    <div class="circle_in">
                      <em>{{ chart.label }}</em>
                      <strong :data-rate="`${chart.value}`" />
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="nodata">생성한 태스크가 없습니다.</div>
            </template>
            <div class="carousel_time">
              <i class="ico clock" />최근 24시간
            </div>
          </q-carousel-slide>
          </q-carousel>
        </div>
        <!-- slide 2 -->
        <div class="card">
          <q-carousel
            v-model="slide2"
            animated
            arrows
            navigation
            infinite
            class="c_carousel dark"
          >
          <q-carousel-slide :name="1">
            <template v-if="instanceData === instanceData">
              <div class="carousel_caption">
                <div class="text_title">인스턴스 36</div>
                <div class="text_subtitle">인스턴스1</div>
                <div class="text_desc">V100 2GPU/14CPU MeM 122GB DISK 80GB</div>
                <a href="#" class="morelink"><span>더보기</span></a>
              </div>
              <div class="carousel_body">
                <div class="info_section">
                  <div class="circle_state">
                    <em>상태</em>
                    <!--
                      인스턴스 상태
                      대기중, 정지중, 삭제중, 시작중, Unknown
                      운영중 = class green 추가 색상 구분하기 위한 class
                      정지, 오류 = class red 추가 색상 구분하기 위한 class
                    -->
                    <strong>대기중</strong>
                  </div>

                  <!-- chart UI -->
                  <div
                    v-for="(chart, i) in charts" :key="`${i}`"
                    class="circle_chart"
                  >
                    <div class="circle" :style="`--value:${chart.value}`">
                      <svg viewBox="0 0 600 600">
                        <defs>
                          <linearGradient id="paint0_linear" x1="50" x2="200" y1="200" y2="450"
                            gradientUnits="userSpaceOnUse">
                            <stop stop-color="#FF0000" />
                            <stop offset="1" stop-color="#4992FF" />
                          </linearGradient>
                        </defs>
                        <circle pathLength="100" />
                      </svg>
                    </div>
                    <div class="circle_in">
                      <em>{{ chart.label }}</em>
                      <strong :data-rate="`${chart.value}`" />
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="nodata">생성한 인스턴스가 없습니다.</div>
            </template>
            <div class="carousel_time">
              <i class="ico clock" />최근 24시간
            </div>
          </q-carousel-slide>
          <q-carousel-slide :name="2">
            <template v-if="taskData === taskData">
              <div class="carousel_caption">
                <div class="text_title">태스크 19</div>
                <div class="text_subtitle">태스크1</div>
                <div class="text_desc">V100 2GPU/14CPU MeM 122GB DISK 80GB</div>
                <a href="#" class="morelink"><span>더보기</span></a>
              </div>
              <div class="carousel_body">
                <div class="info_section">
                  <div class="circle_state">
                    <em>상태</em>
                    <!--
                      태스크 상태
                      대기중, 생성중, 취소, 취소중, 삭제중, Unknown
                      실행중, 완료 = class green 추가 색상 구분하기 위한 class
                      실패, 오류 = class red 추가 색상 구분하기 위한 class
                    -->
                    <strong class="red">취소</strong>
                  </div>

                  <!-- chart UI -->
                  <div
                    v-for="(chart, i) in charts" :key="`${i}`"
                    class="circle_chart"
                  >
                    <div class="circle" :style="`--value:${chart.value}`">
                      <svg viewBox="0 0 600 600">
                        <defs>
                          <linearGradient id="paint0_linear" x1="50" x2="200" y1="200" y2="450"
                            gradientUnits="userSpaceOnUse">
                            <stop stop-color="#FF0000" />
                            <stop offset="1" stop-color="#4992FF" />
                          </linearGradient>
                        </defs>
                        <circle pathLength="100" />
                      </svg>
                    </div>
                    <div class="circle_in">
                      <em>{{ chart.label }}</em>
                      <strong :data-rate="`${chart.value}`" />
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="nodata">생성한 태스크가 없습니다.</div>
            </template>
            <div class="carousel_time">
              <i class="ico clock" />최근 24시간
            </div>
          </q-carousel-slide>
          </q-carousel>
        </div>
      </div>
      <!-- Storage -->
      <div class="section storage-box">
        <div class="storage-box_dash storage">
          <p class="sub-title">Storage</p>
          <a href="#" class="morelink">
            <span>더보기</span>
          </a>
          <div class="store-wrap">

            <!-- 3개 넘게 스크롤이 생길경우(스크롤) -->
            <q-scroll-area
              v-if="storageData === storageData"
              style="padding-right: 18px; height: 100%; max-width: 100%;"
            >
              <div
                v-for="(store, i) in stores"
                :key="`${i}`"
                class="store"
              >
                <div class="store_card">
                  <p class="name">스토리지 이름</p>
                  <div class="state">
                    <!-- chart UI -->
                    <div class="circle_chart xsmall">
                      <div class="circle" :style="`--value:${store.value}`">
                        <svg viewBox="0 0 600 600">
                          <defs>
                            <linearGradient id="paint1_linear" x1="50" x2="200" y1="200" y2="450"
                              gradientUnits="userSpaceOnUse">
                              <stop stop-color="#FF0000" />
                              <stop offset="1" stop-color="#4992FF" />
                            </linearGradient>
                          </defs>
                          <circle pathLength="100" />
                        </svg>
                      </div>
                    </div>
                    <div class="info">
                      <p class="title">{{ store.title }}</p>
                      <p class="caption">{{ store.caption }}</p>
                    </div>
                    <div class="capacity">
                      <span class="capacity_use">{{ store.current }}</span>
                      <span class="capacity_amount">/ {{ store.total }} BG</span>
                    </div>
                  </div>
                </div>
              </div>
            </q-scroll-area>

            <!-- 정보가 없을경우 -->
            <div v-else class="store-none">
              <p>이용중인 스토리지가 없습니다.</p>
            </div>
          </div>
        </div>
        <!-- Billing -->
        <div class="storage-box_dash billing">
          <p class="sub-title">Billing</p>
          <a href="#" class="morelink">
            <span>더보기</span>
          </a>
          <p class="name mb8">당월 이용금액</p>
          <p class="current"><span class="current_pay">1,394,213</span>&nbsp;원</p>
          <div class="billing-chart">
            <!-- <div class="chart chr1">
              <progress
                value="147"
                max="200"
                class="graph gr1">
                <q-tooltip
                  v-model="showing1"
                  aanchor="top middle" self="bottom middle"
                  class="c_tooltip bottom"
                  >
                  <div class="inner">382,232원</div>
                </q-tooltip>
              </progress>
              <span class="month">22.10</span>
            </div>
            <div class="chart chr2">
              <span class="graph gr2">
                <q-tooltip
                  v-model="showing1"
                  aanchor="top middle" self="bottom middle"
                  class="c_tooltip bottom"
                >
                  <div class="inner">382,232원</div>
                </q-tooltip>
              </span>
              <span class="month">11</span>
            </div>
            <div class="chart chr3">
              <span class="graph gr3">
                <q-tooltip
                  v-model="showing1"
                  aanchor="top middle" self="bottom middle"
                  class="c_tooltip bottom"
                >
                  <div class="inner">382,232원</div>
                </q-tooltip>
              </span>
              <span class="month">12</span>
            </div>
            <div class="chart chr4">
              <span class="graph gr4">
                <q-tooltip
                  v-model="showing1"
                  aanchor="top middle" self="bottom middle"
                  class="c_tooltip bottom"
                >
                  <div class="inner">382,232원</div>
                </q-tooltip>
              </span>
              <span class="month">23.01</span>
            </div>
            <div class="chart chr5">
              <span class="graph gr5">
                <q-tooltip
                  v-model="showing1"
                  aanchor="top middle" self="bottom middle"
                  class="c_tooltip bottom"
                >
                  <div class="inner">382,232원</div>
                </q-tooltip>
              </span>
              <span class="month">02</span>
            </div>
            <div class="chart chr6">
              <span class="graph gr6">
                <q-tooltip
                  v-model="showing1"
                  aanchor="top middle" self="bottom middle"
                  class="c_tooltip bottom"
                >
                  <div class="inner">382,232원</div>
                </q-tooltip>
              </span>
              <span class="month">03</span>
            </div> -->
            <div class="chart">
              <div role="progressbar" class="vertical_chart" data-legend="22.10">
                <div class="chartbar" style="height:70%">
                  <q-tooltip anchor="top middle" class="c_tooltip bottom">
                    <div class="inner">
                      382,232 원
                    </div>
                  </q-tooltip>
                </div>
              </div>
              <div role="progressbar" class="vertical_chart" data-legend="11">
                <div class="chartbar" style="height:40%">
                  <q-tooltip anchor="top middle" class="c_tooltip bottom">
                    <div class="inner">
                      382,232 원
                    </div>
                  </q-tooltip>
                </div>
              </div>
              <div role="progressbar" class="vertical_chart" data-legend="12">
                <div class="chartbar" style="height:100%">
                  <q-tooltip anchor="top middle" class="c_tooltip bottom">
                    <div class="inner">
                      382,232 원
                    </div>
                  </q-tooltip>
                </div>
              </div>
              <div role="progressbar" class="vertical_chart" data-legend="23.01">
                <div class="chartbar" style="height:60%">
                  <q-tooltip anchor="top middle" class="c_tooltip bottom">
                    <div class="inner">
                      382,232 원
                    </div>
                  </q-tooltip>
                </div>
              </div>
              <div role="progressbar" class="vertical_chart" data-legend="02">
                <div class="chartbar" style="height:30%">
                  <q-tooltip anchor="top middle" class="c_tooltip bottom">
                    <div class="inner">
                      382,232 원
                    </div>
                  </q-tooltip>
                </div>
              </div>
              <div role="progressbar" class="vertical_chart" data-legend="03">
                <div class="chartbar" style="height:50%">
                  <q-tooltip anchor="top middle" class="c_tooltip bottom">
                    <div class="inner">
                      382,232 원
                    </div>
                  </q-tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Quota -->
        <div v-if="workspace" class="storage-box_dash quota">
          <p class="sub-title">Workspace Quota</p>
          <a href="#" class="morelink">
            <span>더보기</span>
          </a>
          <div class="store-wrap">
            <q-scroll-area style="padding-right: 18px; height: 100%; max-width: 100%;">
              <!-- store -->
              <div class="store">
                <p class="name">CPU</p>
                <div class="space">
                  <p class="useage">
                    {{ $utils.getPercentData(workspace.quota.used.cpu_milli, workspace.quota.total.cpu_milli) }}%
                  </p>
                  <p class="used">
                    <span>{{ workspace.quota.used.cpu_milli }}</span>
                    &nbsp;/&nbsp;
                    {{ workspace.quota.total.cpu_milli }}
                  </p>
                </div>
                <div class="quo_progress">
                  <div class="state">
                    <progress
                      :value="workspace.quota.used.cpu_milli"
                      :max="workspace.quota.total.cpu_milli"
                      class="space-chart"
                    />
                  </div>
                </div>
              </div>
              <!-- // store -->
              <!-- store -->
              <div class="store">
                <p class="name">Tesla A100_80G</p>
                <div class="space">
                  <p class="useage">
                    {{ $utils.getPercentData(workspace.quota.used.a100_80g, workspace.quota.total.a100_80g) }}%
                  </p>
                  <p class="used">
                    <span>{{ workspace.quota.used.a100_80g }}</span>
                    &nbsp;/&nbsp;
                    {{ workspace.quota.total.a100_80g }}
                  </p>
                </div>
                <div class="quo_progress">
                  <div class="state">
                    <progress
                      :value="workspace.quota.used.a100_80g"
                      :max="workspace.quota.total.a100_80g"
                      class="space-chart"
                    />
                  </div>
                </div>
              </div>
              <!-- // store -->
              <!-- store -->
              <div class="store">
                <p class="name">Tesla A100_40G</p>
                <div class="space">
                  <p class="useage">
                    {{ $utils.getPercentData(workspace.quota.used.a100_40g, workspace.quota.total.a100_40g) }}%
                  </p>
                  <p class="used">
                    <span>{{ workspace.quota.used.a100_40g }}</span>
                    &nbsp;/&nbsp;
                    {{ workspace.quota.total.a100_40g }}
                  </p>
                </div>
                <div class="quo_progress">
                  <div class="state">
                    <progress
                      :value="workspace.quota.used.a100_40g"
                      :max="workspace.quota.total.a100_40g"
                      class="space-chart"
                    />
                  </div>
                </div>
              </div>
              <!-- // store -->
            </q-scroll-area>
          </div>
        </div>
      </div>
      <!-- Notice -->
      <div class="section notice-box">
        <p class="sub-title">Notice</p>
        <q-list class="c_collapse">
          <q-expansion-item
            v-for="notice in notices"
            :key="notice.id"
            group="notigroup"
            header-class="collapse_head"
          >
            <template v-slot:header>
              <q-icon :class="NOTICE_TYPE[notice.type].class" />
              <q-item-section class="state"><strong>{{ NOTICE_TYPE[notice.type].name }}</strong></q-item-section>
              <q-item-section class="title"><span>{{ notice.title }}</span></q-item-section>
              <!-- <q-item-section side class="date"><span>{{ $utils.paseseDate(new Date(notice.created_at).toUTCString(), "YY.MM.DD hh:mm") }}</span></q-item-section> -->
              <q-item-section side class="date"><span>{{ $utils.paseseDate(notice.created_at, "YY.MM.DD HH:MM") }}</span></q-item-section>
            </template>
            <q-card class="collapse_body">
              <q-card-section>
                <div class="text_data" v-html="notice.content" />
                <a href="#" class="alink">자세히 보기</a>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { useMeta } from "quasar";
import { $utils } from "src/utils/utils";
import { WorkspaceService, NoticeService } from "src/services";

useMeta(() => ({
  title: "Dashboard",
}));
const route = useRoute();
const updateTime = $utils.paseseDate(new Date(), "YYYY.MM.DD HH:MM");

const slide = ref(1);
const slide2 = ref(1);
const instanceData = ref(true);
const taskData = ref(true);
const storageData = ref(true);

const charts = ref([
  { label: "CPU 활용률", value: 45.6 },
  { label: "GPU 활용률", value: 86.7 },
]);
const stores = ref([
  {
    title: "복원중", caption: "스토리지 설명", current: "45", total: "200", value: 48.6
  },
  {
    title: "운영중(공유)", caption: "스토리지 설명스토리지 설명스토리지 설명스토리지 설명스토리지 설명스토리지 설명스토리지 설명스토리지 설명", current: "10,000", total: "10,000", value: 60
  },
  {
    title: "삭제중", caption: "스토리지 설명", current: "3,000", total: "10,000", value: 100
  },
  {
    title: "복원중", caption: "스토리지 설명", current: "45", total: "200", value: 45.6
  },
  {
    title: "운영중(공유)", caption: "스토리지 설명스토리지 설명스토리지 설명스토리지 설명", current: "10,000", total: "10,000", value: 60
  },
  {
    title: "삭제중", caption: "스토리지 설명", current: "3,000", total: "10,000", value: 100
  },
]);

// workspace info
const { workspaceId } = route.params;
const workspace = ref(null);
WorkspaceService.getWorkspace(workspaceId).then((data) => {
  workspace.value = data;
});
// workspace info 끝

// 배너
// const banner = ref(null);
// 공지사항
const notices = ref([]);
const NOTICE_TYPE = {
  service: {
    class: "service",
    name: "서비스"
  },
  community: {
    class: "community",
    name: "공동체"
  },
  work: {
    class: "work",
    name: "작업"
  },
};
const getNotices = async () => {
  const res = await NoticeService.getNotices();
  notices.value = res.notices;
};
getNotices();
// 공지사항 끝

// 10분단위 업데이트
const interval = setInterval(() => {
  getNotices();
  updateTime.value = $utils.paseseDate(new Date(), "YYYY.MM.DD HH:MM");
}, 10 * 60 * 1000);

onBeforeUnmount(() => {
  clearInterval(interval);
});
// 10분단위 업데이트 끝
</script>

<style lang="scss" scoped>
@import 'src/css/dashboard';
.c_tooltip{
  // position: relative;
  // padding: 50px;
}
  .inner{
    // bottom: 180px;
    min-width:auto;
    max-width:auto;
    text-align: center;
  }
</style>
