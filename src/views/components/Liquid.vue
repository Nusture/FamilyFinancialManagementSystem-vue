<template>
  <div class="Line">
    <div id="Liquid" v-loading="loading" style="height:200px"></div>
  </div>
</template>
<script>
import { Liquid } from '@antv/g2plot';
import { nextTick, onMounted, reactive, toRefs } from '@vue/runtime-core';
import { incomeByTypeWater } from '@/api/index';
import { getToken } from '@/utils/auth';
import { ElMessage } from 'element-plus';
export default {
  setup() {
    const state = reactive({
      loading: false
    });
    const lineG2 = data => {
      const liquidPlot = new Liquid('Liquid', {
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
      state.loading = true;
      incomeByTypeWater({ token: getToken() })
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
.Line {
  /* border: 1px solid red; */
}
#LineG2 {
  height: 35vh;
  /* border: 1px solid red;
  width: 50%; */
}
</style>