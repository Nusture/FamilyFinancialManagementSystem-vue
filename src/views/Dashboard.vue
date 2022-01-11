<template>
  <div class="Dashboard">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="topleft">
          <el-card class="box-card">
            <div class="title">收支趋势</div>
            <!-- 趋势折线图 -->
            <Funnel />
          </el-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="topright">
          <el-card class="box-card">
            <div class="title">各用户支出收入</div>
            <!-- 堆叠玫瑰图 -->
            <Column />
          </el-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="bottomleft">
          <el-card class="box-card">
            <div class="title">支出类别统计</div>
            <!-- 分组玫瑰图 -->
            <Pie />
          </el-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="bottomright">
          <el-card class="box-card">
            <div class="title">支出类别统计</div>
            <!-- 分组玫瑰图 -->
            <Area />
          </el-card>
        </div>
      </el-col>
       <el-col :span="12">
        <div class="bottomright">
          <el-card class="box-card">
            <div class="title">支出类别统计</div>
            <!-- 水波图 -->
            <Line />
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Line from './components/LineG2.vue';
import Column from './components/Column.vue';
import Pie from './components/PieG2.vue';
import Area from './components/AreaG2.vue';
import Funnel from './components/Funnel.vue'
// import Funnel from './components/Funnel.vue'
import { cardDragger } from 'carddragger';
import { reactive, toRefs } from '@vue/reactivity';
// import { reactive } from 'vue';
export default {
  name: 'dashboard',
  components: { Line, Column, Pie, Area, cardDragger,Funnel },
  setup() {
    const state = reactive({
      drag: false
    });
    return {
      ...toRefs(state)
    };
  }
};
</script>

<style scoped>
.Dashboard{
  height: 100vh;
  overflow: auto;
}
.topleft {
  /* height: 30vh; */
  /* border: 1px solid red; */
  /* width: 10%; */
  margin-bottom: 15px;
}
.topright {
  /* width: 50%; */
  margin-bottom: 15px;
}
.title {
  /* border: 1px solid red; */
  text-align: center;
  font-size: 14px;
}
</style>
