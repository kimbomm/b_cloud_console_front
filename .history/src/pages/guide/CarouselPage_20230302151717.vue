<template>
  <div class="p-content p-guide p-carousel">
    <div class="p-head">
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <section class="section">
        <h2 class="h6">class="c_carousel"</h2>
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
                    v-for="(chart, i) in charts"
                    :key="`${i}`"
                    class="circle_chart"
                  >
                    <div class="circle-svg" :style="`--value:${chart.value}`">
                      <svg
                        class="svg_dashboad"
                        fill="none"
                        viewBox="0 0 600 600"
                      >
                        <defs>
                          <linearGradient
                            id="paint0_linear"
                            x1="50"
                            x2="200"
                            y1="100"
                            y2="450"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#FF0000" />
                            <stop offset="1" stop-color="#4992FF" />
                          </linearGradient>
                        </defs>
                        <circle
                          pathLength="100"
                          cx="300"
                          cy="300"
                          r="285"
                          class="circle-svg__bg"
                        />
                        <circle
                          pathLength="100"
                          cx="300"
                          cy="300"
                          r="285"
                          class="circle-svg__stroke"
                        />
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
            <div class="carousel_time"><i class="ico clock" />최근 24시간</div>
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
                    v-for="(chart, i) in charts"
                    :key="`${i}`"
                    class="circle_chart"
                  >
                    <div class="circle-svg" :style="`--value:${chart.value}`">
                      <svg
                        class="svg_dashboad"
                        fill="none"
                        viewBox="0 0 600 600"
                      >
                        <defs>
                          <linearGradient
                            id="paint0_linear"
                            x1="50"
                            x2="200"
                            y1="100"
                            y2="450"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#FF0000" />
                            <stop offset="1" stop-color="#4992FF" />
                          </linearGradient>
                        </defs>
                        <circle
                          pathLength="100"
                          cx="300"
                          cy="300"
                          r="285"
                          class="circle-svg__bg"
                        />
                        <circle
                          pathLength="100"
                          cx="300"
                          cy="300"
                          r="285"
                          class="circle-svg__stroke"
                        />
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
            <div class="carousel_time"><i class="ico clock" />최근 24시간</div>
          </q-carousel-slide>
        </q-carousel>
      </section>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";

const title = ref("Carousel");
useMeta(() => ({
  title: title.value,
}));
const ptitle = ref(title);
const slide = ref(1);
const instanceData = true;
const taskData = true;

const charts = ref([
  { label: "CPU 활용률", value: 45.6 },
  { label: "GPU 활용률", value: 86.7 },
]);
</script>

<style lang="scss" scoped>
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
</style>
