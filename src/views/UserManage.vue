<template>
  <div class="BaseTable">
    <div class="title">
      <div class="Img">
        <img :src="fileurl" />
      </div>
      <div class="text">
        欢饮您! {{formLabelAlign.name}}, 祝您开心每一天!
      </div>
    </div>
    <div class="content">
      <div class="content_title">
        基本信息
      </div>
      <div class="rom">
        <el-form label-width="100px" :model="formLabelAlign">
              <el-form-item :label="$t('用户')">
                <el-input v-model="formLabelAlign.name" disabled style="width:90%"></el-input>
              </el-form-item>
              <el-form-item :label="$t('出生日期')">
                <el-date-picker
                  :disabled="show"
                  v-model="formLabelAlign.birth"
                  type="date"
                  format="YYYY-MM-DD"
                  style="width:90%"
                  @change="changetime"
                />
              </el-form-item>
              <el-form-item :label="$t('性别')">
                <el-select :disabled="show" v-model="formLabelAlign.gender" placeholder="请选择性别" style="width:90%" filterable clearable>
                  <el-option :label="$t('男')" :value="0" />
                  <el-option :label="$t('女')" :value="1" />
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('地址')">
                <el-input :disabled="show" v-model="formLabelAlign.address" style="width:90%"></el-input>
              </el-form-item>
              <el-form-item :label="$t('联系电话')">
                <el-input :disabled="show" v-model="formLabelAlign.phone" style="width:90%"></el-input>
              </el-form-item>
              <el-form-item :label="$t('邮箱')">
                <el-input :disabled="show" v-model="formLabelAlign.email" style="width:90%"></el-input>
              </el-form-item>
              <el-form-item :label="$t('个性签名')">
                <el-input :disabled="show" v-model="formLabelAlign.signature" style="width:90%" maxlength="20" show-word-limit></el-input>
              </el-form-item>
              <el-form-item>
                <div class="btn">
                  <el-button v-if="show === true " type="text" @click="show = false">{{$t('编辑资料')}}</el-button>
                  <el-button v-else type="text" @click="show = true">{{$t('取消')}}</el-button>
                  <el-button size="mini" type="primary" v-if="!show" @click="submit">{{$t('保存')}}</el-button>
                </div>
              </el-form-item>
            </el-form>
      </div>
    </div>
    <!-- <div class="userManage">
      <el-row>
        <el-col :span="12">
          <div class="userManage_left">
            <div class="userManage_left_top">
              <div class="userManage_left_top_rig">
                <span>
                  <i class="el-icon-thumb"></i>
                </span>
                <span>20836</span>
              </div>
            </div>
            <div class="userManage_left_bom">
              <div class="userManage_left_bom_img">
                <img src="@/assets/img/admin.jpg" />
              </div>
              <div class="userManage_left_bom_conent">
                <span>{{formLabelAlign.name}}</span>
                <span>{{formLabelAlign.signature}}</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="userManage_right">
            <el-form label-width="100px" :model="formLabelAlign">
              <el-form-item :label="$t('用户')">
                <el-input v-model="formLabelAlign.name" disabled style="width:90%"></el-input>
                <div class="btn">
                  <el-button v-if="show === true " type="text" @click="show = false">{{$t('编辑资料')}}</el-button>
                  <el-button v-else type="text" @click="show = true">{{$t('取消')}}</el-button>
                  <el-button size="mini" type="primary" v-if="!show" @click="submit">{{$t('保存')}}</el-button>
                </div>
              </el-form-item>
              <el-form-item :label="$t('出生日期')">
                <el-date-picker
                  :disabled="show"
                  v-model="formLabelAlign.birth"
                  type="date"
                  format="YYYY-MM-DD"
                  style="width:90%"
                  @change="changetime"
                />
              </el-form-item>
              <el-form-item :label="$t('性别')">
                <el-select :disabled="show" v-model="formLabelAlign.gender" placeholder="请选择性别" style="width:90%" filterable clearable>
                  <el-option :label="$t('男')" :value="0" />
                  <el-option :label="$t('女')" :value="1" />
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('地址')">
                <el-input :disabled="show" v-model="formLabelAlign.address" style="width:90%"></el-input>
              </el-form-item>
              <el-form-item :label="$t('联系电话')">
                <el-input :disabled="show" v-model="formLabelAlign.phone" style="width:90%"></el-input>
              </el-form-item>
              <el-form-item :label="$t('邮箱')">
                <el-input :disabled="show" v-model="formLabelAlign.email" style="width:90%"></el-input>
              </el-form-item>
              <el-form-item :label="$t('个性签名')">
                <el-input :disabled="show" v-model="formLabelAlign.signature" style="width:90%" maxlength="20" show-word-limit></el-input>
              </el-form-item>
            </el-form>
            <div class="wall">
              <img src="@/assets/img/bg3.jpg" />
            </div>
          </div>
        </el-col>
      </el-row>
    </div> -->
    <!-- <div class="BaseTable_title">{{$t('个人信息')}}</div>
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
                <el-button type="primary">{{$t('修改头像')}}</el-button>
              </el-upload>
            </div>
            <div class="BaseTable_left_info">
              <span>{{$t('个性签名')}}:</span>
              <span>{{formLabelAlign.signature}}</span>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="BaseTable_right">
            <el-form label-width="100px" :model="formLabelAlign" :disabled="show">
              <el-form-item :label="$t('用户')">
                <el-input v-model="formLabelAlign.name" disabled style="width:90%"></el-input>
              </el-form-item>
              <el-form-item :label="$t('出生日期')">
                <el-date-picker v-model="formLabelAlign.birth" type="date" format="YYYY-MM-DD" style="width:90%" @change="changetime" />
              </el-form-item>
              <el-form-item :label="$t('性别')">
                <el-select v-model="formLabelAlign.gender" placeholder="请选择性别" style="width:90%" filterable clearable>
                  <el-option :label="$t('男')" :value="0" />
                  <el-option :label="$t('女')" :value="1" />
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('地址')">
                <el-input v-model="formLabelAlign.address" style="width:90%"></el-input>
              </el-form-item>
              <el-form-item :label="$t('联系电话')">
                <el-input v-model="formLabelAlign.phone" style="width:90%"></el-input>
              </el-form-item>
              <el-form-item :label="$t('邮箱')">
                <el-input v-model="formLabelAlign.email" style="width:90%"></el-input>
              </el-form-item>
              <el-form-item :label="$t('个性签名')">
                <el-input v-model="formLabelAlign.signature" style="width:90%"></el-input>
              </el-form-item>
            </el-form>
            <div class="btn">
              <el-button v-if="show === true " type="info" @click="show = false">{{$t('修改')}}</el-button>
              <el-button v-else type="info" @click="show = true">{{$t('取消')}}</el-button>
              <el-button type="primary" :disabled="show" @click="submit">{{$t('保存')}}</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>-->
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
    const changetime = value => {
      console.log(value, 'value');
    };
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
          ElMessage.success('保存成功');
          state.show = true;
          getdatalist();
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
      localStorage.setItem('url', state.fileurl);
    };
    // 获取用户信息
    const getdatalist = () => {
      getUserInfos({
        token: getToken()
      }).then(res => {
        state.formLabelAlign.name = res.data.username;
        state.formLabelAlign.createTime = res.data.createTime;
        state.formLabelAlign.phone = res.data.phone;
        state.formLabelAlign.familycode = res.data.familyCode;
        state.formLabelAlign.signature = res.data.signature;
        state.formLabelAlign.gender = res.data.gender;
        state.formLabelAlign.email = res.data.email;
        state.formLabelAlign.birth = res.data.birth;
        state.formLabelAlign.address = res.data.address;
      });
    };
    onMounted(() => {
      state.fileurl = localStorage.getItem('url') || fileurls;
      getdatalist();
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
  height: calc(100vh - 140px);
  .title{
    height: 80px;
  border: 1px solid #e7e8f2;
  border-radius: 3px;
  background: #fff;
    display: flex;
    .Img{
      width: 70px;
      height: 70px;
      margin: 5px 20px;
      img{
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }
    }
    .text{
      line-height: 80px;
      font-family: 'Microsoft YaHei';
    }
  }
  .content{
    background: #fff;
    margin-top: 20px;
  border: 1px solid #e7e8f2;
  border-radius: 3px;
  .content_title{
    text-indent: 20px;
  }
  .rom{
    // border: 1px solid red;
    // width: 50%;
    .el-form{
      width: 45%;
      // border: 1px solid red;
      margin: 15px auto;
    }
  }
  }
  // .userManage {
  //   height: calc(100vh - 140px);
  //   .userManage_left {
  //     height: calc(100vh - 140px);
  //     .userManage_left_top {
  //       height: calc(70vh - 70px);
  //       background-image: url('@/assets/img/bg3.jpg');
  //       background-size: 100% 100%;
  //       position: relative;
  //       // background-repeat: no-repeat;
  //       .userManage_left_top_rig {
  //         position: absolute;
  //         right: 0;
  //         bottom: 0;
  //         width: 60px;
  //         height: 60px;
  //         background: rgba(136, 136, 137, 0.8);
  //         color: #fff;
  //         span:first-child {
  //           display: block;
  //           height: 30px;
  //           line-height: 30px;
  //           text-align: center;
  //           font-size: 20px;
  //         }
  //         span:last-child {
  //           display: block;
  //           // width: 80px;
  //           height: 30px;
  //           text-align: center;
  //           line-height: 30px;
  //         }
  //       }
  //     }
  //     .userManage_left_bom {
  //       height: calc(30vh - 70px);
  //       background: #9e9e9e;
  //       display: flex;
  //       .userManage_left_bom_img {
  //         // width: 80px;
  //         // height: 80px;
  //         // border-radius: 50%;
  //         // overflow: hidden;
  //         flex: 1;
  //         text-align: right;
  //         img {
  //           width: 80px;
  //           height: 80px;
  //           border-radius: 50%;
  //           border: 2px solid #fff;
  //           margin: calc(15vh - 75px) auto;
  //           background-size: 100% 100%;
  //         }
  //       }
  //       .userManage_left_bom_conent {
  //         flex: 1;
  //         margin: calc(15vh - 55px) auto;
  //         text-indent: 15px;
  //         color: #fff;
  //         span {
  //           display: block;
  //         }
  //         span:first-child {
  //           font-size: 26px;
  //         }
  //         span:last-child {
  //           font-size: 12px;
  //         }
  //       }
  //     }
  //   }
  //   .userManage_right {
  //     height: calc(100vh - 140px);
  //     // padding-top: 20px;
  //     overflow: auto;
  //     .userManage_right_user {
  //       display: flex;
  //       border: 1px solid red;
  //       padding: 10px 20px;
  //       i {
  //         flex: 0 30px;
  //         color: #ccc;
  //         font-size: 26px;
  //         font-weight: bold;
  //       }
  //       span {
  //         flex: 1;
  //         border: 1px solid red;
  //         font-size: 18px;
  //         color: #000;
  //         line-height: 30px;
  //         text-indent: 15px;
  //       }
  //     }
  //     .el-form {
  //       width: 100%;
  //       overflow: hidden;
  //     }
  //     .el-form-item {
  //       width: 90%;
  //       // border-bottom: 1px solid #ccc;
  //       margin: 0;
  //       padding: 10px;
  //     }
  //     .btn {
  //       // margin: 10px 50px;
  //       float: right;
  //       // border: 1px solid red;
  //     }
  //     .wall {
  //       width: 400px;
  //       height: 300px;
  //       // padding: 20px;
  //       span {
  //         display: block;
  //         padding: 0 20px;
  //       }
  //       img {
  //         width: 100%;
  //         height: 100%;
  //         margin-left: 20px;
  //       }
  //     }
  //   }
  // }
  // .BaseTable_title {
  //   height: 50px;
  //   line-height: 50px;
  //   font-size: 20px;
  //   background: #f8f8f8;
  //   padding: 0 15px;
  //   border: 1px solid #ccc;
  //   border-bottom: none;
  //   color: #717477;
  //   font-weight: bold;
  // }
  // .BaseTable_content {
  //   width: 100%;
  //   // height: 600px;
  //   height: calc(100vh - 190px);
  //   .BaseTable_left {
  //     border: 1px solid #ccc;
  //     height: calc(100vh - 192px);
  //     .BaseTable_left_img {
  //       width: 150px;
  //       height: 150px;
  //       border-radius: 50%;
  //       overflow: hidden;
  //       margin: 30px auto;
  //       img {
  //         width: 150px;
  //         height: 150px;
  //       }
  //     }
  //     .BaseTable_left_btnborder {
  //       border-bottom: 1px solid #ccc;
  //       .el-upload-list {
  //         display: none;
  //       }
  //       .el-upload--picture-card {
  //         line-height: 0;
  //       }
  //       .el-upload--picture-card {
  //         border: none;
  //         width: none;
  //         height: 40px;
  //       }
  //     }
  //     .BaseTable_left_btn {
  //       text-align: center;
  //       padding-bottom: 40px;
  //     }
  //     .BaseTable_left_info {
  //       padding: 15px;
  //       height: 200px;
  //       span {
  //         display: block;
  //       }
  //     }
  //   }
  //   .BaseTable_right {
  //     width: calc(100% - 1px);
  //     height: calc(100vh - 192px);
  //     border: 1px solid #ccc;
  //     border-left: none;
  //     .el-form {
  //       width: 100%;
  //       overflow: hidden;
  //     }
  //     .el-form-item {
  //       width: 100%;
  //       border-bottom: 1px solid #ccc;
  //       margin: 0;
  //       padding: 15px;
  //     }
  //     .btn {
  //       margin: 10px 50px;
  //     }
  //   }
  // }
}
</style>
