/**
 * mutations业务层数据提交
 * @date 2022年11月1日00点39分
 * @author Lumxx
 */

// 引入封装好的storage
import storage from "../utils/storage";

// 导出
export default {
  // 保存用户信息
  saveUserInfo(state, userInfo) {
    // 保存用户信息到vuex
    state.userInfo = userInfo;
    // 保存用户信息到localstorage
    storage.setItem("userInfo", userInfo);
  },
  // 清除用户信息
  removeUserInfo(state) {
    state.userInfo = "";
    storage.removeItem("userInfo");
  },
};
