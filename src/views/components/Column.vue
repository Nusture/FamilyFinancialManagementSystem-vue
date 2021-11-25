<template>
  <div class="Column">
    <div id="ColumnG2"></div>
  </div>
</template>
<script>
import { Column } from '@antv/g2plot';
import { nextTick, onMounted } from '@vue/runtime-core';
export default {
  setup() {
    const data = [
      { city: '2014', type: '我', value: 14500 },
      { city: '2014', type: '爸爸', value: 8500 },
      { city: '2014', type: '妈妈', value: 10000 },
      { city: '2014', type: '姐姐', value: 7000 },
      { city: '2015', type: '我', value: 9000 },
      { city: '2015', type: '爸爸', value: 8500 },
      { city: '2015', type: '妈妈', value: 11000 },
      { city: '2015', type: '姐姐', value: 6000 },
      { city: '2016', type: '我', value: 16000 },
      { city: '2016', type: '爸爸', value: 5000 },
      { city: '2016', type: '妈妈', value: 6000 },
      { city: '2016', type: '姐姐', value: 10000 },
      { city: '2017', type: '我', value: 14000 },
      { city: '2017', type: '爸爸', value: 9000 },
      { city: '2017', type: '妈妈', value: 10000 },
      { city: '2017', type: '姐姐', value: 9000 },
      { city: '2018', type: '我', value: 14000 },
      { city: '2018', type: '爸爸', value: 9000 },
      { city: '2018', type: '妈妈', value: 10000 },
      { city: '2018', type: '姐姐', value: 6000 },
      { city: '2019', type: '我', value: 9000 },
      { city: '2019', type: '爸爸', value: 8500 },
      { city: '2019', type: '妈妈', value: 10000 },
      { city: '2019', type: '姐姐', value: 6000 },
      { city: '2020', type: '我', value: 17000 },
      { city: '2020', type: '爸爸', value: 6000 },
      { city: '2020', type: '妈妈', value: 7000 },
      { city: '2020', type: '姐姐', value: 10000 },
      { city: '2021', type: '我', value: 18000 },
      { city: '2021', type: '爸爸', value: 11000 },
      { city: '2021', type: '妈妈', value: 15000 },
      { city: '2021', type: '姐姐', value: 14000 }
    ];
    const ColumnG2 = () => {
      const column = new Column('ColumnG2', {
        data,
        xField: 'city',
        yField: 'value',
        seriesField: 'type',
        isGroup: 'true',
        columnStyle: {
          radius: [20, 20, 0, 0]
        }
      });

      column.render();
    };
    onMounted(() => {
      nextTick(() => {
        ColumnG2();
      });
    });
  }
};
</script>
<style scoped>
#ColumnG2 {
  height: 35vh;
}
</style>