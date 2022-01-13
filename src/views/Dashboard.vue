<template>
  <div class="Dashboard">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="topleft">
          <el-card class="box-card">
            <div class="title">{{$t('收支趋势')}}</div>
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
            <div class="title">收入类别统计</div>
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
      <el-col :span="12">
        <div class="bottomright">
          <el-card class="box-card">
            <div class="title">收入类别统计</div>
            <!-- 水波图 -->
            <Liquid />
          </el-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="bottomright">
          <el-card class="box-card">
            <div class="title">收入类别统计</div>
            <!-- 水波图 -->
            <WordCloud />
          </el-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="bottomright">
          <el-card class="box-card">
            <div class="title">总资产变化</div>
            <!-- 水波图 -->
            <MoneyChange />
          </el-card>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="bottomright">
          <el-card class="box-card">
            <div class="title">总资产变化</div>
            <!-- 水波图 -->
            <CommitRecord />
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
import Funnel from './components/Funnel.vue';
import Liquid from './components/Liquid.vue';
import WordCloud from './components/wordCloud.vue';
import MoneyChange from './components/moneyChange.vue';
import CommitRecord from './components/commitRecord.vue';
import { cardDragger } from 'carddragger';
import { reactive, toRefs } from '@vue/reactivity';
// import { reactive } from 'vue';
export default {
  name: 'dashboard',
  components: { Line, Column, Pie, Area, CommitRecord, cardDragger, Funnel, Liquid, WordCloud, MoneyChange },
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

<style lang="scss">
.Dashboard {
  // height: calc(100vh - 120px);
  // width: 98%;
  // overflow: auto;
  .el-row {
    margin: 0;
    padding: 0;
  }
  .el-col {
    margin: 0;
    padding: 0;
    margin-bottom: 15px;
  }
  .title{
    margin-bottom: 10px;
  }
  // .bottomright,
  // .toplef,
  // .topright {
  //   margin: 15px 10px;
  // }
}
</style>
