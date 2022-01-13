<template>
  <div class="Column">
    <div id="ColumnG2" v-loading="loading" style="height: 200px"></div>
  </div>
</template>
<script>
import { Rose } from '@antv/g2plot';
import { nextTick, onMounted, reactive, toRefs } from '@vue/runtime-core';
import { getRose } from '@/api/index';
import { getToken } from '@/utils/auth';
import { ElMessage } from 'element-plus';
export default {
  setup() {
    const state = reactive({
      loading: false
    });
    const ColumnG2 = data => {
      // 堆叠玫瑰图
      const rosePlot = new Rose('ColumnG2', {
        data,
        xField: 'user',
        yField: 'money',
        isStack: true,
        // 当 isStack 为 true 时，该值为必填
        seriesField: 'type',
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
    };
    onMounted(() => {
      nextTick(() => {
        state.loading = true;
        getRose({ token: getToken() })
          .then(res => {
            if (res.code === 200) {
              state.loading = false;
              ColumnG2(res.data);
            } else {
              ElMessage.warning('当前网络延迟较高');
            }
          })
          .catch(() => {
            state.loading = false;
          });
      });
    });
    return {
      ...toRefs(state)
    };
  }
};
</script>
<style scoped>
#ColumnG2 {
  height: 35vh;
}
</style>