<template>
  <div class="IncomeManage">
    <div class="search">
      <el-form label-width="80px" :inline="true" :model="form">
        <el-row>
          <el-col :span="5">
            <el-form-item label="收入类型">
              <el-input v-model="form.incomeType" placeholder="请输入收入类型" clearable style="width:100%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="收入时间">
              <el-input v-model="form.date" placeholder="请输入收入时间" clearable style="width:100%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="收入账号">
              <el-input v-model="form.account" placeholder="请输入收入账号" clearable style="width:100%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="收入描述">
              <el-input v-model="form.note" placeholder="请输入收入描述" clearable style="width:100%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-button type="primary" @click="getdatalist">查询</el-button>
              <el-button type="primary" @click="resetForm">重置</el-button>
              <el-button type="primary" @click="addOutlay">新增</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="IncomeManage_table">
      <el-table :data="tableData" v-loading="loading" style="width: 100%" border stripe fit highlight-current-row>
        <el-table-column prop="id" label="编号" width="80" align="center" />
        <el-table-column prop="account" label="收入账户" width="150" align="center" />
        <el-table-column prop="incomeType" label="收入类型" width="150" align="center" />
        <el-table-column prop="incomeMoney" label="收入金额" width="150" align="center" />
        <el-table-column prop="createTime" label="收入时间" width="150" align="center">
          <template v-slot="scope"><span v-if="scope.row.createTime">{{scope.row.createTime.substr(0,10)}}</span></template>
        </el-table-column>
        <el-table-column prop="familyCode" label="家庭码" width="150" align="center" />
        <el-table-column prop="note" label="支出描述" align="center" />
        <el-table-column prop="userId" label="用户编号" width="150" align="center" />
        <el-table-column label="操作" align="center" width="150">
          <template v-slot="scope">
            <el-button type="success" size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center">
        <pagination :total="total" :page="form.currentPage" :limit="form.pageSize" @pagination="getList" />
      </div>
    </div>
    <div>
      <el-dialog v-model="dialogVisible" :title="form.id ? '修改' : '新增'" width="50%">
        <div>
          <el-form label-width="80px" :model="form">
            <el-row>
              <el-col :span="12">
                <el-form-item label="支出类型">
                  <el-input v-model="form.incomeType" clearable style="width:100%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="支出金额">
                  <el-input v-model="form.money" clearable style="width:100%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="支出账户">
                  <el-input v-model="form.account" clearable style="width:100%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="支出描述">
                  <el-input v-model="form.note" clearable style="width:100%"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="submitOutlay">确认</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getIncomeList, delIncomeDetail, addIncomeDetail, getIncomeDetail } from '@/api/index';
import { reactive, toRefs } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import Pagination from '@/components/Pagination/index.vue';
import { ElMessageBox, ElMessage } from 'element-plus';
export default {
  name: 'donate',
  components: { Pagination },
  setup() {
    const state = reactive({
      form: {
        incomeType: '',
        date: '',
        account: '',
        note: '',
        currentPage: 1,
        pageSize: 5,
        id: null,
        money: ''
      },
      tableData: [],
      loading: false,
      total: 0,
      dialogVisible: false
    });
    const getdatalist = () => {
      const param = {
        incomeType: state.form.incomeType,
        date: state.form.date,
        account: state.form.account,
        note: state.form.note,
        currentPage: state.form.currentPage,
        pageSize: state.form.pageSize
      };
      state.loading = true;
      getIncomeList(param)
        .then(res => {
          state.tableData = res.data.incomeList;
          state.total = res.data.totalCount;
          state.loading = false;
        })
        .catch(() => {
          state.loading = false;
        });
    };
    // 新增
    const addOutlay = () => {
      state.dialogVisible = true;
      state.form.id = null;
      state.form.incomeType = '';
      state.form.money = '';
      state.form.note = '';
      state.form.account = '';
    };
    // 重置
    const resetForm = () =>{
      state.form.incomeType = ''
      state.form.date = ''
      state.form.account = ''
      state.form.note = ''
      getdatalist()
    }
    // 删除
    const del = row => {
      ElMessageBox.confirm(` 确定删除${row.note}相关数据?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delIncomeDetail({ id: row.id }).then(res => {
            if (res.code === 200) {
              ElMessage.success('删除成功');
              getdatalist();
            }
          });
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消删除'
          });
        });
    };
    const edit = row => {
      state.form.id = row.id;
      state.dialogVisible = true;
      getIncomeDetail({ id: row.id }).then(res => {
        state.form.incomeType = res.data.incomeType;
        state.form.money = res.data.incomeMoney;
        state.form.note = res.data.note;
        state.form.account = res.data.account;
      });
    };
    const submitOutlay = () => {
      const param = {
        id: state.form.id,
        money: state.form.money,
        incomeType: state.form.incomeType,
        account: state.form.account,
        note: state.form.note
      };
      addIncomeDetail(param).then(res => {
        if (res.code === 200) {
          ElMessage.success('修改成功');
          state.dialogVisible = false;
          state.form.incomeType = '';
          state.form.money = '';
          state.form.note = '';
          state.form.account = '';
          getdatalist();
        } else {
          ElMessage.error(res.msg);
        }
      });
    };
    const getList = page => {
      state.form.currentPage = page.page;
      state.form.pageSize = page.limit;
      getdatalist();
    };
    onMounted(() => {
      getdatalist();
    });
    return {
      ...toRefs(state),
      getdatalist,
      getList,
      del,
      edit,
      submitOutlay,
      addOutlay,
      resetForm
    };
  }
};
</script>

<style lang="scss">
.IncomeManage {
  height: calc(100vh - 140px);
  width: 100%;
  background: #fff;
  border-radius: 5px;
  padding-top: 15px;
  overflow: auto;
  .search {
    padding: 15px;
    margin: 0 15px;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.07);
    border-radius: 3px;
    border: 1px solid #e7e8f2;
     .el-col{
      .el-form-item{
        width: 95%;
        margin-bottom: 0;
      }
      .el-form-item__label{
        border: 1px solid #DCDFE6;
        border-right: none;
        height: 40px;
        background: #F5F7FA;
      }
      .el-input__inner{
        border-radius: 0px;
      }
    }
  }
  .IncomeManage_table {
    margin: 15px;
    padding: 15px;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.07);
    border: 1px solid #e7e8f2;
    border-radius: 3px;
  }
}
</style>