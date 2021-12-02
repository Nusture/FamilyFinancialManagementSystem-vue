<template>
  <div class="error-page">
    <div class="title">
      <span class="title_text">{{$t('userManage.user')}}</span>
      <span class="title_btn">
        <el-button type="primary" size="small">{{$t('userManage.adduser')}}</el-button>
      </span>
    </div>
    <div class="table">
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
    <div>
      <!-- 编辑弹出框 -->
      <el-dialog title="编辑" v-model="editVisible" width="70%">
        <el-form label-width="80px" ref="formref" :model="form" :rules="rules">
          <el-row>
            <el-col :span="24">
              <el-form-item label="角色名称" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注">
                <el-input v-model="form.remark"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="功能权限">
                <div class="block">
                  <el-tree
                    :data="dataSource"
                    ref="menuListTree"
                    show-checkbox
                    node-key="id"
                    @check-change="checkchange"
                    default-expand-all
                    :expand-on-click-node="false"
                    :props="{ class: customNodeClass }"
                  />
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="数据权限" prop="age">
                <div class="block">
                  <el-tree
                    :data="dataSource2"
                    show-checkbox
                    node-key="id"
                    default-expand-all
                    :expand-on-click-node="false"
                    :props="{ class: customNodeClass2 }"
                  />
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="editVisible = false">确 定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from '@vue/reactivity';
import { useRouter } from 'vue-router';
export default {
  name: '404',
  setup() {
    const state = reactive({
      dataSource: [
        { id: 1, label: '用户管理', isPenultimate: true },
        { id: 2, label: '资产明细', isPenultimate: true },
        { id: 3, label: '日、月、年支出', isPenultimate: true },
        { id: 4, label: '日、月、年收入', isPenultimate: true },
        { id: 5, label: '支出、收入数据', isPenultimate: true },
        { id: 6, label: '搜索', isPenultimate: true },
        {
          id: 7,
          label: '系统管理',
          isPenultimate: true,
          children: [
            { id: 8, label: '权限设置', isPenultimate: true },
            { id: 9, label: '404页面', isPenultimate: true }
          ]
        }
      ],
      dataSource2: [
        {
          id: 1,
          label: '收入',
          isPenultimate: true,
          children: [
            { id: 2, label: '薪资', isPenultimate: true },
            { id: 3, label: '绩效', isPenultimate: true },
            { id: 4, label: '奖学金', isPenultimate: true },
            { id: 5, label: '朋友', isPenultimate: true },
            { id: 6, label: '双亲', isPenultimate: true },
            { id: 7, label: '其他', isPenultimate: true }
          ]
        },
        {
          id: 8,
          label: '支出',
          isPenultimate: true,
          children: [
            { id: 9, label: '伙食', isPenultimate: true },
            { id: 10, label: '购物', isPenultimate: true },
            { id: 11, label: '互联网', isPenultimate: true },
            { id: 12, label: '出行', isPenultimate: true },
            { id: 13, label: '医疗', isPenultimate: true },
            { id: 14, label: '娱乐', isPenultimate: true },
            { id: 15, label: '其他', isPenultimate: true }
          ]
        }
      ],
      datalist: [
        {
          num: 1,
          name: '我',
          remark: '',
          time: '2021-12-01'
        },
        {
          num: 2,
          name: '爸爸',
          remark: '',
          time: '2021-12-01'
        },
        {
          num: 3,
          name: '妈妈',
          remark: '',
          time: '2021-12-01'
        },
        {
          num: 4,
          name: '姐姐',
          remark: '',
          time: '2021-12-01'
        }
      ],
      tableHead: [
        { column_name: 'num', column_comment: '序号' },
        { column_name: 'name', column_comment: '角色名称' },
        { column_name: 'remark', column_comment: '备注' },
        { column_name: 'time', column_comment: '创建时间' }
      ],
      rules: {
        name: [
          {
            required: true,
            message: '请输入角色名称',
            trigger: 'blur'
          }
        ]
      },
      loading: false,
      editVisible: false,
      form: {
        name: '',
        remark: ''
      }
    });
    const customNodeClass = (data, node) => {
      console.log(data, node, 1120);
      if (state.dataSource.isPenultimate) {
        return 'is-penultimate';
      }
      return null;
    };
    const customNodeClass2 = (data, node) => {
      if (state.dataSource2.isPenultimate) {
        return 'is-penultimate';
      }
      return null;
    };
    const edit = (row, index) => {
      console.log(row, index, '表单信息');
      state.editVisible = true;
      state.form.name = row.name;
      state.form.remark = row.remark;
    };
    const menuListTree = ref([]);
    const remove = () => {};
    const checkchange = val => {
      // 获取功能权限的id 传给后端判断权限
      const tree = menuListTree.value.getCheckedKeys();
      console.log(tree, '选中的树形id');
    };
    return {
      ...toRefs(state),
      customNodeClass,
      customNodeClass2,
      edit,
      remove,
      checkchange,
      menuListTree
    };
  }
};
</script>


<style scoped>
.error-page {
}
.title {
  display: flex;
  margin: 10px 0;
}
.title_text,
.title_btn {
  flex: 1;
}
.title_btn {
  text-align: right;
}
</style>
