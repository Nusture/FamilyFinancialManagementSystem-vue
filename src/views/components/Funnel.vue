<template>
  <div id="Funnel" v-loading="loading" style="height: 200px"></div>
</template>
<script>
import { Line } from '@antv/g2plot';
import { getFunnel } from '@/api/index';
import { nextTick, onMounted, reactive, toRefs } from '@vue/runtime-core';
import { getToken } from '@/utils/auth';
import { ElMessage } from 'element-plus';
export default {
  setup() {
    const state = reactive({
      loading: false
    })
    const init = data => {
      const linePlot = new Line('Funnel', {
        data,
        xField: 'year',
        yField: 'money',
        seriesField: 'name',
        // yAxis: {
        //   label: {
        //     formatter: v => `${(v / 10e8).toFixed(1)} B`
        //   }
        // },
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
    const datalist = async () => {
      state.loading = true
      await getFunnel({ token: getToken() }).then(res => {
        if(res.code === 200) {
          state.loading = false
        init(res.data);
        } else {
          ElMessage.warning('当前网络延迟较高')
        }
      }).catch(() =>{
        state.loading = false
      });
    };
    onMounted(() => {
      nextTick(() => {
        datalist();
      });
    });
    return {
      ...toRefs(state)
    };
  }
};
</script>
<style lang='scss'>
</style>
