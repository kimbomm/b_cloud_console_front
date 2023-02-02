<template>
  <q-page class="p-content p-console">
    <div class="p-head">
      <h1 class="p-title">{{ ptitle }}</h1>
      <p class="desc">
        <i class="ico time" />
        <span class="txt">업데이트 시간 <span class="time">2023.10.33 14:33</span></span>
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
                  <!-- chart 정해지기 전 임시로 UI 생성 -->
                  <div class="circle_chart">
                    <div class="circle_in">
                      <em>CPU 활용률</em>
                      <strong data-rate="45.6" />
                    </div>
                    <div class="circle_line">
                    </div>
                  </div>
                  <div class="circle_chart">
                    <div class="circle_line" />
                    <div class="circle_in">
                      <em>GPU 활용률</em>
                      <strong data-rate="99.8" />
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
                  <!-- chart 정해지기 전 임시로 UI 생성 -->
                  <div class="circle_chart">
                    <div class="circle_in">
                      <em>CPU 활용률</em>
                      <strong data-rate="45.6" />
                    </div>
                    <div class="circle_line">
                    </div>
                  </div>
                  <div class="circle_chart">
                    <div class="circle_line" />
                    <div class="circle_in">
                      <em>GPU 활용률</em>
                      <strong data-rate="99.8" />
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
                  <!-- chart 정해지기 전 임시로 UI 생성 -->
                  <div class="circle_chart">
                    <div class="circle_in">
                      <em>CPU 활용률</em>
                      <strong data-rate="45.6" />
                    </div>
                    <div class="circle_line">
                    </div>
                  </div>
                  <div class="circle_chart">
                    <div class="circle_line" />
                    <div class="circle_in">
                      <em>GPU 활용률</em>
                      <strong data-rate="99.8" />
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
                  <!-- chart 정해지기 전 임시로 UI 생성 -->
                  <div class="circle_chart">
                    <div class="circle_in">
                      <em>CPU 활용률</em>
                      <strong data-rate="45.6" />
                    </div>
                    <div class="circle_line">
                    </div>
                  </div>
                  <div class="circle_chart">
                    <div class="circle_line" />
                    <div class="circle_in">
                      <em>GPU 활용률</em>
                      <strong data-rate="99.8" />
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
            <!-- 정보가 없을경우 -->
            <!-- <div class="store-none">
              <p>이용중인 스토리지가 없습니다.</p>
            </div> -->

            <!-- 3개 넘게 스크롤이 생길경우(스크롤) -->
            <q-scroll-area style="padding-right: 18px; height: 100%; max-width: 100%;">
              <div class="store">
                <div class="store_card">
                  <div class="state">
                    <div class="circle_chart">
                      <div class="circle_in">
                        <strong data-rate="45.6" />
                      </div>
                      <div class="circle_line" />
                    </div>
                    <div>
                      <p class="name">스토리지 이름</p>
                      <p class="text">
                        <span>복원중</span>
                        <span class="ex">스토리지 설명 스토리지 설명스토리지 설명스토리지 설명</span>
                      </p>
                    </div>
                  </div>
                  <div class="capacity">
                    <span class="capacity_use">45</span>
                    <span class="capacity_amount">/ 200 BG</span>
                  </div>
                </div>
              </div>
              <div class="store">
                <div class="store_card">
                  <div class="state">
                    <div class="circle_chart">
                      <div class="circle_in">
                        <strong data-rate="45.6" />
                      </div>
                      <div class="circle_line" />
                    </div>
                    <div>
                      <p class="name">스토리지 이름</p>
                      <p class="text">
                        <span>복원중</span>
                        <span class="ex">스토리지 설명 스토리지 설명스토리지 설명스토리지 설명</span>
                      </p>
                    </div>
                  </div>
                  <div class="capacity">
                    <span class="capacity_use">45</span>
                    <span class="capacity_amount">/ 200 BG</span>
                  </div>
                </div>
              </div>
              <div class="store">
                <div class="store_card">
                  <div class="state">
                    <div class="circle_chart">
                      <div class="circle_in">
                        <strong data-rate="45.6" />
                      </div>
                      <div class="circle_line" />
                    </div>
                    <div>
                      <p class="name">스토리지 이름</p>
                      <p class="text">
                        <span>복원중</span>
                        <span class="ex">스토리지 설명 스토리지 설명스토리지 설명스토리지 설명</span>
                      </p>
                    </div>
                  </div>
                  <div class="capacity">
                    <span class="capacity_use">45</span>
                    <span class="capacity_amount">/ 200 BG</span>
                  </div>
                </div>
              </div>
              <div class="store">
                <div class="store_card">
                  <div class="state">
                    <div class="circle_chart">
                      <div class="circle_in">
                        <strong data-rate="45.6" />
                      </div>
                      <div class="circle_line" />
                    </div>
                    <div>
                      <p class="name">스토리지 이름</p>
                      <p class="text">
                        <span>복원중</span>
                        <span class="ex">스토리지 설명 스토리지 설명스토리지 설명스토리지 설명</span>
                      </p>
                    </div>
                  </div>
                  <div class="capacity">
                    <span class="capacity_use">45</span>
                    <span class="capacity_amount">/ 200 BG</span>
                  </div>
                </div>
              </div>
              <div class="store">
                <div class="store_card">
                  <div class="state">
                    <div class="circle_chart">
                      <div class="circle_in">
                        <strong data-rate="45.6" />
                      </div>
                      <div class="circle_line" />
                    </div>
                    <div>
                      <p class="name">스토리지 이름</p>
                      <p class="text">
                        <span>복원중</span>
                        <span class="ex">스토리지 설명 스토리지 설명스토리지 설명스토리지 설명</span>
                      </p>
                    </div>
                  </div>
                  <div class="capacity">
                    <span class="capacity_use">45</span>
                    <span class="capacity_amount">/ 200 BG</span>
                  </div>
                </div>
              </div>
            </q-scroll-area>
          </div>
        </div>
        <!-- Billing -->
        <div class="storage-box_dash billing">
          <p class="sub-title">Billing</p>
          <a href="#" class="morelink">
            <span>더보기</span>
          </a>
          <p class="name">당월 이용금액</p>
          <p class="current"><span class="current_pay">1,394,213</span>&nbsp;원</p>
          <!-- 임시 chart -->
          <div class="billing-chart">
            <div class="chart chr1">
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
            </div>
          </div>
          <!-- // 임시 chart -->
        </div>
        <!-- Quota -->
        <div class="storage-box_dash quota">
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
                  <p class="useage">24%</p>
                  <p class="used"><span>24</span>&nbsp;/&nbsp;100</p>
                </div>
                <div class="quo_progress">
                  <div class="state">
                    <progress
                      value="24"
                      max="100"
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
                  <p class="useage">24%</p>
                  <p class="used"><span>24</span>&nbsp;/&nbsp;100</p>
                </div>
                <div class="quo_progress">
                  <div class="state">
                    <progress
                      value="24"
                      max="100"
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
                  <p class="useage">75%</p>
                  <p class="used"><span>75</span>&nbsp;/&nbsp;100</p>
                </div>
                <div class="quo_progress">
                  <div class="state">
                    <progress
                      value="75"
                      max="100"
                      class="space-chart"
                    />
                  </div>
                </div>
              </div>
              <!-- // store -->
              <!-- store -->
              <div class="store">
                <p class="name">CPU</p>
                <div class="space">
                  <p class="useage">24%</p>
                  <p class="used"><span>24</span>&nbsp;/&nbsp;100</p>
                </div>
                <div class="quo_progress">
                  <div class="state">
                    <progress
                      value="24"
                      max="100"
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
          <q-expansion-item group="notigroup" default-opened header-class="collapse_head">
            <template v-slot:header>
              <q-icon class="service" />
              <q-item-section class="state"><strong>서비스</strong></q-item-section>
              <q-item-section class="title"><span>스토리지 사용안내 제목입니다</span></q-item-section>
              <q-item-section side class="date"><span>23.01.03 18:33</span></q-item-section>
            </template>
            <q-card class="collapse_body">
              <q-card-section>
                <div class="text_data">
                  스토리지 사용안내 드립니다.
                  스토리지 용량을 초과해서 사용하실 경우 기존 사용금액보다 더 많은 사용금액을 지불 할 수 있습니다.
                  스토리지 사용안내 드립니다.
                  스토리지 용량을 초과해서 사용하실 경우 기존 사용금액보다 더 많은 사용금액을 지불 할 수 있습니다.
                  스토리지 사용안내 드립니다.
                  스토리지 용량을 초과해서 사용하실 경우 기존 사용금액보다 더 많은 사용금액을 지불 할 수 있습니다.
                  스토리지 사용안내 드립니다.
                  스토리지 용량을 초과해서 사용하실 경우 기존 사용금액보다 더 많은 사용금액을 지불 할 수 있습니다.
                  스토리지 사용안내 드립니다.
                  스토리지 용량을 초과해서 사용하실 경우 기존 사용금액보다 더 많은 사용금액을 지불 할 수 있습니다.
                  스토리지 사용안내 드립니다.
                  스토리지 용량을 초과해서 사용하실 경우 기존 사용금액보다 더 많은 사용금액을 지불 할 수 있습니다.
                </div>
                <a href="#" class="alink">자세히 보기</a>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item group="notigroup" header-class="collapse_head">
            <template v-slot:header>
              <q-icon class="community" />
              <q-item-section class="state"><strong>공동체</strong></q-item-section>
              <q-item-section class="title"><span>스토리지 사용안내 제목입니다</span></q-item-section>
              <q-item-section side class="date"><span>23.01.03 18:33</span></q-item-section>
            </template>
            <q-card class="collapse_body">
              <q-card-section>
                <div class="text_data">
                  스토리지 사용안내 드립니다.
                  스토리지 용량을 초과해서 사용하실 경우 기존 사용금액보다 더 많은 사용금액을 지불 할 수 있습니다.
                  스토리지 사용안내 드립니다.
                  스토리지 용량을 초과해서 사용하실 경우 기존 사용금액보다 더 많은 사용금액을 지불 할 수 있습니다.
                  스토리지 사용안내 드립니다.
                  스토리지 용량을 초과해서 사용하실 경우 기존 사용금액보다 더 많은 사용금액을 지불 할 수 있습니다.
                  스토리지 사용안내 드립니다.
                  스토리지 용량을 초과해서 사용하실 경우 기존 사용금액보다 더 많은 사용금액을 지불 할 수 있습니다.
                  스토리지 사용안내 드립니다.
                  스토리지 용량을 초과해서 사용하실 경우 기존 사용금액보다 더 많은 사용금액을 지불 할 수 있습니다.
                  스토리지 사용안내 드립니다.
                  스토리지 용량을 초과해서 사용하실 경우 기존 사용금액보다 더 많은 사용금액을 지불 할 수 있습니다.
                </div>
                <a href="#" class="alink">자세히 보기</a>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item group="notigroup" header-class="collapse_head">
            <template v-slot:header>
              <q-icon class="work" />
              <q-item-section class="state"><strong>작업</strong></q-item-section>
              <q-item-section class="title"><span>스토리지 사용안내 제목입니다</span></q-item-section>
              <q-item-section side class="date"><span>23.01.03 18:33</span></q-item-section>
            </template>
            <q-card class="collapse_body">
              <q-card-section>
                <div class="text_data">
                  스토리지 사용안내 드립니다.
                  스토리지 용량을 초과해서 사용하실 경우 기존 사용금액보다 더 많은 사용금액을 지불 할 수 있습니다.
                  스토리지 사용안내 드립니다.
                  스토리지 용량을 초과해서 사용하실 경우 기존 사용금액보다 더 많은 사용금액을 지불 할 수 있습니다.
                  스토리지 사용안내 드립니다.
                  스토리지 용량을 초과해서 사용하실 경우 기존 사용금액보다 더 많은 사용금액을 지불 할 수 있습니다.
                  스토리지 사용안내 드립니다.
                  스토리지 용량을 초과해서 사용하실 경우 기존 사용금액보다 더 많은 사용금액을 지불 할 수 있습니다.
                  스토리지 사용안내 드립니다.
                  스토리지 용량을 초과해서 사용하실 경우 기존 사용금액보다 더 많은 사용금액을 지불 할 수 있습니다.
                  스토리지 사용안내 드립니다.
                  스토리지 용량을 초과해서 사용하실 경우 기존 사용금액보다 더 많은 사용금액을 지불 할 수 있습니다.
                </div>
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
import { ref } from "vue";
import { useMeta } from "quasar";

const title = ref("Dashboard");
useMeta(() => ({
  title: title.value,
}));
const ptitle = ref(title);
const slide = ref(1);
const instanceData = true;
const taskData = true;

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
