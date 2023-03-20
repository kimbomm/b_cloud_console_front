<template>
  <div class="p-content p-guide p-table">
    <div class="p-head">
      <h1 class="p-title">{{ title }}</h1>
    </div>
    <div class="p-body">
      <section class="section">
        <div>
          <h3 class="">Chart Link</h3>
          <a
            href="https://apexcharts.com/vue-chart-demos/"
            target="_blank"
            style="font-size: 20px; color: blue"
            >chart Demo 바로가기</a
          >

          <h3>Chart Docs</h3>
          <a
            href="https://apexcharts.com/docs/chart-types/line-chart/"
            target="_blank"
            style="font-size: 20px; color: blue"
            >chart Docs 바로가기</a
          >
        </div>
        <br />
        <br />
        <br />
        <br />
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
              :options="options"
              :series="series"
            ></apexchart>
            <div v-else class="loading">
              <div class="loading_text" />
            </div>
          </div>
        </q-card>
      </section>
      <section class="section" style="display: none">
        <h3>Circular Gauage</h3>
        <div id="chart"></div>
        <apexchart
          height="350"
          type="radialBar"
          :options="radiaBarOptions"
          :series="radiaBarSeries"
        ></apexchart>
      </section>

      <section class="section">
        <h3>CSS+SVG Circular Gauage</h3>
        <div class="chart_circle">
          <div class="circle-chart" style="--value: 86.7">
            <svg class="svg_dashboad" fill="none" viewBox="0 0 600 600">
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
                class="circle-chart__bg"
              />
              <circle
                pathLength="100"
                cx="300"
                cy="300"
                r="285"
                class="circle-chart__stroke"
              />
            </svg>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";

const title = ref("Chart");
useMeta(() => ({
  title: title.value,
}));

