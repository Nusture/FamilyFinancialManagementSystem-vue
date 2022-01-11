<template>
  <div class="PieG2">
    <div id="PieG2"></div>
  </div>
</template>
<script>
import { Rose } from '@antv/g2plot';
import { onMounted } from '@vue/runtime-core';
export default {
  setup() {
    const PieG2 = () => {
      fetch('https://gw.alipayobjects.com/os/antfincdn/XcLAPaQeeP/rose-data.json')
        .then(data => data.json())
        .then(data => {
          // 分组玫瑰图
          const rosePlot = new Rose('PieG2', {
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
      PieG2();
    });
  }
};
</script>
<style scoped>
#PieG2 {
  height: 35vh;
}
</style>