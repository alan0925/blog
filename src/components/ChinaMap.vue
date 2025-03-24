<script setup>
// 引入 ECharts 主模块
import * as echarts from 'echarts';
// 引入中国地图数据
import 'echarts/map/js/china.js';
import Water from '@/components/Water.vue'
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';

let titleClassList = ['none', 'rotate', 'drop']
let stateRunList = [false, false, false]
let titleStateList = ref([0, 0, 0])
let titleExistList = ref([true, true, true])
let cntList = ['三', '二', '一']
// let water = ref(false)
let chartInstance = ref(null)
let chinaMap = ref(null)
let visitorData = ref([
  { name: '北京', value: 0 },
  { name: '天津', value: 0 },
  { name: '河北', value: 0 },
  { name: '山西', value: 0 },
  { name: '内蒙古', value: 0 },
  { name: '辽宁', value: 0 },
  { name: '吉林', value: 0 },
  { name: '黑龙江', value: 0 },
  { name: '上海', value: 0 },
  { name: '江苏', value: 0 },
  { name: '浙江', value: 0 },
  { name: '安徽', value: 0 },
  { name: '福建', value: 0 },
  { name: '江西', value: 21 },
  { name: '山东', value: 0 },
  { name: '河南', value: 0 },
  { name: '湖北', value: 0 },
  { name: '湖南', value: 47 },
  { name: '广东', value: 0 },
  { name: '广西', value: 0 },
  { name: '海南', value: 0 },
  { name: '重庆', value: 0 },
  { name: '四川', value: 0 },
  { name: '贵州', value: 0 },
  { name: '云南', value: 0 },
  { name: '西藏', value: 0 },
  { name: '陕西', value: 0 },
  { name: '甘肃', value: 0 },
  { name: '青海', value: 0 },
  { name: '宁夏', value: 0 },
  { name: '新疆', value: 0 },
  { name: '香港', value: 0 },
  { name: '澳门', value: 0 },
  { name: '台湾', value: 0 },
  { name: '南海诸岛', value: 0 }
])
onMounted(() => {
  initChart()
})

function changeState(i) {
  console.log('click', stateRunList[i]);
  if (!stateRunList[i]) {
    console.log('click');

    stateRunList[i] = true
    titleStateList.value[i]++
  }
}
function changeRun(i) {
  stateRunList[i] = false
  if (titleStateList.value[i] == titleClassList.length - 1) {
    titleExistList.value[i] = false
  }
}

function initChart() {
  const mapChart = echarts.init(chinaMap.value);
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        return `${params.name}: ${params.value}`;
      },
      extraCssText: 'font-size: 18px;font-family:mFont;'
    },
    series: [
      {
        name: 'visitors',
        type: 'map',
        mapType: 'china', // 使用中国的地图
        roam: false, // 允许缩放和平移
        itemStyle: {
          areaColor: '#eee',
        },
        emphasis: {
          label: {
            show: false,
          },
          itemStyle: {
            areaColor: '#777',
          }
        },
        data: visitorData.value // 填充的访客数据
      }
    ],
    visualMap: {
      min: 0,
      max: 100,
      inRange: {
        color: ['#fff', '#888'] // 设置颜色渐变区间
      },
      show: false
    }
  };
  mapChart.setOption(option);
  chartInstance.value = mapChart;
}
onBeforeUnmount(() => {
  if (chartInstance.value) {
    chartInstance.value.dispose();
  }
})

let total_visitor = computed(() => {
  return visitorData.value.reduce((acc, cur) => acc + cur.value, 0)
})

</script>

<template>
  <div class="visitor">
    <div class="total">{{ total_visitor }}</div>
    <div v-for="i in [0, 1, 2]" :key="i">
      <div v-border-image :class="['mapTitle', titleClassList[titleStateList[i]]]" @click="changeState(i)"
        @animationend="changeRun(i)" v-if="titleExistList[i]">
        到此{{ cntList[i] }}游</div>
    </div>
    <div v-border-image ref="chinaMap" class="map"></div>


    <!-- <Water v-if="water"></Water> -->
  </div>

</template>


<style lang="scss" scoped>
.visitor {
  margin: 10px auto;
  width: 800px;
  height: 600px;
  position: relative;

  .map {
    width: 800px;
    height: 600px;
  }

  .mapTitle {
    width: 100px;
    height: 50px;
    font-size: 22px;
    position: absolute;
    top: 50px;
    left: 350px;
    text-align: center;
    line-height: 50px;
    z-index: 2;
    transition: all 1s ease-in;
    transform-origin: left top;
    /* 启用3D空间 */

    background-color: white;

    /* 设置旋转中心点为底部中心 */
    &:hover {
      cursor: pointer;
    }
  }

  .total {
    width: 100px;
    height: 50px;
    font-size: 40px;
    position: absolute;
    top: 50px;
    left: 350px;
    text-align: center;
    line-height: 50px;
    z-index: 1;
  }

  .rotate {
    transform-origin: left top;
    animation: rotate 5s ease forwards;
  }

  .drop {
    transform-origin: left top;
    animation: drop 2s ease-in forwards;
  }

  @keyframes rotate {
    0% {
      rotate: 0;
    }

    40% {
      rotate: 80deg;
    }

    72% {
      rotate: 50deg;
    }

    100% {
      rotate: 60deg;
    }
  }

  @keyframes drop {
    0% {
      transform: translateX(0px) translateY(0px);
      rotate: 60deg;
      opacity: 1;
    }

    100% {
      transform: translateX(433px) translateY(250px);
      rotate: 60deg;
      opacity: 0;
    }
  }
}
</style>