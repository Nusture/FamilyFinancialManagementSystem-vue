<template>
  <div class="Dashboard">
    <el-row :gutter="10">
      <el-col :span="6">
        <div class="topleft">
          <el-card class="box-card">
            <div class="title">{{$t('家庭信息')}}</div>
            <div class="content">
              <el-row :gutter="10">
                <el-col :span="12">
                  <div class="content_div" style="margin-bottom:10px">
                    <span>{{$t('家庭码')}}</span>
                    <span>{{familyCode}}</span>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="content_div" style="margin-bottom:10px">
                    <span>{{$t('余额')}}</span>
                    <el-popover v-model:visible="visible" placement="right" width="300" trigger="click">
                      <el-input v-model="fullMoney" type="number" />
                      <div style="text-align: right; margin-top: 5px">
                        <el-button size="mini" type="text" @click="visible = false">{{ $t('取消') }}</el-button>
                        <el-button type="primary" size="mini" @click="tagNameUpdate">{{ $t('保存') }}</el-button>
                      </div>
                      <template #reference>
                        <span @click="visible = true">{{money}}</span>
                      </template>
                    </el-popover>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="content_div">
                    <span>{{$t('今日收入')}}</span>
                    <span>{{income}}</span>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="content_div">
                    <span>{{$t('今日支出')}}</span>
                    <span>{{cost}}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="bottomright">
          <el-card class="box-card">
            <div class="title">各支出类别比例</div>
            <Line />
          </el-card>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="bottomright">
          <el-card class="box-card">
            <div class="title">各收入类别比例</div>
            <Liquid />
          </el-card>
        </div>
      </el-col>

      <el-col :span="6">
        <div class="topright">
          <el-card class="box-card">
            <div class="title">家庭成员收支情况</div>
            <Column />
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="bottomright">
          <el-card class="box-card">
            <div class="title">{{$t('家庭成员收入类别情况')}}</div>
            <Area />
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="bottomleft">
          <el-card class="box-card">
            <div class="title">{{$t('家庭成员支出类别情况')}}</div>
            <Pie />
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="bottomright">
          <el-card class="box-card">
            <div class="title">{{$t('收支条目词云')}}</div>
            <WordCloud />
          </el-card>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="bottomright">
          <el-card class="box-card">
            <div class="title" style="margin-bottom: 15px">
              {{$t('收支提交记录')}}
              <div style="text-align:right;float:right">
                <el-select v-model="year" placeholder="请选择年度" style="width:200px;" filterable clearable @change="getdata">
                  <el-option v-for="item in yearlist" :label="item" :value="item" />
                </el-select>
              </div>
            </div>
            <CommitRecord v-if="chartdata.length > 0" :chartdata="chartdata" />
          </el-card>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="topleft">
          <el-card class="box-card">
            <div class="title">{{$t('收入支出趋势')}}</div>
            <Funnel />
          </el-card>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="bottomright">
          <el-card class="box-card">
            <div class="title">{{$t('资产变化情况')}}</div>
            <MoneyChange />
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
import { gettoday, familyInfo, changeMoney, commitRecord } from '@/api/index';
import { onMounted } from '@vue/runtime-core';
import { ElMessage } from 'element-plus';
import { getToken } from '@/utils/auth';
// import { reactive } from 'vue';
export default {
  name: 'dashboard',
  components: { Line, Column, Pie, Area, CommitRecord, cardDragger, Funnel, Liquid, WordCloud, MoneyChange },
  setup() {
    const state = reactive({
      drag: false,
      year: '2021',
      yearlist: [],
      familyCode: '',
      money: '',
      fullMoney: '',
      income: '',
      cost: '',
      visible: false,
      chartdata: {}
    });
    const tagNameUpdate = () => {
      changeMoney({ money: state.fullMoney }).then(res => {
        if (res.code === 200) {
          ElMessage.success('修改成功');
          state.visible = false;
          family();
        } else {
          ElMessage.error(res.msg);
        }
      });
    };
    const family = () => {
      familyInfo().then(res => {
        state.money = res.data.money;
        state.fullMoney = res.data.fullMoney
        state.familyCode = res.data.familyCode;
      });
    };
    const year = () => {
      const data = new Date();
      state.yearlist.push(
        JSON.stringify(data.getFullYear()),
        JSON.stringify(data.getFullYear() - 1),
        JSON.stringify(data.getFullYear() - 2)
      );
    };
    const getdata = async () => {
      state.chartdata = [];
      const { data } = await commitRecord({ token: getToken(), year: state.year });
      if (data) {
        state.chartdata = data;
      }
    };
    onMounted(() => {
      family();
      year();
      getdata();
      gettoday().then(res => {
        state.cost = res.data.todayCost;
        state.income = res.data.todayIncome;
      });
    });
    return {
      ...toRefs(state),
      tagNameUpdate,
      getdata
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
  .title {
    margin-bottom: 10px;
    color: #64b5f6;
    font-size: 24px;
  }
  .content {
    width: 100%;
    height: 200px;
    .el-col {
      padding: 0;
      margin: 0;
    }
    .content_div {
      height: 80px;
      background: #f8f8f8;
      border-radius: 5px;
      span {
        display: block;
      }
      span:first-child {
        padding-top: 10px;
        height: 30px;
        line-height: 30px;
        text-indent: 20px;
      }
      span:last-child {
        font-size: 24px;
        height: 40px;
        line-height: 40px;
        text-indent: 20px;
      }
    }
  }
  // .bottomright,
  // .toplef,
  // .topright {
  //   margin: 15px 10px;
  // }
}
</style>
