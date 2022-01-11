<template>
  <div class="AreaG2">
    <div id="AreaG2"></div>
  </div>
</template>
<script>
import { Rose } from '@antv/g2plot';
import { nextTick, onMounted } from '@vue/runtime-core';
export default {
  setup() {
    const AreaG2 = () => {
      fetch('https://gw.alipayobjects.com/os/antfincdn/XcLAPaQeeP/rose-data.json')
        .then(data => data.json())
        .then(data => {
          // 分组玫瑰图
          const rosePlot = new Rose('AreaG2', {
            data,
            xField: 'type',
            yField: 'value',
            isGroup: true,
            // 当 isGroup 为 true 时，该值为必填
            seriesField: 'user',
            radius: 0.9,
            label: {
              offset: -15
            },
            interactions: [
              {
                type: 'element-active'
              }
            ]
          });

          rosePlot.render();
        });
    };
    onMounted(() => {
      nextTick(() => {
        AreaG2();
      });
    });
  }
};
</script>
<style scoped>
#AreaG2 {
  height: 35vh;
}
</style>