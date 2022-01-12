<template>
  <div class="moneyChange">
    <div id="moneyChange" v-loading="loading" style="height:200px"></div>
  </div>
</template>
<script>
import { Area } from '@antv/g2plot';
import { nextTick, onMounted, reactive, toRefs } from '@vue/runtime-core';
import { moneyChange } from '@/api/index';
import { getToken } from '@/utils/auth';
import { ElMessage } from 'element-plus';
export default {
  setup() {
    const state = reactive({
      loading: false
    });
    const lineG2 = data => {
      const area = new Area('moneyChange', {
        data,
        xField: 'date',
        yField: 'money',
        xAxis: {
          tickCount: 5
        },
        animation: false,
        slider: {
          start: 0.1,
          end: 0.9,
          trendCfg: {
            isArea: true
          }
        }
      });
      area.render();
    };
    onMounted(() => {
      state.loading = true;
      moneyChange({ token: getToken() })
        .then(res => {
          if (res.code === 200) {
            state.loading = false;
            nextTick(() => {
              lineG2(res.data);
            });
          } else {
            ElMessage.warning('当前网络延迟较高');
          }
        })
        .catch(() => {
          state.loading = false;
        });
    });
    return {
      ...toRefs(state)
    };
  }
};
</script>
<style scoped>
</style>