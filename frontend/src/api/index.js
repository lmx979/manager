/*
 * api管理
 * @date 2022年11月1日00点08分
 * @author Lumxx
 */

// 引入request
import request from "../utils/request";
// 导出login方法
export default {
  login(params) {
    // 调用request
    return request({
      method: "post", // 请求方法
      url: "/users/login", // 请求路径
      data: params, // 携带数据
      mock: false, // 局部mock设置，优先级更高，是否走mock接口
    });
  },
};
