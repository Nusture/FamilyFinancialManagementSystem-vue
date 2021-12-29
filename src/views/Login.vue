<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">EasyAdmin后台管理系统</div>
      <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="username">
            <template #prepend>
              <el-button icon="el-icon-user"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="param.password" @keyup.enter="submitForm()">
            <template #prepend>
              <el-button icon="el-icon-lock"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="verify">
          <el-input type="text" placeholder="verify" v-model="param.verify" @keyup.enter="submitForm()">
            <template #prepend>
              <el-button icon="el-icon-lock"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <span class="verify">
          <el-button type="text">注册</el-button>
          <Verifycode @code="imgCode" />
        </span>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
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
import { Login } from '@/api/index';
export default {
  components: { Verifycode },
  setup() {
    const router = useRouter();
    const param = reactive({
      username: '',
      password: '',
      verify: '',
      code: ''
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
      verify: [{ required: true, message: '请输入密码', trigger: 'blur' }]
    };
    const login = ref(null);
    const submitForm = () => {
      login.value.validate(valid => {
        if (valid) {
          if (param.code.toUpperCase() === param.verify.toUpperCase()) {
            console.log(param.code, param.verify, 'code');
            Login({ username: param.username, password: param.password }).then(res => {
              if (res.code === 200) {
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
      imgCode
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
  width: 350px;
  height: 400px;
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
    height: 320px;
    background: #fff;
    .verify {
      display: flex;
      text-align: right;
      .el-button {
        flex: 0 50%;
      }
    }
  }
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>