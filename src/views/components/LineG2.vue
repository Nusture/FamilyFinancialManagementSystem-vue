<template>
  <div class="Line">
    <div id="LineG2"></div>
  </div>
</template>
<script>
import { Liquid } from '@antv/g2plot';
import { nextTick, onMounted } from '@vue/runtime-core';
export default {
  setup() {
    const data = [
      {
        name: '我',
        year: '2010',
        gdp: 3000
      },
      {
        name: '我',
        year: '2011',
        gdp: 3500
      },
      {
        name: '我',
        year: '2012',
        gdp: 4500
      },
      {
        name: '我',
        year: '2013',
        gdp: 4000
      },
      {
        name: '我',
        year: '2014',
        gdp: 12000
      },
      {
        name: '我',
        year: '2015',
        gdp: 5000
      },
      {
        name: '我',
        year: '2016',
        gdp: 5000
      },
      {
        name: '我',
        year: '2017',
        gdp: 15000
      },
      {
        name: '我',
        year: '2018',
        gdp: 15000
      },
      {
        name: '我',
        year: '2019',
        gdp: 15000
      },
      {
        name: '我',
        year: '2020',
        gdp: 12000
      },
      {
        name: '我',
        year: '2021',
        gdp: 5000
      },

      {
        name: '爸爸',
        year: '2010',
        gdp: 4000
      },
      {
        name: '爸爸',
        year: '2011',
        gdp: 400
      },
      {
        name: '爸爸',
        year: '2012',
        gdp: 3000
      },
      {
        name: '爸爸',
        year: '2013',
        gdp: 4000
      },
      {
        name: '爸爸',
        year: '2014',
        gdp: 3500
      },
      {
        name: '爸爸',
        year: '2015',
        gdp: 4000
      },
      {
        name: '爸爸',
        year: '2016',
        gdp: 4500
      },
      {
        name: '爸爸',
        year: '2017',
        gdp: 5000
      },
      {
        name: '爸爸',
        year: '2018',
        gdp: 5000
      },
      {
        name: '爸爸',
        year: '2019',
        gdp: 5500
      },
      {
        name: '爸爸',
        year: '2020',
        gdp: 3200
      },
      {
        name: '爸爸',
        year: '2021',
        gdp: 5000
      }
    ];
    const lineG2 = () => {
      const liquidPlot = new Liquid('LineG2', {
        percent: 0.25,
        outline: {
          border: 4,
          distance: 8
        },
        wave: {
          length: 128
        }
      });
      liquidPlot.render();
    };
    onMounted(() => {
      nextTick(() => {
        lineG2();
      });
    });
  }
};
</script>
<style scoped>
.Line {
  /* border: 1px solid red; */
}
#LineG2 {
  height: 35vh;
  /* border: 1px solid red;
  width: 50%; */
}
</style>