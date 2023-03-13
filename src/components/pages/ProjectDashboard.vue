<template>
  <div class="scroll_x">
    <ul class="com_h_cont">
      <template v-for="(projectChart, i) in projectChartData" :key="i">
        <li v-if="projectChart.type === 'quota'" class="quota_cont">
          <div class="cont_head">
            <h3>
              <i class="ico quota" />
              <span class="hidden">{{ projectChart.title }}</span>
            </h3>

            <div class="cont_head_inner">
              <ul>
                <li :class="{ now_view: viewTab == 0 }" @click="viewTab = 0">
                  {{ projectChart.tabtitle1 }}
                </li>
                <li :class="{ now_view: viewTab == 1 }" @click="viewTab = 1">
                  {{ projectChart.tabtitle2 }}
                </li>
              </ul>
            </div>
          </div>

          <div class="cont_main">
            <ul class="now_quota">
              <template v-if="viewTab == 0">
                <li
                  v-for="(workspace, i) in projectChart.workspaceQuota"
                  :key="`${i}`"
                >
                  <div class="circle_chart small">
                    <div
                      class="circle"
                      :style="`--value:(${workspace.value} / ${workspace.total}) * 100`"
                    >
                      <svg viewBox="0 0 600 600">
                        <defs>
                          <linearGradient
                            id="paint0_linear"
                            x1="50"
                            x2="200"
                            y1="200"
                            y2="450"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#FF0000" />
                            <stop offset="1" stop-color="#4992FF" />
                          </linearGradient>
                        </defs>
                        <circle pathLength="100" />
                      </svg>
                    </div>
                  </div>
                  <div class="progress_info">
                    <p class="pro_info_name">{{ workspace.label }}</p>
                    <p class="pro_info_num">
                      <span class="now_using">{{ workspace.value }}</span> /
                      {{ workspace.total }}
                    </p>
                  </div>
                </li>
              </template>
              <template v-if="viewTab == 1">
                <li
                  v-for="(project, i) in projectChart.projectQuota"
                  :key="`${i}`"
                >
                  <div class="circle_chart small">
                    <div
                      class="circle"
                      :style="`--value:(${project.value} / ${project.total}) * 100`"
                    >
                      <svg viewBox="0 0 600 600">
                        <defs>
                          <linearGradient
                            id="paint0_linear"
                            x1="50"
                            x2="200"
                            y1="200"
                            y2="450"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#FF0000" />
                            <stop offset="1" stop-color="#4992FF" />
                          </linearGradient>
                        </defs>
                        <circle pathLength="100" />
                      </svg>
                    </div>
                  </div>
                  <div class="progress_info">
                    <p class="pro_info_name">{{ project.label }}</p>
                    <p class="pro_info_num">
                      <span class="now_using">{{ project.value }}</span> /
                      {{ project.total }}
                    </p>
                  </div>
                </li>
              </template>
            </ul>
          </div>
        </li>
        <li v-if="projectChart.type === 'cpu'" class="cpu_rate com_area">
          <div class="cont_head">
            <h3>
              <i class="ico cpu" />
              <span class="hidden">{{ projectChart.title }}</span>
            </h3>

            <div class="cont_head_inner">
              <p class="head_txt">{{ projectChart.subtitle }}</p>
              <p class="time_info"><i class="ico blue_clock" />최근 24시간</p>
            </div>
          </div>

          <div class="cont_main">
            <p class="percentage_txt">
              <span class="now_percentage">{{ projectChart.value }}</span> %
            </p>
          </div>
          <div class="cont_footer">
            <div class="progress_bar_area">
              <progress :value="`${projectChart.value}`" max="100" />
            </div>
          </div>
        </li>
        <li v-if="projectChart.type === 'gpu'" class="gpu_rate com_area">
          <div class="cont_head">
            <h3>
              <i class="ico cpu" />
              <span class="hidden">{{ projectChart.title }}</span>
            </h3>

            <div class="cont_head_inner">
              <p class="head_txt">{{ projectChart.subtitle }}</p>
              <p class="time_info"><i class="ico purple_clock" />최근 24시간</p>
            </div>
          </div>

          <div class="cont_main">
            <p class="percentage_txt">
              <span class="now_percentage">{{ projectChart.value }}</span> %
            </p>
          </div>
          <div class="cont_footer">
            <div class="progress_bar_area">
              <progress :value="`${projectChart.value}`" max="100" />
            </div>
          </div>
        </li>
        <li v-if="projectChart.type === 'cost'" class="cost_rate com_area">
          <div class="cont_head">
            <h3>
              <i class="ico cost" />
              <span class="hidden">{{ projectChart.title }}</span>
            </h3>

            <div class="cont_head_inner">
              <p class="head_txt">{{ projectChart.subtitle }}</p>
            </div>
          </div>

          <div class="cont_main">
            <p class="cost_txt">
              <span class="now_cost">{{ projectChart.value }}</span> 원
            </p>
          </div>
          <div class="cont_footer">
            <p class="cost_use_date">{{ projectChart.date }}</p>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>
<script setup>
import { ref } from "vue";

const viewTab = ref(0);
const projectChartData = [
  {
    type: "quota",
    title: "할당량",
    tabtitle1: "워크스페이스 할당량",
    tabtitle2: "프로젝트 할당량",
    workspaceQuota: [
      {
        label: "V100",
        value: "50",
        total: "100",
      },
      {
        label: "A100",
        value: "30",
        total: "100",
      },
      {
        label: "CPU",
        value: "1002",
        total: "2000",
      },
    ],
    projectQuota: [
      {
        label: "V100",
        value: "70",
        total: "100",
      },
      {
        label: "A100",
        value: "100",
        total: "100",
      },
      {
        label: "CPU",
        value: "1500",
        total: "2000",
      },
    ],
  },
  {
    type: "cpu",
    title: "활용률",
    subtitle: "CPU 활용률",
    value: "55.6",
  },
  {
    type: "gpu",
    title: "활용률",
    subtitle: "GPU 활용률",
    value: "100",
  },
  {
    type: "cost",
    title: "비용",
    subtitle: "프로젝트 비용",
    value: "39,220,000",
    date: "22.12.01 ~ 22.12.23",
  },
];
</script>

<style lang="scss" scoped>
@import "./src/css/projects";
</style>
