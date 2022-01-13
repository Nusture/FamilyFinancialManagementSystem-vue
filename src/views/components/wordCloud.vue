<template>
  <div class="WordCloud">
    <div id="WordCloud" v-loading="loading" style="height: 200px"></div>
  </div>
</template>
<script>
import { WordCloud } from '@antv/g2plot';
import { nextTick, onMounted, reactive, toRefs } from '@vue/runtime-core';
import { wordCloud } from '@/api/index';
import { getToken } from '@/utils/auth';
import { ElMessage } from 'element-plus';
export default {
  setup() {
    const state = reactive({
      loading: false
    });
    const AreaG2 = data => {
      const wordCloud = new WordCloud('WordCloud', {
        data,
        wordField: 'value',
        weightField: 'name',
        colorField: 'name',
        wordStyle: {
          fontFamily: 'Verdana',
          fontSize: [8, 32],
          rotation: 0
        },
        // 返回值设置成一个 [0, 1) 区间内的值，
        // 可以让每次渲染的位置相同（前提是每次的宽高一致）。
        random: () => 0.5
      });

      wordCloud.render();
    };
    onMounted(() => {
      state.loading = true;
      wordCloud({ token: getToken() })
        .then(res => {
          if (res.code === 200) {
            state.loading = false;
            nextTick(() => {
              AreaG2(res.data);
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
.WordCloud {
}
</style>