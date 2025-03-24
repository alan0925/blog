<template>
  <div ref="worldMap" style="width: 100%;height:600px"></div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts/map/js/world.js';

export default {
  name: 'WorldMap',
  data() {
    return {
      chartInstance: null,
      visitorData: [
        { name: 'China', value: 54 },
        { name: 'United States', value: 30 },
        { name: 'Canada', value: 20 },
        // 更多国家数据...
      ]
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      const mapChart = echarts.init(this.$refs.worldMap);
      const option = {
        series: [
          {
            name: 'Visitors',
            type: 'map',
            mapType: 'world',
            roam: true,
            zoom: 1.2,
            itemStyle: {
              areaColor: '#eee',
              borderColor: '#666',
              borderWidth: 0.5
            },
            emphasis: {
              label: {
                show: true
              },
              itemStyle: {
                areaColor: '#b7e2f9'
              }
            },
            data: this.visitorData
          }
        ],
        visualMap: {
          min: 0,
          max: 100,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'],
          calculable: true
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>Visitors: {c}'
        }
      };

      mapChart.setOption(option);
      this.chartInstance = mapChart;
    }
  }
};
</script>

<style scoped>
/* 可以在这里添加样式 */
</style>