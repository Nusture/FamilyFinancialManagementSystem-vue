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
              <!-- <el-upload
                ref="upload"
                class="upload-demo"
                action="#"
                :limit="1"
                 :on-change="handlePreview"
                :auto-upload="false"
              >
              <div slot="file" slot-scope="{file}">
                  <el-button @click="handlePictureCardPreview(file)" type="info">修改头像</el-button>
              </div>
              </el-upload>-->
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-change="handlePictureCardPreview"
              >
                <el-button type="info">修改头像</el-button>
              </el-upload>
            </div>
            <div class="BaseTable_left_info">
              <span>个人简介:</span>
              <span v-if="formLabelAlign.signature !== ''">{{formLabelAlign.signature}}</span>
              <span style="font-size: 12px;color: #ccc;display:block;text-align:center">这个人很懒，什么都没留下...</span>
            </div>
            <!-- <div class="BaseTable_left_btn">
              <el-button type="info">修改简介</el-button>
            </div> -->
          </div>
        </el-col>
        <el-col :span="16">
          <div class="BaseTable_right">
            <el-form label-width="100px" :model="formLabelAlign" :disabled="show">
              <el-form-item label="用户">
                <el-input v-model="formLabelAlign.name" style="width:50%"></el-input>
              </el-form-item>
              <el-form-item label="出生日期">
                <el-input v-model="formLabelAlign.birth" style="width:50%"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="formLabelAlign.gender">
                  <el-radio :label="0">男</el-radio>
                  <el-radio :label="1">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="地址">
                <el-input v-model="formLabelAlign.address" style="width:50%"></el-input>
              </el-form-item>
              <el-form-item label="联系电话">
                <el-input v-model="formLabelAlign.phone" style="width:50%"></el-input>
              </el-form-item>
              <!-- <el-form-item label="家庭码">
                <el-input v-model="formLabelAlign.familycode" style="width:50%"></el-input>
              </el-form-item>-->
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
              <el-button type="info" @click="submit">保存</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, onMounted } from 'vue';
// import { ElMessage, ElMessageBox } from 'element-plus';
// import Pagination from '../components/Pagination/index.vue';
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
        } else {
          ElMessage({
            type: 'error',
            message: res.msg
          });
        }
      });
    };
    const handlePreview = file => {
      console.log(file);
    };
    const handlePictureCardPreview = file => {
      state.fileurl = file.url;
      localStorage.setItem('url',state.fileurl)
      console.log(file, 'fileurl');
    };
    // const handleDownload = file => {
    //   console.log(file);
    // };
     const aaa = async ()  =>{
      await getUserInfos()
    };
    onMounted(() => {
      // aaa()
      // const username = localStorage.getItem('ms_username');
      console.log(localStorage.getItem('url'),'url')
      state.fileurl =  localStorage.getItem('url') || fileurls
      getUserInfos({
        token: getToken()
      }).then(res => {
        state.formLabelAlign.name = res.data.username;
        state.formLabelAlign.createTime = res.data.createTime;
        state.formLabelAlign.phone = res.data.phone;
        state.formLabelAlign.familycode = res.data.familyCode;
      });
    });
    return {
      ...toRefs(state),
      submit,
      handlePreview,
      // handleRemove,
      handlePictureCardPreview
      // handleDownload
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
    .BaseTable_left {
      border: 1px solid #ccc;
      height: 700px;
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
      height: 700px;
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
