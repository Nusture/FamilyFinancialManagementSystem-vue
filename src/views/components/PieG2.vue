<template>
  <div class="PieG2">
    <div id="PieG2"></div>
  </div>
</template>
<script>
import { Pie } from '@antv/g2plot';
import { onMounted } from '@vue/runtime-core';
export default {
  setup() {
    const data = [
      { type: '我', value: 27 },
      { type: '爸爸', value: 25 },
      { type: '妈妈', value: 18 },
      { type: '姐姐', value: 15 },
      { type: '其他', value: 5 }
    ];
    const PieG2 = () => {
      const piePlot = new Pie('PieG2', {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,

        label: {
          type: 'outer',
          labelHeight: 28,
          content: '{name}:{value}'
        },
        // label: {
        //   type: 'outer'
        // },
        interactions: [{ type: 'element-active' }]
      });

      piePlot.render();
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