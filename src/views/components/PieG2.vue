<template>
  <div class="PieG2">
    <div id="PieG2" v-loading="loading" style="height: 200px"></div>
  </div>
</template>
<script>
import { Rose } from '@antv/g2plot';
import { onMounted, reactive, toRefs } from '@vue/runtime-core';
import { getToken } from '@/utils/auth';
import { getOutlay } from '@/api/index';
import { ElMessage } from 'element-plus';
export default {
  setup() {
    const state = reactive({
      loading: false
    });
    const PieG2 = data => {
      // 分组玫瑰图
      const rosePlot = new Rose('PieG2', {
        data,
        xField: 'type',
        yField: 'money',
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
    };
    onMounted(() => {
      state.loading = true;
      getOutlay({ token: getToken() })
        .then(res => {
          if (res.code === 200) {
            state.loading = false;
            PieG2(res.data);
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
#PieG2 {
  height: 35vh;
}
</style>