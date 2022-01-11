<template>
  <div id="Funnel"></div>
</template>
<script>
import { Line } from '@antv/g2plot';
import { getFunnel } from '@/api/index';
import { nextTick, onMounted } from '@vue/runtime-core';
export default {
  setup() {
    const init = () => {
      const linePlot = new Line('Funnel', {
        data,
        xField: 'year',
        yField: 'gdp',
        seriesField: 'name',
        yAxis: {
          label: {
            formatter: v => `${(v / 10e8).toFixed(1)} B`
          }
        },
        legend: {
          position: 'top'
        },
        smooth: true,
        // @TODO 后续会换一种动画方式
        animation: {
          appear: {
            animation: 'path-in',
            duration: 5000
          }
        }
      });

      linePlot.render();
    };
    onMounted(() => {
        getFunnel().then(res =>{})
      nextTick(() => {
        init();
      });
    });
    return {};
  }
};
</script>
<style lang='scss'>
</style>
