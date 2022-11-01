/*
 * axios二次封装
 * @date 2022年10月30日23点07分
 * @author Lmxx
 */

// 导入axios
import axios from "axios";
// 导入element-plus的弹框组件
import { ElMessage } from "element-plus";
// 导入配置
import config from "../config/index";
// 导入路由
import router from "../router/index";

// 定义错误信息
const TOKEN_INVALID = "Token认证失败，请重新登录！";
const NETWORK_ERROR = "网络请求异常，请稍后重试！";

// 创建axios实例，添加全局配置
const service = axios.create({
  // 从配置项中取出baseURL
  baseURL: config.baseApi,
  // 超时时间
  timeout: 8000,
});

// 请求拦截
service.interceptors.request.use((req) => {
  // 获取请求头
  const headers = req.headers;
  // 如果请求头中没有验证信息，给个默认值
  if (!headers.Authorization) {
    headers.Authorization = "hello";
  }
  // 返回请求信息
  return req;
});

// 响应拦截
service.interceptors.response.use((res) => {
  // 从响应的数据中获取code,data,msg
  const { code, data, msg } = res.data;
  // 如果状态码为200，直接返回data
  if (code === 200 || code === 0) {
    return data;
  } else if (code === 5001) {
    // 错误码5001，报错，返回错误信息
    ElMessage.error(TOKEN_INVALID); // 页面弹框
    // 路由跳转登录页面
    setTimeout(() => {
      router.push("/login");
    }, 2000);
    return Promise.reject(TOKEN_INVALID); // 控制台
  } else {
    // 其他报错
    ElMessage.error(msg || NETWORK_ERROR);
    return Promise.reject(msg || NETWORK_ERROR);
  }
});

/*
 * 请求的核心参数
 * @param {*} optinos
 * @returns axios实例
 */
// 封装request
function request(options) {
  // 默认get请求
  options.method = options.method || "get";
  // 转小写判断
  if (options.method.toLowerCase() === "get") {
    // 传参时都传递data，虽然get需要的是param，可以进行转换
    options.params = options.data;
  }
  // 局部设置mock
  if (typeof options.mock !== "undefined") {
    config.mock = options.mock;
  }
  // 如果是生成环境，一定要调线上的正式的api
  if (config.env === "prod") {
    service.defaults.baseURL = config.baseApi;
  } else {
    // 判断是否开启了mock
    service.defaults.baseURL = config.mock ? config.mockApi : config.baseApi;
  }
  return service(options);
}

// 添加对应的请求方法
["get", "post", "put", "delete", "patch"].forEach((item) => {
  // 循环给request绑定方法
  request[item] = (url, data, options) => {
    // 把参数进行整理，调用request
    return request({
      // 路径
      url,
      // 数据
      data,
      // 方法
      method: item,
      // 展开相关的配置
      ...options,
    });
  };
});

// 导出
export default request;
