import { createApp } from "vue";
// import "./style.css";
// 引入公共样式
import "./assets/style/index.scss";
import "./assets/style/reset.css";
import App from "./App.vue";
// 导入路由
import router from "./router";
// 导入element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// 引入axios
import request from "./utils/request";
// 引入封装的storage
import storage from "./utils/storage";

const app = createApp(App);
// 使用路由
app.use(router);
// 使用element-plus
app.use(ElementPlus);
// 全局挂载变量
app.config.globalProperties.$request = request;
app.config.globalProperties.$storage = storage;
app.mount("#app");
