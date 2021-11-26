<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">理财管理系统</div>
      <el-form :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="username" placeholder="username">
            <template #prepend>
              <el-button icon="el-icon-user"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="password" @keyup.enter="submitForm()">
            <template #prepend>
              <el-button icon="el-icon-lock"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
        <!-- <p class="login-tips">Tips : 用户名和密码随便填。</p> -->
      </el-form>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import stores from '../store/index';

export default {
  setup() {
    const router = useRouter();
    const param = reactive({
      username: 'qinghua',
      password: '1016'
    });

    const rules = {
      username: [
        {
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }
      ],
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
    };
    const submitForm = () => {
      if (param.username === 'qinghua' && param.password === '1016') {
        ElMessage.success('登录成功');
        localStorage.setItem('ms_username', param.username);

        stores.commit('common/getToken', param.username);
        router.push('/');
        // window.localStorage.setItem('token2', JSON.stringify(param.username));
      } else {
        ElMessage.error('用户名或密码错误');
        return false;
      }
      // login.value.validate((valid) => {
      //     console.log(valid,'1120')
      //     if (valid) {
      //         ElMessage.success("登录成功");
      //         localStorage.setItem("ms_username", param.username);
      //         router.push("/");
      //     } else {
      //         ElMessage.error("登录成功");
      //         return false;
      //     }
      // });
    };

    const store = useStore();
    store.commit('clearTags');

    return {
      ...toRefs(param),
      rules,
      submitForm
    };
  }
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/bg2.png);
  background-size: 100% 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
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