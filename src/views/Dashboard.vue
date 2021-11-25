<template>
  <div class="Dashboard">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="topleft">
          <el-card class="box-card">
            <div class="title">近十年支出概览</div>
            <Line />
          </el-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="topright">
          <el-card class="box-card">
            <div class="title">近十年支出概览</div>
            <Column />
          </el-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="bottomleft">
          <el-card class="box-card">
            <div class="title">近十年支出概览</div>
            <Pie />
          </el-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="bottomright">
          <el-card class="box-card">
            <div class="title">近十年支出概览</div>
            <Area />
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
// import { reactive } from 'vue';
export default {
  name: 'dashboard',
  components: { Line, Column, Pie, Area },
  setup() {
    return {};
  }
};
</script>

<style scoped>
.topleft {
  /* height: 30vh; */
  /* border: 1px solid red; */
  /* width: 10%; */
}
.topright {
  /* width: 50%; */
}
.title {
  /* border: 1px solid red; */
  text-align: center;
  font-size: 14px;
}
</style>
