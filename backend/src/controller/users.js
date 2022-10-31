/*
 * 用户集合控制器
 * @date 2022年11月1日02点00分
 * @author Lumxx
 */

// 引入数据库模型
const User = require("../model/User");
// 登录
async function login(userName, userPassword) {
  // 从数据库中查找
  const user = await User.findOne({ userName, userPassword });
  if (user !== null) {
    return user;
  } else {
    return false;
  }
}
// 导出
module.exports = { login };
