<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">家庭理财管理系统</div>
      <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="用户名" @blur="userchange">
            <template #prepend>
              <el-button icon="el-icon-user"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="param.password" @keyup.enter="submitForm()">
            <template #prepend>
              <el-button icon="el-icon-lock"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item v-if="param.show === true" prop="phone">
          <el-input type="nummber" placeholder="电话" v-model="param.phone" @keyup.enter>
            <template #prepend>
              <el-button icon="el-icon-phone"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item v-if="param.show === true">
          <el-input placeholder="家庭码(选填)" v-model="param.familyCode" @keyup.enter>
            <template #prepend>
              <el-button icon="el-icon-help"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="verify" class="imgcode">
          <div class="verifyCode">
            <el-input type="text" placeholder="验证码" v-model="param.verify" @keyup.enter="submitForm()">
              <template #prepend>
                <el-button icon="el-icon-lock"></el-button>
              </template>
              <template #append>
                <span style="width:80px">
                  <Verifycode @code="imgCode" />
                </span>
              </template>
            </el-input>
          </div>
        </el-form-item>
        <!-- <span class="verify"> -->
        <!-- <Verifycode @code="imgCode" /> -->
        <!-- </span> -->
        <div class="login-btn">
          <el-button v-if="param.show === false" type="primary" @click="param.show = true">注册</el-button>
          <el-button v-if="param.show === false" type="primary" @click="submitForm">登录</el-button>
          <el-button type="primary" v-if="param.show === true" @click="register">确定</el-button>
          <el-button type="primary" v-if="param.show === true" @click="param.show = false">取消</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import Verifycode from './components/verify.vue';
import { Login, Register,getUsername } from '@/api/index';
import { setToken, removeToken } from '@/utils/auth';
export default {
  components: { Verifycode },
  setup() {
    const router = useRouter();
    const param = reactive({
      username: '',
      password: '',
      verify: '',
      code: '',
      phone: '',
      familyCode: '',
      show: false,
      num: null
    });

    const rules = {
      username: [
        {
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }
      ],
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      verify: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
      phone: [{ required: true, message: '请输入电话', trigger: 'blur' }]
      // verify: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
    };
    const login = ref(null);
    const submitForm = () => {
      console.log(window.location.hostname,1120)
      login.value.validate(valid => {
        if (valid) {
          if (param.code.toUpperCase() === param.verify.toUpperCase()) {
            console.log(param.code, param.verify, 'code');
            Login({ username: param.username, password: param.password }).then(res => {
              if (res.code === 200) {
                setToken(res.data.tokenValue);
                localStorage.setItem('ms_username', param.username);
                router.push('/');
              } else {
              }
            });
          } else {
            console.log(param.code, param.verify, 'code');
            ElMessage.error('请输入正确的验证码');
          }
        } else {
          return false;
        }
      });
    };
    // 生产随机五位数
    // const numcode = () => {
    //   param.num = parseInt(Math.random() * 100000); //首先创建一个五位数的随机数（Number）
    //   //把每一位都单独提出来
    //   var one = parseInt(param.num / 10000);
    //   var two = parseInt((param.num / 1000) % 10);
    //   var thr = parseInt((param.num / 100) % 10);
    //   var four = parseInt((param.num / 10) % 10);
    //   var fif = param.num % 10;
      
    // };
    // 注册
    const register = () => {
      login.value.validate(valid => {
        if (valid) {
          if (param.code.toUpperCase() === param.verify.toUpperCase()) {
            param.show = true;
            const params = {
              username: param.username,
              password: param.password,
              phone: param.phone,
              familyCode: param.familyCode === '' ? parseInt(Math.random() * 100000) : param.familyCode
            };
            Register(params).then(res => {
              if (res.code === 200) {
                param.show = false;
                ElMessage.success('注册成功');
              } else {
              }
            });
          } else {
            ElMessage.error('请输入正确的验证码');
          }
        } else {
          return false;
        }
      });
    };
    // 注册验证用户名是否存在
    const userchange = () =>{
      if(param.show === true){
      getUsername({username: param.username}).then(res =>{
        if(res.code === 200) {
        } else {
          ElMessage({
            type: 'warning',
            duration: 2 * 1000,
            message: '改用户已存在'
          })
        }
      })

      }
    };

    const store = useStore();
    store.commit('clearTags');
    const imgCode = value => {
      param.code = value;
      console.log(value, 'value');
    };
    onMounted(() => {
      // imgCode();
    });
    return {
      param,
      rules,
      login,
      submitForm,
      imgCode,
      register,
      userchange
    };
  }
};
</script>

<style lang="scss">
.login-wrap {
  // 禁止双击选中文本
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/img/bg3.png');
  background-size: 100% 100%;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 400px;
  // height: 400px;
  margin: -250px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
  .ms-title {
    width: 100%;
    height: 80px;
    line-height: 80px;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    font-size: 20px;
    color: #fff;
    background: #148be4;
  }
  .ms-content {
    padding: 30px 30px;
    // height: 320px;
    background: #fff;
    .verify {
      display: flex;
      text-align: right;
      .el-button {
        flex: 0 50%;
      }
    }
    .imgcode {
      height: 40px;
      .verifyCode {
        height: 40px;
        overflow: hidden;
        border-bottom: 1px solid #dcdfe6;
      }
      // overflow: hidden;
      .el-input-group__append {
        background: #fff;
        width: 120px;
        padding: 0;
      }
    }
  }
}
.login-btn {
  // text-align: center;
  .el-button {
    display: block;
    width: 100%;
    margin: 10px 0;
  }
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>