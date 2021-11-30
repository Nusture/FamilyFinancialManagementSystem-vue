<template>
  <div class="userRole">
    <div class="crumbs">
      <div class="crumbs_title">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="fa fa-money"></i> 资产明细
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="crumbs_btn">
        <el-button type="primary" size="small" @click="dialogVisible = true">添加家庭成员</el-button>
      </div>
    </div>
    <div class="container">
      <el-tabs v-model="value">
        <el-tab-pane v-for="(item,index) in userlist" :label="item.role" :name="item.role">
          <div class="outlay">
            <span>资产支出明细</span>
            <el-table :data="tableData" style="width: 100%" max-height="250">
              <el-table-column type="expand">
                <template #default="props">
                  <p>{{ props.row.love }}</p>
                  <p>{{ props.row.borrow }}</p>
                  <p>{{ props.row.lose }}</p>
                  <p>{{ props.row.game }}</p>
                </template>
              </el-table-column>
              <el-table-column type="selection" width="55" align="center" />
              <template v-for="(item, index) in tableHead">
                <el-table-column :label="item.column_comment" :prop="item.column_name" align="center"></el-table-column>
              </template>
              <el-table-column fixed="right" :label="$t('userManage.operate')" align="center">
                <template #default="scope">
                  <el-button size="mini" type="text" icon="el-icon-edit" @click="edit(scope.row,scope.$index)">{{$t('userManage.edit')}}</el-button>
                  <el-button
                    size="mini"
                    type="text"
                    icon="el-icon-delete"
                    @click="remove(scope.row,scope.$index)"
                  >{{$t('userManage.delete')}}</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="outlay_btn">
              <el-button size="small" type="primary">录入数据</el-button>
            </div>
          </div>
          <div class="income">
            <span>资产收入明细</span>
            <el-table :data="tableData2" style="width: 100%" max-height="250">
              <el-table-column type="expand">
                <template #default="props">
                  <p>{{ props.row.love }}</p>
                  <p>{{ props.row.borrow }}</p>
                  <p>{{ props.row.lose }}</p>
                  <p>{{ props.row.game }}</p>
                </template>
              </el-table-column>
              <el-table-column type="selection" width="55" align="center" />
              <template v-for="(item, index) in tableHead2">
                <el-table-column :label="item.column_comment" :prop="item.column_name" align="center"></el-table-column>
              </template>
              <el-table-column fixed="right" :label="$t('userManage.operate')" align="center">
                <template #default="scope">
                  <el-button size="mini" type="text" icon="el-icon-edit" @click="edit(scope.row,scope.$index)">{{$t('userManage.edit')}}</el-button>
                  <el-button
                    size="mini"
                    type="text"
                    icon="el-icon-delete"
                    @click="remove(scope.row,scope.$index)"
                  >{{$t('userManage.delete')}}</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="outlay_btn">
              <el-button size="small" type="primary">录入数据</el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div>
      <el-dialog v-model="dialogVisible" title="添加成员" width="40%">
        <el-input v-model="valuename"></el-input>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="addrole">确定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs } from 'vue';
export default {
  name: 'tabs',
  setup() {
    const state = reactive({
      value: '我',
      dialogVisible: false,
      valuename: '',
      userlist: [
        { role: '我', value: 'first' },
        { role: '爸爸', value: 'two' },
        { role: '妈妈', value: 'three' },
        { role: '姐姐', value: 'four' }
      ],
      tableHead: [
        { column_name: 'date', column_comment: '日期' },
        { column_name: 'food', column_comment: '伙食' },
        { column_name: 'shopping', column_comment: '购物' },
        { column_name: 'Internet', column_comment: '互联网' },
        { column_name: 'goout', column_comment: '出行' },
        { column_name: 'doctor', column_comment: '医疗' },
        { column_name: 'amuse', column_comment: '娱乐' },
        { column_name: 'other', column_comment: '其他' },
        { column_name: 'addup', column_comment: '合计' }
      ],
      tableData: [
        {
          date: '2018',
          food: '12000',
          shopping: '5000',
          Internet: '2000',
          goout: '1500',
          doctor: '1000',
          amuse: '3000',
          other: '1000',
          addup: '25500',
          love: '恋爱付出（不稳定 不计入合计）2000~4000',
          borrow: '借出金额（不稳定 不计入合计）,0~3000',
          lose: '丢失金额（不稳定 不计入合计），0~200',
          game: '游戏金额（不稳定 不计入合计），0~1500'
        },
        {
          date: '2019',
          food: '12000',
          shopping: '5000',
          Internet: '2000',
          goout: '1500',
          doctor: '1000',
          amuse: '3000',
          other: '1000',
          addup: '25500',
          love: '恋爱付出（不稳定 不计入合计）2000~4000',
          borrow: '借出金额（不稳定 不计入合计）,0~3000',
          lose: '丢失金额（不稳定 不计入合计），0~200',
          game: '游戏金额（不稳定 不计入合计），0~1500'
        },
        {
          date: '2020',
          food: '12000',
          shopping: '5000',
          Internet: '2000',
          goout: '1500',
          doctor: '1000',
          amuse: '3000',
          other: '1000',
          addup: '25500',
          love: '恋爱付出（不稳定 不计入合计）2000~4000',
          borrow: '借出金额（不稳定 不计入合计）,0~3000',
          lose: '丢失金额（不稳定 不计入合计），0~200',
          game: '游戏金额（不稳定 不计入合计），0~1500'
        },
        {
          date: '2021',
          food: '12000',
          shopping: '5000',
          Internet: '2000',
          goout: '1500',
          doctor: '1000',
          amuse: '3000',
          other: '1000',
          addup: '25500',
          love: '恋爱付出（不稳定 不计入合计）2000~4000',
          borrow: '借出金额（不稳定 不计入合计）,0~3000',
          lose: '丢失金额（不稳定 不计入合计），0~200',
          game: '游戏金额（不稳定 不计入合计），0~1500'
        }
      ],
      tableHead2: [
        { column_name: 'date', column_comment: '日期' },
        { column_name: 'salary', column_comment: '薪资' },
        { column_name: 'achievement', column_comment: '绩效' },
        { column_name: 'scholarship', column_comment: '奖学金' },
        { column_name: 'friend', column_comment: '朋友' },
        { column_name: 'parents', column_comment: '双亲' },
        { column_name: 'other', column_comment: '其他' },
        { column_name: 'addup', column_comment: '合计' }
      ],
      tableData2: [
        { date: '2018', salary: '70000', achievement: '0', scholarship: '0', friend: '0', parents: '-3000', other: '0', addup: '67000' },
        { date: '2019', salary: '80000', achievement: '0', scholarship: '0', friend: '0', parents: '-3000', other: '0', addup: '77000' },
        { date: '2020', salary: '90000', achievement: '0', scholarship: '0', friend: '0', parents: '-3000', other: '0', addup: '87000' },
        { date: '2021', salary: '100000', achievement: '0', scholarship: '0', friend: '0', parents: '-3000', other: '0', addup: '97000' }
      ]
    });
    const addrole = () => {
      const params = {
        role: state.valuename,
        value: state.valuename
      };
      state.userlist.push(params);
      state.dialogVisible = false;
    };
    return {
      ...toRefs(state),
      addrole
    };
  }
};
</script>

<style>
.message-title {
  cursor: pointer;
}
.handle-row {
  margin-top: 30px;
}
.crumbs {
  display: flex;
}
.crumbs_title {
  flex: 1;
  padding-top: 5px;
}
.crumbs_btn {
  flex: 1;
  text-align: right;
}
.outlay_btn {
  text-align: right;
  margin: 10px;
}
</style>

