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
            style="font-size: 20px; color: blue;"
          >chart Demo 바로가기</a>

          <h3>Chart Docs</h3>
          <a
            href="https://apexcharts.com/docs/chart-types/line-chart/"
            target="_blank"
            style="font-size: 20px; color: blue;"
          >chart Docs 바로가기</a>
        </div>
        <apexchart
          height="400"
          type="line"
          :options="options"
          :series="series"
        ></apexchart>
      </section>
      <section class="section">
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
          <div class="circle-chart" style="--value:86.7;">
            <svg class="svg_dashboad" fill="none" viewBox="0 0 600 600">
              <defs>
                <linearGradient id="paint0_linear" x1="50" x2="200" y1="100" y2="450"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#FF0000"/>
                  <stop offset="1" stop-color="#4992FF"/>
                </linearGradient>
              </defs>
              <circle pathLength="100" cx="300" cy="300" r="285" class="circle-chart__bg" />
              <circle pathLength="100" cx="300" cy="300" r="285" class="circle-chart__stroke" />
            </svg>
          </div>
        </div>
      </section>

      <!-- <section class="section">
        <h3>Circular Gauage</h3>
        <div class="semi-circle-chart">
          <svg width="200" height="140" class="chart-svg" xmlns="http://www.w3.org/2000/svg">
            <g transform="rotate(170 100 100)">
            <circle class="circle-background" stroke-dasharray="280,1000000" stroke-width="7"
              stroke-linecap="round" r="80" cx="115" cy="90" fill="none"></circle>
            <circle class="circle-chart" stroke-dasharray="80,1000000" stroke-width="7"
              stroke-linecap="round" r="80" cx="115" cy="90" fill="none"></circle>
            </g>
          </svg>
          <div class="chart-price">
            <div class="chart-final-price">750</div>
            <div class="chart-from-price-text">
              <span class="chart-from-price">1500</span> MB
            </div>
          </div>
          <div class="added-text-chart">300MB</div>
        </div>
      </section>
      <section class="section">
        <h3>Circular Gauage</h3>
        <div class="semi-circle" data-value="66">
          <div class="arc">
          </div>
        </div>
      </section>
      <section class="section">
        <h3>Circular Gauage</h3>
        <svg width="30%" height="30%" viewBox="0 0 70 70" class="donut">
          <circle class="donut-hole" cx="21" cy="21" r="15.91549430918954" fill="#fff"></circle>
          <circle class="donut-ring" cx="21" cy="21" r="15.91549430918954" fill="transparent"
          stroke="#d2d3d4" stroke-width="3"></circle>
          <circle class="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent"
          stroke="#ce4b99" stroke-width="3" stroke-dasharray="85 15" stroke-linecap="round"
          stroke-dashoffset="25"></circle>
        </svg>
      </section>
      <section class="section">
        <h3>Circular Gauage</h3>
        <svg class="circle-chart" viewBox="0 0 100 100" width="140" height="140" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="myGradient2">
              <stop offset="0%" stop-color="#FF0000"></stop>
              <stop offset="100%" stop-color="#4992FF"></stop>
            </linearGradient>
          </defs>
          <circle
            class="circle-chart__background"
            stroke="#1C2142"
            stroke-width="8"
            fill="none"
            cx="50"
            cy="50"
            r="45">
          </circle>
          <circle
            class="circle-chart__circle"
            stroke="url('#myGradient2')"
            stroke-width="8"
            stroke-dasharray="274,280"
            stroke-linecap="round"
            fill="none"
            cx="50"
            cy="50"
            r="45">
          </circle>
        </svg>
      </section> -->
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

const options = {
  chart: {
    height: 350,
    type: "line",
    dropShadow: {
      enabled: true,
      color: "#000",
      top: 18,
      left: 7,
      blur: 10,
      opacity: 0.2,
    },
    toolbar: {
      show: false,
    },
  },
  colors: ["#77B6EA", "#545454"],
  dataLabels: {
    enabled: true,
  },
  stroke: {
    curve: "smooth",
  },
  title: {
    text: "Chart Sample Title",
    align: "left",
  },
  grid: {
    borderColor: "#e7e7e7",
    row: {
      colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
      opacity: 0.5,
    },
  },
  markers: {
    size: 1,
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    title: {
      text: "Month",
    },
  },
  yaxis: {
    title: {
      text: "Temperature",
    },
    min: 5,
    max: 40,
  },
  legend: {
    position: "top",
    horizontalAlign: "right",
    floating: true,
    offsetY: -25,
    offsetX: -5,
  },
};
const series = [
  {
    name: "High - 2013",
    data: [28, 29, 33, 36, 32, 32, 33],
  },
  {
    name: "Low - 2013",
    data: [12, 11, 14, 18, 17, 13, 13],
  },
];

const radiaBarOptions = {
  chart: {
    height: 350,
    type: "radialBar",
    toolbar: {
      show: true
    }
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
          opacity: 0.24
        }
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
          opacity: 0.35
        }
      },

      dataLabels: {
        show: true,
        name: {
          offsetY: -10,
          show: true,
          color: "#888",
          fontSize: "17px"
        },
        value: {
          formatter(val) {
            return parseInt(val, 10);
          },
          color: "#111",
          fontSize: "36px",
          show: true,
        }
      }
    }
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
      stops: [0, 100]
    }
  },
  stroke: {
    lineCap: "round"
  },
  labels: ["Percent"],
};

const radiaBarSeries = [75];

</script>
<style lang="scss" scoped>
.section:not(:first-child){margin-top:50px}

.chart_circle{
  width:140px;height:140px;
  border-radius: 50%;
  background:#212648;
}
.circle-chart {
  position: relative;
  width: 100%;height: 140px;
  stroke: #1C2142;
  stroke-dashoffset: 140;

  svg {
    width: 100%;
    display: block;
  }
  &__bg{
    stroke:rgb(28, 33, 66);
    stroke-width:30px;
    stroke-linecap:round;
    opacity:1;
  }
  &__stroke {
    stroke:url(#paint0_linear);
    stroke-linecap:round;
    stroke-width:30px;
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
.circle-background {
  stroke: #efefef;
}
.semi-circle-chart
{
  position: relative;
  width:200px;
  height:140px;
}
.semi-circle-chart .chart-svg
{
position: absolute;
  top: -15px;
  left: 12px;
}
.chart-price {
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    text-align:center;
}
.chart-final-price
{
  font-weight:bold;
  font-size:38px;
  color:#333333;
}
.chart-from-price-text
{
  font-size:12px;
}
.added-text-chart
{
text-align: center;
  color: #6A6A6A;
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
  border: 10px solid #CCC;
  border-radius:100px;
  border-bottom: none;
  top: 0;
  z-index: 1;
  border-radius: 300px 300px 0 0;
  width: 100%;
  height: 100%;
  content: '';
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
  border-color: #0099FF;
}
.arc:after {
  width: 5px;
  content: " ";
  transform: rotate(90deg);
  height: 60px;
  background: #0099FF;
  display: block;
  top: -30px;
  position: absolute;
  left: -28px;
  display:none;
}
@for $i from 1 through 100 {
  .semi-circle[data-value="#{$i}"] .arc{
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
  to { stroke-dasharray: 0 100; }
}

// type4
.circle-chart__circle {
  transform: rotate(-90deg);
  transform-origin: center;
}

</style>
