import {
    createRouter,
    createWebHashHistory
} from "vue-router";
import Home from "../views/Home.vue";

const routes = [{
    path: '/',
    redirect: '/dashboard'
}, {
    path: "/",
    name: "Home",
    component: Home,
    children: [{
            path: "/dashboard",
            name: "Dashboard",
            meta: {
                title: '系统首页',
                title2: 'Dashboard'
            },
            component: () => import( /* webpackChunkName: "dashboard" */ "../views/Dashboard.vue")
        }, {
            path: "/userManage",
            name: "Usermanage",
            meta: {
                title: '用户管理',
                title2: 'User'
            },
            component: () => import( /* webpackChunkName: "table" */ "../views/UserManage.vue")
        },

        {
            path: "/outlay",
            name: "Outlay",
            meta: {
                title: '日、月、年支出',
                title2: 'YearOutlay'
            },
            component: () => import( /* webpackChunkName: "form" */ "../views/Outlay.vue")
        },
        {
            path: "/moneyDetail",
            name: "MoneyDetail",
            meta: {
                title: '资产明细',
                title2: 'MoneyDetail'
            },
            component: () => import( /* webpackChunkName: "tabs" */ "../views/MoneyDetail.vue")
        },
        {
            path: "/outlayIncome",
            name: "OutlayIncome",
            meta: {
                title: '支出、收入数据展示',
                title2: 'OutlayIncome'
            },
            component: () => import( /* webpackChunkName: "donate" */ "../views/OutlayIncome.vue")
        },
        {
            path: "/search",
            name: "Search",
            meta: {
                title: '搜索',
                title2: 'Search'
            },
            component: () => import( /* webpackChunkName: "charts" */ "../views/Search.vue")
        },
        {
            path: "/permission",
            name: "Permission",
            meta: {
                title: '权限管理',
                title2: 'Permission',
                permission: true
            },
            component: () => import( /* webpackChunkName: "permission" */ "../views/Permission.vue")
        },
        {
            path: "/income",
            name: "Income",
            meta: {
                title: '月、年收入模块',
                title2: 'Yearincome'
            },
            component: () => import( /* webpackChunkName: "i18n" */ "../views/Income.vue")
        }, {
            path: "/upload",
            name: "upload",
            meta: {
                title: '上传插件',
                title2: 'Update'
            },
            component: () => import( /* webpackChunkName: "upload" */ "../views/Upload.vue")
        }, {
            path: "/icon",
            name: "icon",
            meta: {
                title: '图标管理',
                title2: 'Icon'
            },
            component: () => import( /* webpackChunkName: "icon" */ "../views/Icon.vue")
        }, {
            path: '/:pathMatch(.*)',
            name: '404',
            meta: {
                title: '找不到页面',
                title2: 'Not'
            },
            component: () => import( /* webpackChunkName: "404" */ '../views/404.vue')
        }, {
            path: '/rolemanage',
            name: 'RoleManage',
            meta: {
                title: '角色管理',
                title2: 'RoleManage'
            },
            component: () => import( /* webpackChunkName: "403" */ '../views/RoleManage.vue')
        }, {
            path: '/userme',
            name: 'userMe',
            meta: {
                title: '个人中心',
                title2: 'UserMe'
            },
            component: () => import( /* webpackChunkName: "user" */ '../views/User.vue')
        }, {
            path: '/editor',
            name: 'editor',
            meta: {
                title: '文本管理',
                title2: 'TextEdit'
            },
            component: () => import( /* webpackChunkName: "editor" */ '../views/Editor.vue')
        }
    ]
}, {
    path: "/login",
    name: "Login",
    meta: {
        title: '登录'
    },
    component: () => import( /* webpackChunkName: "login" */ "../views/Login.vue")
}];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    // document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ?
            next() :
            next('/403');
    } else {
        next();
    }
});

export default router;