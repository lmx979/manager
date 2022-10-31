/*
 * vuex状态管理
 * @date 2022年11月1日00点33分
 * @author Lumxx
 */

// 引入createStore方法
import { createStore } from "vuex";
// 引入mutations
import mutations from "./mutations";
// 引入封装好的storage
import storage from "../utils/storage";

// 获取用户信息
const state = {
  userInfo: storage.getItem("userInfo") || "",
};

// 导出
export default createStore({ state, mutations });
