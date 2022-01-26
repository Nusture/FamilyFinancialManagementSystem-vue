<template>
  <div class="Line">
    <div v-loading="loading" style="height:200px;">
      <el-progress
        v-for="(item,index) in datalist"
        :key="index"
        type="circle"
        :width="radius"
        :percentage="item.value"
        style="margin:20px 0px 0px 20px"
      >
        <template #default="{ percentage }">
          <span class="percentage-value">{{ (percentage*100).toFixed(2) }}%</span>
          <span class="percentage-label">{{item.type}}</span>
        </template>
      </el-progress>
    </div>
  </div>
</template>
<script>
import { Liquid } from '@antv/g2plot';
import { nextTick, onMounted, reactive, toRefs } from '@vue/runtime-core';
import { incomeByTypeWater } from '@/api/index';
import { getToken } from '@/utils/auth';
import { ElMessage } from 'element-plus';
export default {
  props: ['radius'],
  setup(props) {
    const state = reactive({
      loading: false,
      datalist: [],
      radius: null
    });
    // const lineG2 = data => {
    //   const liquidPlot = new Liquid('Liquid', {
    //     percent: 0.25,
    //     outline: {
    //       border: 4,
    //       distance: 8
    //     },
    //     wave: {
    //       length: 128
    //     }
    //   });
    //   liquidPlot.render();
    // };
    onMounted(() => {
      state.loading = true;
      state.radius = props.radius;
      incomeByTypeWater({ token: getToken() })
        .then(res => {
          if (res.code === 200) {
            state.loading = false;
            state.datalist = res.data;
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
.percentage-value {
  display: block;
  margin-top: 5px;
  font-size: 16px;
}

.percentage-label {
  display: block;
  margin-top: 5px;
  font-size: 12px;
}
</style>