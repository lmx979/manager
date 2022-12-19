/**
 * api管理
 * @date 2022年11月1日00点08分
 * @author Lumxx
 */

// 引入request
import request from "../utils/request";
export default {
  // 用户登录
  login(params) {
    // 调用request
    return request({
      method: "post", // 请求方法
      url: "/users/login", // 请求路径
      data: params, // 携带数据
    });
  },
  // 导出菜单列表
  menuList() {
    return request({
      methos: "get",
      url: "/menu/list",
      data: {},
      mock: true,
    });
  },
  // 导出消息数量
  noticeCount() {
    return request({
      method: "get",
      url: "/notice/count",
      data: {},
      mock: true,
    });
  },
  // 获取用户列表
  userList(params) {
    return request({
      method: "get",
      url: "/users/list",
      data: params,
    });
  },
  // 删除用户
  userDelete(params) {
    return request({
      method: "delete",
      url: "/users/delete",
      data: params,
    });
  },
  // 获取角色名称列表
  getRoleList() {
    return request({
      method: "get",
      url: "/roles/list",
      data: {},
      mock: true,
    });
  },
  // 获取部门列表
  getDeptList(params) {
    return request({
      method: "get",
      url: "/dept/list",
      data: params,
      mock: true,
    });
  },
  // 提交用户信息
  userSubmit(params) {
    return request({
      method: "post",
      url: "/users/operate",
      data: params,
    });
  },
};
