<template>
  <!-- <div id="nav"> -->
  <router-view v-if="isShow" />
  <!-- </div> -->
</template>

<script>
import { nextTick, provide, reactive, toRefs } from '@vue/runtime-core';
export default {
  setup() {
    const state = reactive({
      isShow: true
    });
    const onRefresh = () => {
      state.isShow = false;
      nextTick(() => {
        state.isShow = true;
      });
    };
    provide('reload', onRefresh);
    return {
      ...toRefs(state)
    };
  }
};
</script>

<style>
@import './assets/css/main.css';
@import './assets/css/color-dark.css';
</style>
<style>
.el-button--primary {
  background: #56b185 !important;
  border: none !important;
}
</style>
