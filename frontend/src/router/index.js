// 引入相关变量
import { createRouter, createWebHashHistory } from "vue-router";

// 引入路由需要的组件
import Home from "../components/Home.vue";
import Welcome from "../components/Welcome.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";

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
      // 登录页
      {
        name: "Login",
        path: "/login",
        component: Login,
        meta: {
          title: "登录页",
        },
      },
      // 注册页
      {
        name: "Register",
        path: "/register",
        component: Register,
        meta: {
          title: "注册页",
        },
      },
    ],
  },
];

// 创建路由并导出
export default createRouter({
  history: createWebHashHistory(),
  routes: routes,
});
