<template>
  <div class="AreaG2">
    <div id="AreaG2"></div>
  </div>
</template>
<script>
import { Area } from '@antv/g2plot';
import { nextTick, onMounted } from '@vue/runtime-core';
export default {
  setup() {
    const data = [
      {
        country: '我',
        year: '1750',
        value: 502
      },
      {
        country: '我',
        year: '1800',
        value: 635
      },
      {
        country: '我',
        year: '1850',
        value: 809
      },
      {
        country: '我',
        year: '1900',
        value: 947
      },
      {
        country: '我',
        year: '1950',
        value: 1402
      },
      {
        country: '我',
        year: '1999',
        value: 3634
      },
      {
        country: '我',
        year: '2050',
        value: 5268
      },
      {
        country: '爸爸',
        year: '1750',
        value: 106
      },
      {
        country: '爸爸',
        year: '1800',
        value: 107
      },
      {
        country: '爸爸',
        year: '1850',
        value: 111
      },
      {
        country: '爸爸',
        year: '1900',
        value: 133
      },
      {
        country: '爸爸',
        year: '1950',
        value: 221
      },
      {
        country: '爸爸',
        year: '1999',
        value: 767
      },
      {
        country: '爸爸',
        year: '2050',
        value: 1766
      },
      {
        country: '妈妈',
        year: '1750',
        value: 163
      },
      {
        country: '妈妈',
        year: '1800',
        value: 203
      },
      {
        country: '妈妈',
        year: '1850',
        value: 276
      },
      {
        country: '妈妈',
        year: '1900',
        value: 408
      },
      {
        country: '妈妈',
        year: '1950',
        value: 547
      },
      {
        country: '妈妈',
        year: '1999',
        value: 729
      },
      {
        country: '妈妈',
        year: '2050',
        value: 628
      },

      {
        country: '姐姐',
        year: '1750',
        value: 263
      },
      {
        country: '姐姐',
        year: '1800',
        value: 303
      },
      {
        country: '姐姐',
        year: '1850',
        value: 215
      },
      {
        country: '姐姐',
        year: '1900',
        value: 522
      },
      {
        country: '姐姐',
        year: '1950',
        value: 547
      },
      {
        country: '姐姐',
        year: '1999',
        value: 563
      },
      {
        country: '姐姐',
        year: '2050',
        value: 418
      }
    ];
    const AreaG2 = () => {
      const area = new Area('AreaG2', {
        data,
        xField: 'year',
        yField: 'value',
        seriesField: 'country',
        color: ['#82d1de', '#cb302d', '#e3ca8c', '#56B185'],
        areaStyle: {
          fillOpacity: 0.7
        },
        appendPadding: 10,
        isPercent: true,
        yAxis: {
          label: {
            formatter: value => {
              return value * 100;
            }
          }
        },
        pattern: {
          type: 'line'
        }
      });
      area.render();
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