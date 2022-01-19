<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :style="{ '--bg': bgcolor,'--color':color,listen }"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu class="menubtn" :index="item.index" :key="item.index">
            <template #title>
              <i :class="item.icon"></i>
              <span v-if="$i18n.locale === 'zh-cn'">{{ item.title }}</span>
              <span v-else>{{item.title2}}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template #title>{{ subItem.title2 }}</template>
                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
                  <span v-if="$i18n.locale === 'zh-cn'">{{ threeItem.title }}</span>
                  <span v-else>{{ threeItem.title2 }}</span>
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                <span v-if="$i18n.locale === 'zh-cn'">{{ subItem.title }}</span>
                <span v-else>{{ subItem.title2 }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item class="menubtn" :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <template #title>
              <span v-if="$i18n.locale === 'zh-cn'">{{ item.title }}</span>
              <span v-else>{{ item.title2 }}</span>
            </template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { computed, reactive, toRefs, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
export default {
  setup() {
    const state = reactive({
      bgcolor: '#56B185',
      color: '#fff'
    });
    const items = [
      {
        icon: 'el-icon-lx-home',
        index: '/dashboard',
        title: '系统首页',
        title2: 'Dashboard'
      },
      {
        icon: 'el-icon-user',
        index: '/userManage',
        title: '个人信息',
        title2: 'User'
      },
      {
        icon: 'el-icon-house',
        index: '/FamilyInformation',
        title: '家庭信息',
        title2: 'MyFamily'
        // subs: [
        //   {
        //     index: '/FamilyInformation',
        //     title: '家庭信息',
        //     title2: 'FamilyInformation'
        //   },
        //   {
        //           index: "/FamilyMember",
        //           title: "家庭成员",
        //           title2: 'FamilyMember'
        //       },
        // ]
      },
      {
        icon: 'el-icon-lx-copy',
        index: '/OutlayManage',
        title: '支出管理',
        title2: 'OutlayManage'
      },
      {
        icon: 'el-icon-d-caret',
        index: '/IncomeManage',
        title: '收入管理',
        title2: 'IncomeManage'
      }

      // {
      //   icon: 'el-icon-d-caret',
      //   index: '/income',
      //   title: '月、年收入模块',
      //   title2: 'YearMonthIncome'
      // },
      // {
      //   icon: 'el-icon-c-scale-to-original',
      //   index: '/outlayIncome',
      //   title: '支出、收入数据展示',
      //   title2: 'IncomeOutlay'
      // },
      // {
      //   icon: 'el-icon-search',
      //   index: '/search',
      //   title: '搜索',
      //   title2: 'Search'
      // },
      // {
      //   icon: 'el-icon-setting',
      //   index: '7',
      //   title: '系统管理',
      //   title2: 'SyetemManage',
      //   subs: [
      //     {
      //       index: '/rolemanage',
      //       title: '角色管理',
      //       title2: 'RoleManage'
      //     },
      //     {
      //       index: '/404',
      //       title: '404页面',
      //       title2: '404page'
      //     },
      //     {
      //       index: '/editor',
      //       title: '文本管理',
      //       title2: 'TextEdit'
      //     },
      //     {
      //       index: '/icon',
      //       title: '图标管理',
      //       title2: 'Icon'
      //     }
      //   ]
      // }
    ];

    const route = useRoute();

    const onRoutes = computed(() => {
      return route.path;
    });

    const store = useStore();
    const collapse = computed(() => store.state.collapse);
    const listen = computed(() => {
      state.bgcolor = useStore().state.common.sidebarbg;
    });
    return {
      ...toRefs(state),
      items,
      onRoutes,
      collapse,
      listen
    };
  }
};
</script>

<style >
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
  height: 100%;
  /* background: var(--bg) !important; */
}
.sidebar::-webkit-scrollbar {
  background: var(--bg) !important;
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse),
.sidebar-el-menu {
  width: 200px;
  height: 100%;
  /* background: red !important; */
  background: var(--bg) !important;
}
.sidebar > ul {
  height: 100%;
  /* background: var(--bg) !important; */
}
.menubtn {
  /* background: var(--bg) !important; */
  color: var(--color) !important;
  /* color: var(--color) !important; */
}
.el-menu-item i,
.el-submenu__title i {
  color: var(--color) !important;
}
.el-submenu,
.is-opened,
.menubtn,
.el-submenu__title,
.el-menu-item {
  background-color: var(--bg) !important;
  color: var(--color) !important;
}
.sidebar .is-active {
  background: #6bd19f !important;
}
</style>
