<template>
  <ul class="com_h_cont">
    <li class="quota_cont">
      <div class="cont_head">
        <h3>
          <i class="ico quota" />
          <span class="hidden">할당량</span>
        </h3>

        <div class="cont_head_inner">
          <ul>
            <li :class="{'now_view' : viewTab == 0}" @click="viewTab = 0">워크스페이스 할당량</li>
            <li :class="{'now_view' : viewTab == 1}" @click="viewTab = 1">프로젝트 할당량</li>
          </ul>
        </div>
      </div>

      <div class="cont_main">
        <template v-if="viewTab == 0">
          <ul class="now_quota">
            <li>
              <div class="circle_chart small">
                <div class="circle-svg" style="--value:50;">
                  <svg class="svg_dashboad" fill="none" viewBox="0 0 600 600">
                    <defs>
                      <linearGradient id="paint2_linear" x1="50" x2="200" y1="100" y2="450"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FF0000"/>
                        <stop offset="1" stop-color="#4992FF"/>
                      </linearGradient>
                    </defs>
                    <circle pathLength="100"
                    cx="300" cy="300" r="240"
                    class="circle-svg__bg" />
                    <circle pathLength="100"
                    cx="300" cy="300" r="240"
                    class="circle-svg__stroke" />
                  </svg>
                </div>
                <div class="circle_in" />
              </div>
              <div class="progress_info">
                <p class="pro_info_name">Tesla V100</p>
                <p class="pro_info_num">
                  <span class="now_using">50</span> / 100
                </p>
              </div>
            </li>
            <li>
              <div class="circle_chart small">
                <div class="circle-svg" style="--value:30;">
                  <svg class="svg_dashboad" fill="none" viewBox="0 0 600 600">
                    <defs>
                      <linearGradient id="paint2_linear" x1="50" x2="200" y1="100" y2="450"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FF0000"/>
                        <stop offset="1" stop-color="#4992FF"/>
                      </linearGradient>
                    </defs>
                    <circle pathLength="100"
                    cx="300" cy="300" r="240"
                    class="circle-svg__bg" />
                    <circle pathLength="100"
                    cx="300" cy="300" r="240"
                    class="circle-svg__stroke" />
                  </svg>
                </div>
                <div class="circle_in" />
              </div>
              <div class="progress_info">
                <p class="pro_info_name">Tesla A100</p>
                <p class="pro_info_num">
                  <span class="now_using">3</span> / 10
                </p>
              </div>
            </li>
            <li>
              <div class="circle_chart small">
                <div class="circle-svg" style="--value:70;">
                  <svg class="svg_dashboad" fill="none" viewBox="0 0 600 600">
                    <defs>
                      <linearGradient id="paint2_linear" x1="50" x2="200" y1="100" y2="450"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FF0000"/>
                        <stop offset="1" stop-color="#4992FF"/>
                      </linearGradient>
                    </defs>
                    <circle pathLength="100"
                    cx="300" cy="300" r="240"
                    class="circle-svg__bg" />
                    <circle pathLength="100"
                    cx="300" cy="300" r="240"
                    class="circle-svg__stroke" />
                  </svg>
                </div>
                <div class="circle_in" />
              </div>
              <div class="progress_info">
                <p class="pro_info_name">CPU</p>
                <p class="pro_info_num">
                  <span class="now_using">1002</span> / 2000
                </p>
              </div>
            </li>
          </ul>
        </template>
        <template v-if="viewTab == 1">
          <ul class="now_quota">
            <li>
              <div class="circle_chart small">
                <div class="circle-svg" style="--value:50;">
                  <svg class="svg_dashboad" fill="none" viewBox="0 0 600 600">
                    <defs>
                      <linearGradient id="paint2_linear" x1="50" x2="200" y1="100" y2="450"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FF0000"/>
                        <stop offset="1" stop-color="#4992FF"/>
                      </linearGradient>
                    </defs>
                    <circle pathLength="100"
                    cx="300" cy="300" r="240"
                    class="circle-svg__bg" />
                    <circle pathLength="100"
                    cx="300" cy="300" r="240"
                    class="circle-svg__stroke" />
                  </svg>
                </div>
                <div class="circle_in" />
              </div>
              <div class="progress_info">
                <p class="pro_info_name">Tesla V100</p>
                <p class="pro_info_num">
                  <span class="now_using">60</span> / 100
                </p>
              </div>
            </li>
            <li>
              <div class="circle_chart small">
                <div class="circle-svg" style="--value:50;">
                  <svg class="svg_dashboad" fill="none" viewBox="0 0 600 600">
                    <defs>
                      <linearGradient id="paint2_linear" x1="50" x2="200" y1="100" y2="450"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FF0000"/>
                        <stop offset="1" stop-color="#4992FF"/>
                      </linearGradient>
                    </defs>
                    <circle pathLength="100"
                    cx="300" cy="300" r="240"
                    class="circle-svg__bg" />
                    <circle pathLength="100"
                    cx="300" cy="300" r="240"
                    class="circle-svg__stroke" />
                  </svg>
                </div>
                <div class="circle_in" />
              </div>
              <div class="progress_info">
                <p class="pro_info_name">Tesla A100</p>
                <p class="pro_info_num">
                  <span class="now_using">5</span> / 10
                </p>
              </div>
            </li>
            <li>
              <div class="circle_chart small">
                <div class="circle-svg" style="--value:50;">
                  <svg class="svg_dashboad" fill="none" viewBox="0 0 600 600">
                    <defs>
                      <linearGradient id="paint2_linear" x1="50" x2="200" y1="100" y2="450"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FF0000"/>
                        <stop offset="1" stop-color="#4992FF"/>
                      </linearGradient>
                    </defs>
                    <circle pathLength="100"
                    cx="300" cy="300" r="240"
                    class="circle-svg__bg" />
                    <circle pathLength="100"
                    cx="300" cy="300" r="240"
                    class="circle-svg__stroke" />
                  </svg>
                </div>
                <div class="circle_in" />
              </div>
              <div class="progress_info">
                <p class="pro_info_name">CPU</p>
                <p class="pro_info_num">
                  <span class="now_using">1012</span> / 2000
                </p>
              </div>
            </li>
          </ul>
        </template>
      </div>
    </li>
    <li class="cpu_rate com_area">
      <div class="cont_head">
        <h3>
          <i class="ico cpu" />
          <span class="hidden">활용률</span>
        </h3>

        <div class="cont_head_inner">
          <p class="head_txt">CPU 활용률</p>
          <p class="time_info"><i class="ico blue_clock" />최근 24시간</p>
        </div>
      </div>

      <div class="cont_main">
        <p class="percentage_txt">
          <span class="now_percentage">55.6</span> %
        </p>
      </div>
      <div class="cont_footer">
        <div class="progress_bar_area">
          <progress
            value="75"
            max="100"
          />
        </div>
      </div>
    </li>
    <li class="gpu_rate com_area">
      <div class="cont_head">
        <h3>
          <i class="ico gpu" />
          <span class="hidden">활용률</span>
        </h3>

        <div class="cont_head_inner">
          <p class="head_txt">GPU 활용률</p>
          <p class="time_info"><i class="ico purple_clock" />최근 24시간</p>
        </div>
      </div>

      <div class="cont_main">
        <p class="percentage_txt">
          <span class="now_percentage">55.6</span> %
        </p>
      </div>
      <div class="cont_footer">
        <div class="progress_bar_area">
          <progress
            value="75"
            max="100"
          />
        </div>
      </div>
    </li>
    <li class="cost_rate com_area">
      <div class="cont_head">
        <h3>
          <i class="ico cost" />
          <span class="hidden">비용</span>
        </h3>

        <div class="cont_head_inner">
          <p class="head_txt">프로젝트 비용</p>
        </div>
      </div>

      <div class="cont_main">
        <p class="cost_txt">
          <span class="now_cost">39,220,000</span> 원
        </p>
      </div>
      <div class="cont_footer">
        <p class="cost_use_date">22.12.01 ~ 22.12.23</p>
      </div>
    </li>
  </ul>
</template>
<script setup>
import { ref } from "vue";

const viewTab = ref(0);
</script>

<style lang="scss" scoped>
@import "./src/css/projects";
</style>
