<template>
  <div class="Family">
    <div class="search">
      <el-form label-width="80px" :inline="true" :model="formLabelAlign">
        <el-row>
          <el-col :span="8">
            <el-form-item label="用户">
              <el-input v-model="formLabelAlign.username" placeholder="请输入用户名" clearable style="width:100%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电话">
              <el-input v-model="formLabelAlign.phone" placeholder="请输入电话" clearable style="width:100%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="性别">
              <el-select v-model="formLabelAlign.gender" placeholder="请选择性别" style="width:100%" filterable clearable>
                <el-option label="男" :value="0" />
                <el-option label="男女" :value="1" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item>
              <el-button type="primary" @click="resetForm">重置</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮箱">
              <el-input v-model="formLabelAlign.email" placeholder="请输入邮箱" clearable style="width:100%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="地址">
              <el-input v-model="formLabelAlign.address" placeholder="请输入地址" clearable style="width:100%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="出生日期">
              <el-date-picker v-model="formLabelAlign.birth" clearable placeholder="请选择日期" type="date" format="YYYY-MM-DD" style="235排序" />
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item>
              <el-button type="primary" @click="getdatalist">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="Family_info">
      <!-- <div class="Family_code">
        <span>家庭码</span>
        <span>{{familyCode}}</span>
      </div>
      <div class="Family_money">
        <span>余额</span>
      </div>-->
    </div>
    <div class="Family_member">
      <el-table :data="tableData" v-loading="loading" style="width: 100%" border stripe fit highlight-current-row>
        <el-table-column prop="id" label="编号" width="80" align="center" />
        <el-table-column prop="username" label="用户" width="150" align="center" />
        <el-table-column prop="phone" label="电话" width="150" align="center" />
        <el-table-column prop="familyCode" label="家庭码" width="150" align="center" />
        <el-table-column label="创建时间" width="150" align="center">
          <template v-slot="scope">{{scope.row.createTime.substr(0,10)}}</template>
        </el-table-column>
        <el-table-column prop="gender" label="性别" width="150" align="center"></el-table-column>
        <el-table-column prop="address" label="地址" align="center" />
        <el-table-column prop="email" label="邮箱" width="150" align="center" />
        <el-table-column prop="signature" label="简介" align="center" />
        <!-- <el-table-column label="操作" align="center" width="150">
          <template v-slot="scope">
            <el-button type="success" size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>-->
      </el-table>
      <div style="text-align: center">
        <pagination :total="total" :page="formLabelAlign.currentPage" :limit="formLabelAlign.pageSize" @pagination="getList" />
      </div>
    </div>
  </div>
</template>
<script>
import { familyInfo, familyMember } from '@/api/index';
import { reactive, toRefs } from '@vue/reactivity';
import { nextTick, onMounted } from '@vue/runtime-core';
import Pagination from '@/components/Pagination/index.vue';
export default {
  name: 'Family',
  components: { Pagination },
  setup() {
    const state = reactive({
      familyCode: '',
      money: '',
      tableData: [],
      loading: false,
      total: 0,
      formLabelAlign: {
        username: '',
        phone: '',
        currentPage: 1,
        pageSize: 5,
        gender: '',
        address: '',
        email: '',
        birth: ''
      }
    });
    // 获取家庭信息
    const getdatalist = () => {
      familyInfo().then(res => {
        state.familyCode = res.data.familyCode;
        state.money = res.data.money;
      });
      const param = {
        username: state.formLabelAlign.username,
        phone: state.formLabelAlign.phone,
        currentPage: state.formLabelAlign.currentPage,
        pageSize: state.formLabelAlign.pageSize,
        gender: state.formLabelAlign.gender,
        address: state.formLabelAlign.address,
        email: state.formLabelAlign.email,
        birth: state.formLabelAlign.birth
      };
      state.loading = true;
      familyMember(param)
        .then(res => {
          if (res.code === 200) {
            state.tableData = res.data.userList;
            state.total = res.data.totalCount;
            state.loading = familyCode;
          }
        })
        .catch(() => {
          state.loading = false;
        });
    };
    const getList = page => {
      state.formLabelAlign.currentPage = page.page;
      state.formLabelAlign.pageSize = page.limit;
      getdatalist();
    };
    const TimeValue = value => {
      console.log(value.getFullYear(), 'value');
    };
    // 重置
    const resetForm = () => {
      state.formLabelAlign.username = '';
      state.formLabelAlign.phone = '';
      state.formLabelAlign.currentPage = 1;
      state.formLabelAlign.pageSize = 5;
      state.formLabelAlign.gender = null;
      state.formLabelAlign.address = '';
      state.formLabelAlign.email = '';
      state.formLabelAlign.birth = '';
      getdatalist()
    };
    onMounted(() => {
      nextTick(() => {
        getdatalist();
      });
    });
    return {
      ...toRefs(state),
      getdatalist,
      getList,
      TimeValue,
      resetForm
    };
  }
};
</script>


<style lang="scss">
.Family {
  height: calc(100vh - 200px);
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
  }
  .Family_member {
    margin: 15px;
    padding: 15px;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.07);
    border: 1px solid #e7e8f2;
    border-radius: 3px;
  }
}
</style>
