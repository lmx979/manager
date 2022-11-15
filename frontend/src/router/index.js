// 引入相关变量
import { createRouter, createWebHashHistory } from "vue-router";

// 引入路由需要的组件
import Home from "../components/Home.vue";
import Welcome from "../components/Welcome.vue";

// 定义路由规则
const routes = [
  // 首页
  {
    name: "Home", // 路由名称
    path: "/", // 路由匹配的路径
    component: Home, // 匹配组件
    redirect: "/welcome", // 重定向
    // 定义元数据
    meta: {
      title: "首页", // 标题
    },
    // 定义子路由
    children: [
      // 欢迎页
      {
        name: "Welcome",
        path: "/welcome",
        component: Welcome,
        meta: {
          title: "欢迎页",
        },
      },
      // 导航栏
      {
        name: "System", // 系统管理
        path: "/system",
        meta: {
          title: "系统管理",
        },
        children: [
          {
            name: "User", // 用户管理
            path: "/system/user",
            component: () => import("../components/User.vue"),
            meta: {
              title: "用户管理",
            },
          },
        ],
      },
    ],
  },
  // 登录页
  {
    name: "Login",
    path: "/login",
    component: () => import("../views/Login.vue"),
    meta: {
      title: "登录页",
    },
  },
];

// 创建路由并导出
export default createRouter({
  history: createWebHashHistory(),
  routes: routes,
});
