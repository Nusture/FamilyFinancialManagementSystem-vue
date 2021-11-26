<template>
  <div class="BaseTable">
    <div class="title">
      <span class="title_txt">{{$t('userManage.userManagemodules')}}</span>
      <span class="btn">
        <el-button type="primary" size="small" v-print="'#table'">
          <i class="fa fa-print"></i>
          {{$t('userManage.print')}}
        </el-button>
        <el-button type="primary" icon="el-icon-plus" size="small" @click="addtable">{{$t('userManage.add')}}</el-button>
      </span>
    </div>
    <div class="table" id="table">
      <el-table
        v-loading="loading"
        element-loading-text="数据加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(248, 248, 255, 1)"
        border
        :data="datalist"
        size="mini"
        max-height="400"
        highlight-current-row
        fit
      >
        <el-table-column type="selection" width="55" align="center" />
        <template v-for="(item, index) in tableHead">
          <el-table-column :label="item.column_comment" :prop="item.column_name" align="center"></el-table-column>
        </template>
        <el-table-column fixed="right" :label="$t('userManage.operate')" align="center">
          <template #default="scope">
            <el-button size="mini" type="text" icon="el-icon-edit" @click="edit(scope.row,scope.$index)">{{$t('userManage.edit')}}</el-button>
            <el-button size="mini" type="text" icon="el-icon-delete" @click="remove(scope.row,scope.$index)">{{$t('userManage.delete')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pag">
      <Pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" />
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" v-model="editVisible" width="70%">
      <el-form label-width="80px" ref="formref" :model="form" :rules="rules">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年龄" prop="age">
              <el-input v-model="form.age"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收入" prop="income">
              <el-input v-model="form.income"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="支出" prop="outlay">
              <el-input v-model="form.outlay"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="在职状态" prop="status">
              <el-input v-model="form.status"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="婚配">
              <el-input v-model="form.marry"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="毕业院校">
              <el-input v-model="form.school"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="毕业时间">
              <el-input v-model="form.graduate"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit()">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, reactive, toRefs, onMounted } from 'vue';
// import { ElMessage, ElMessageBox } from 'element-plus';
import Pagination from '../components/Pagination/index.vue';

export default {
  name: 'basetable',
  components: {
    Pagination
  },
  setup() {
    const state = reactive({
      loading: false,
      total: 10,
      editVisible: false,
      listQuery: {
        page: 1,
        limit: 10
      },
      datalist: [
        {
          id: 1,
          name: '我',
          age: '18',
          income: '1000',
          outlay: '2000',
          status: '在职',
          marry: '未婚',
          school: '九江学院',
          graduate: '2020'
        },
        {
          id: 2,
          name: '爸爸',
          age: '38',
          income: '1000',
          outlay: '2000',
          status: '在职',
          marry: '已婚',
          school: '南昌大学',
          graduate: '2020'
        },
        {
          id: 3,
          name: '妈妈',
          age: '36',
          income: '1000',
          outlay: '2000',
          status: '在职',
          marry: '已婚',
          school: '江西财经大学',
          graduate: '2020'
        },
        {
          id: 4,
          name: '姐姐',
          age: '20',
          income: '1000',
          outlay: '2000',
          status: '在职',
          marry: '未婚',
          school: '复旦大学',
          graduate: '2020'
        }
      ],
      tableHead: [
        { column_name: 'name', column_comment: '姓名' },
        { column_name: 'age', column_comment: '年龄' },
        { column_name: 'income', column_comment: '收入' },
        { column_name: 'outlay', column_comment: '支出' },
        { column_name: 'status', column_comment: '在职状态' },
        { column_name: 'marry', column_comment: '婚配' },
        { column_name: 'school', column_comment: '毕业院校' },
        { column_name: 'graduate', column_comment: '毕业时间' }
      ],
      form: {
        name: '',
        age: '',
        income: '',
        outlay: '',
        status: '',
        marry: '',
        school: '',
        graduate: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }
        ],
        age: [
          {
            required: true,
            message: '请输入年龄',
            trigger: 'blur'
          }
        ],
        income: [
          {
            required: true,
            message: '请输入收入',
            trigger: 'blur'
          }
        ],
        outlay: [
          {
            required: true,
            message: '请输入支出',
            trigger: 'blur'
          }
        ],
        status: [
          {
            required: true,
            message: '请输入在职状态',
            trigger: 'blur'
          }
        ]
      },
      editID: '',
      index: Number
    });
    const edit = (scope, index) => {
      state.index = index;
      state.editID = scope.id;
      state.editVisible = true;
      state.form.age = scope.age;
      state.form.graduate = scope.graduate;
      state.form.income = scope.income;
      state.form.marry = scope.marry;
      state.form.name = scope.name;
      state.form.school = scope.school;
      state.form.status = scope.status;
      state.form.outlay = scope.outlay;
    };
    // 提交验证
    const formref = ref(null);
    const saveEdit = () => {
      if (state.editID === '') {
        formref.value.validate(valid => {
          if (valid) {
            const param = {
              name: state.form.name,
              age: state.form.age,
              income: state.form.income,
              outlay: state.form.outlay,
              status: state.form.status,
              marry: state.form.marry,
              school: state.form.school,
              graduate: state.form.graduate
            };
            state.datalist.push(param);
            state.editVisible = false;
          } else {
            return false;
          }
        });
      } else {
        const param = {
          name: state.form.name,
          age: state.form.age,
          income: state.form.income,
          outlay: state.form.outlay,
          status: state.form.status,
          marry: state.form.marry,
          school: state.form.school,
          graduate: state.form.graduate
        };
        state.datalist[state.index] = param;
        state.editVisible = false;
      }
    };
    const remove = (row, index) => {
      console.log(index, 'index');
      var index = state.datalist.findIndex(item => {
        if (item.id == row.id) {
          return true;
        }
      });
      state.datalist.splice(index, 1);
    };
    const addtable = () => {
      state.editVisible = true;
      state.form.age = '';
      state.form.graduate = '';
      state.form.income = '';
      state.form.marry = '';
      state.form.name = '';
      state.form.school = '';
      state.form.status = '';
      state.form.outlay = '';
      // state.form.id = '';
      state.editID = '';
    };
    onMounted(() => {});
    return {
      ...toRefs(state),
      edit,
      saveEdit,
      formref,
      remove,
      print,
      addtable
    };
  }
};
</script>

<style scoped>
.BaseTable {
  width: 100%;
  height: 100%;
  /* border: 1px solid red; */
}
.table {
  border: 1px solid #f5f7fa;
  /* padding: 10px 0; */
}
.pag {
  text-align: center;
}
.title {
  display: flex;
  height: 40px;
  line-height: 40px;
}

.title_txt {
  font-size: 16px;
  font-weight: bold;
  flex: 1;
}
.btn {
  text-align: right;
  flex: 1;
}
</style>