const chartModel = true;
const options = {
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
  tooltip: {
    x: {
      show: false,
    },
  },
  noData: {
    text: undefined,
    align: "center",
    verticalAlign: "middle",
    offsetX: 0,
    offsetY: 0,
    style: {
      color: undefined,
      fontSize: "14px",
      fontFamily: undefined,
    },
  },
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

const radiaBarOptions = {
  chart: {
    height: 350,
    type: "radialBar",
    toolbar: {
      show: true,
    },
  },
  plotOptions: {
    radialBar: {
      startAngle: 0,
      endAngle: 360,
      hollow: {
        margin: 0,
        size: "70%",
        background: "#fff",
        position: "front",
        dropShadow: {
          enabled: true,
          top: 3,
          left: 0,
          blur: 4,
          opacity: 0.24,
        },
      },
      track: {
        background: "#fff",
        strokeWidth: "67%",
        margin: 0, // margin is in pixels
        dropShadow: {
          enabled: true,
          top: -3,
          left: 0,
          blur: 4,
          opacity: 0.35,
        },
      },

      dataLabels: {
        show: true,
        name: {
          offsetY: -10,
          show: true,
          color: "#888",
          fontSize: "17px",
        },
        value: {
          formatter(val) {
            return parseInt(val, 10);
          },
          color: "#111",
          fontSize: "36px",
          show: true,
        },
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "horizental",
      shadeIntensity: 0.5,
      gradientToColors: ["#FF0000", "#4992FF"],
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100],
    },
  },
  stroke: {
    lineCap: "round",
  },
  labels: ["Percent"],
};

const radiaBarSeries = [75];
</script>
<style lang="scss" scoped>
@import "./src/css/table";
.section:not(:first-child) {
  margin-top: 50px;
}

.chart_circle {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: #212648;
}
.circle-chart {
  position: relative;
  width: 100%;
  height: 140px;
  stroke: #1c2142;
  stroke-dashoffset: 140;

  svg {
    width: 100%;
    display: block;
  }
  &__bg {
    stroke: rgb(28, 33, 66);
    stroke-width: 30px;
    stroke-linecap: round;
    opacity: 1;
  }
  &__stroke {
    stroke: url(#paint0_linear);
    stroke-linecap: round;
    stroke-width: 30px;
    stroke-dasharray: 100px;
    stroke-dashoffset: calc((100 - var(--value, 0)) * 1px);
    transform-origin: 300px 300px;
    transform: rotate(-90deg);
    transition: stroke-dashoffset 0.7s ease-in-out;
  }
}

@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}

// Loading
.loading {
  &.loading_text {
    position: relative;
    width: 40px;
    height: 40px;
    margin: 0;
    padding-left: 32px;
    color: $primary;
    font-size: $fs14;
    &::before {
      content: "";
      display: inline-block;
      position: absolute;
      top: -3px;
      left: 0;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      background-size: 20px;
    }
    &::before {
      background-image: url($iconUrl + "20/ico_loading.svg");
      animation: spin 2s linear infinite;
    }
  }
}
@keyframes spin {
  0% {
    transform: rotate3d(0, 0, 1, 0deg);
  }
  25% {
    transform: rotate3d(0, 0, 1, 90deg);
  }
  50% {
    transform: rotate3d(0, 0, 1, 180deg);
  }
  75% {
    transform: rotate3d(0, 0, 1, 270deg);
  }
  100% {
    transform: rotate3d(0, 0, 1, 359deg);
  }
}
.circle-background {
  stroke: #efefef;
}
.semi-circle-chart {
  position: relative;
  width: 200px;
  height: 140px;
}
.semi-circle-chart .chart-svg {
  position: absolute;
  top: -15px;
  left: 12px;
}
.chart-price {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.chart-final-price {
  font-weight: bold;
  font-size: 38px;
  color: #333333;
}
.chart-from-price-text {
  font-size: 12px;
}
.added-text-chart {
  text-align: center;
  color: #6a6a6a;
  position: absolute;
  bottom: 0px;
  font-size: 12px;
  width: 100%;
}

// type2
.semi-circle {
  position: relative;
  width: 200px;
  height: 100px;
  overflow: hidden;
}
.semi-circle:before {
  border: 10px solid #ccc;
  border-radius: 100px;
  border-bottom: none;
  top: 0;
  z-index: 1;
  border-radius: 300px 300px 0 0;
  width: 100%;
  height: 100%;
  content: "";
  position: absolute;
  transform-origin: 50% 0%;
  left: 0;
  box-sizing: border-box;
}
.semi-circle:after {
  font-weight: bold;
  content: attr(data-value) "%";
  position: absolute;
  font-size: 2em;
  bottom: 0px;
  left: calc(50% - 40px);
  min-width: 80px;
  text-align: center;
}
.arc {
  border: 10px solid;
  border-top: none;
  content: " ";
  display: block;
  border-radius: 0 0 300px 300px;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 100px;
  left: 0px;
  transform-origin: 50% 0;
  box-sizing: border-box;
  z-index: 2;
  border-color: #0099ff;
}
.arc:after {
  width: 5px;
  content: " ";
  transform: rotate(90deg);
  height: 60px;
  background: #0099ff;
  display: block;
  top: -30px;
  position: absolute;
  left: -28px;
  display: none;
}
@for $i from 1 through 100 {
  .semi-circle[data-value="#{$i}"] .arc {
    // @if ($i < 50) {
    //   border-color: #FF0000;
    // }
    // @elseif ($i < 75) {
    //   border-color: #FF9900;
    // }
    // @else {
    //   border-color: green;
    // }

    transform: rotate(#{$i * 1.8}deg);
    animation: rotate 1s linear;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
}

// type3
.donut-segment {
  animation: circle-chart-fill 2s reverse; /* 1 */
  transform-origin: center; /* 4 */
}

@keyframes circle-chart-fill {
  to {
    stroke-dasharray: 0 100;
  }
}

// type4
.circle-chart__circle {
  transform: rotate(-90deg);
  transform-origin: center;
}
</style>
