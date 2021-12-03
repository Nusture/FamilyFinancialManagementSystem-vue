<template>
  <div>
    <div>模拟登录</div>
    <div class="Login">
      <el-form label-width="0px" class="ms-content">
        <el-form-item>
          <el-input v-model="username" placeholder="username">
            <template #prepend>
              <el-button icon="el-icon-user"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
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
import { reactive, toRefs } from '@vue/reactivity';
import { Login } from '@/api/index'; // 引入封装好的axios 方法
// import Schart from "vue-schart";
export default {
  name: 'basecharts',
  components: {
    // Schart,
  },
  setup() {
    const state = reactive({
      username: '',
      password: ''
    });
    const submitForm = () => {
      //  设置接口需要的参数对应的变量数据
      const params = {
        username: state.username,
        password: state.password
      };
      console.log(params, '输入的账号和密码');
      // 调用后端接口
      Login(params).then(res => {
        //  res 返回的是调用接口的返回数据
        //  res.code 的值代表成功与否
        console.log(res); // 因为没有后端接口 所以这里打印会报错
      });
    };
    return {
      ...toRefs(state),
      submitForm
    };
  }
};
</script>

<style scoped>
.Login {
  width: 50vw;
  margin: 0 auto;
}
/* .schart-box {
    display: inline-block;
    margin: 20px;
}
.schart {
    width: 600px;
    height: 400px;
}
.content-title {
    clear: both;
    font-weight: 400;
    line-height: 50px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
} */
</style>