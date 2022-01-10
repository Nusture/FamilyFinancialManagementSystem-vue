<template>
  <div class="BaseTable">
    <div class="BaseTable_title">个人信息</div>
    <div class="BaseTable_content">
      <el-row>
        <el-col :span="8">
          <div class="BaseTable_left">
            <div class="BaseTable_left_img">
              <img :src="fileurl" />
            </div>
            <div class="BaseTable_left_btn BaseTable_left_btnborder">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-change="handlePictureCardPreview"
              >
                <el-button type="primary">修改头像</el-button>
              </el-upload>
            </div>
            <div class="BaseTable_left_info">
              <span>个人签名:</span>
              <span >{{formLabelAlign.signature}}</span>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="BaseTable_right">
            <el-form label-width="100px" :model="formLabelAlign" :disabled="show">
              <el-form-item label="用户">
                <el-input v-model="formLabelAlign.name" disabled style="width:50%"></el-input>
              </el-form-item>
              <el-form-item label="出生日期">
                <!-- <el-input v-model="formLabelAlign.birth" style="width:50%"></el-input> -->
                <el-date-picker
                      v-model="formLabelAlign.birth"
                      type="date"
                      format="YYYY-MM-DD"
                      style="width:50%"
                      @change="changetime"
                    />
              </el-form-item>
              <el-form-item label="性别">
                <el-select v-model="formLabelAlign.gender" placeholder="请选择性别" style="width:50%" filterable clearable>
                <el-option label="男" :value="0" />
                <el-option label="女" :value="1" />
              </el-select>
              </el-form-item>
              <el-form-item label="地址">
                <el-input v-model="formLabelAlign.address" style="width:50%"></el-input>
              </el-form-item>
              <el-form-item label="联系电话">
                <el-input v-model="formLabelAlign.phone" style="width:50%"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="formLabelAlign.email" style="width:50%"></el-input>
              </el-form-item>
              <el-form-item label="个性签名">
                <el-input v-model="formLabelAlign.signature" style="width:50%"></el-input>
              </el-form-item>
            </el-form>
            <div class="btn">
              <el-button v-if="show === true " type="info" @click="show = false">修改</el-button>
              <el-button v-else type="info" @click="show = true">取消</el-button>
              <el-button type="primary" :disabled="show" @click="submit">保存</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, onMounted } from 'vue';
import { getUserInfos, changeUserInfos } from '@/api/index';
import { getToken } from '@/utils/auth';
import { ElMessage } from 'element-plus';
import fileurls from '@/assets/img/admin.jpg';
export default {
  name: 'basetable',
  components: {
    // Pagination
    // fileurls
  },
  setup() {
    const state = reactive({
      formLabelAlign: {
        name: '',
        user: '',
        createTime: '',
        birth: '',
        gender: '',
        address: '',
        phone: '',
        familycode: '',
        email: '',
        signature: ''
      },
      radio: null,
      show: true,
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      fileurl: fileurls
    });
    const changetime = (value) =>{
      console.log(value,'value')
    }
    const submit = () => {
      const param = {
        token: getToken(),
        username: state.formLabelAlign.name,
        phone: state.formLabelAlign.phone,
        birth: state.formLabelAlign.birth,
        gender: state.formLabelAlign.gender,
        address: state.formLabelAlign.address,
        email: state.formLabelAlign.email,
        signature: state.formLabelAlign.signature
      };
      changeUserInfos(param).then(res => {
        if (res.code === 200) {
          ElMessage.success('保存成功')
          state.show = true
          getdatalist()
        } else {
          ElMessage({
            type: 'error',
            message: res.msg
          });
        }
      });
    };
    const handlePictureCardPreview = file => {
      state.fileurl = file.url;
      localStorage.setItem('url',state.fileurl)
    };
    // 获取用户信息
    const getdatalist = () =>{
       getUserInfos({
        token: getToken()
      }).then(res => {
        state.formLabelAlign.name = res.data.username;
        state.formLabelAlign.createTime = res.data.createTime;
        state.formLabelAlign.phone = res.data.phone;
        state.formLabelAlign.familycode = res.data.familyCode;
        state.formLabelAlign.signature = res.data.signature
        state.formLabelAlign.gender = res.data.gender
        state.formLabelAlign.email = res.data.email
        state.formLabelAlign.birth = res.data.birth
        state.formLabelAlign.address = res.data.address
      });
    }
    onMounted(() => {
      state.fileurl =  localStorage.getItem('url') || fileurls
     getdatalist()
    });
    return {
      ...toRefs(state),
      submit,
      changetime,
      handlePictureCardPreview
    };
  }
};
</script>

<style lang="scss">
.BaseTable {
  width: 100%;
  // height: 100%;
  background: #fff;
  border-radius: 3px;
  border: 1px solid #e7e8f2;
  height: calc(100vh - 140px);
  .BaseTable_title {
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    background: #f8f8f8;
    padding: 0 15px;
    border: 1px solid #ccc;
    border-bottom: none;
    color: #717477;
    font-weight: bold;
  }
  .BaseTable_content {
    width: 100%;
    // height: 600px;
    height: calc(100vh - 190px);
    .BaseTable_left {
      border: 1px solid #ccc;
    height: calc(100vh - 192px);
      .BaseTable_left_img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        overflow: hidden;
        margin: 30px auto;
        img {
          width: 150px;
          height: 150px;
        }
      }
      .BaseTable_left_btnborder {
        border-bottom: 1px solid #ccc;
        .el-upload-list {
          display: none;
        }
        .el-upload--picture-card {
          line-height: 0;
        }
        .el-upload--picture-card {
          border: none;
          width: none;
          height: 40px;
        }
      }
      .BaseTable_left_btn {
        text-align: center;
        padding-bottom: 40px;
      }
      .BaseTable_left_info {
        padding: 15px;
        height: 200px;
        span {
          display: block;
        }
      }
    }
    .BaseTable_right {
      width: calc(100% - 1px);
    height: calc(100vh - 192px);
      border: 1px solid #ccc;
      border-left: none;
      .el-form {
        width: 100%;
        overflow: hidden;
      }
      .el-form-item {
        width: 100%;
        border-bottom: 1px solid #ccc;
        margin: 0;
        padding: 15px;
      }
      .btn {
        margin: 10px 50px;
      }
    }
  }
}
</style>
