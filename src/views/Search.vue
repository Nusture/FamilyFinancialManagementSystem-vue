<template>
<div class="Member">
  家庭成员
</div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import {familyMember} from '@/api/index'
export default {
  name: 'Member',
  setup() {
    const state = reactive({
      username: '',
      password: ''
    });
    const getdatalist = () =>{
familyMember().then(res =>{

})
    }
    onMounted(() =>{
getdatalist()
    })
    return {
      ...toRefs(state)
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