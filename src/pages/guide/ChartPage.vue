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
