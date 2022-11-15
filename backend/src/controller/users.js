/**
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
// 查询用户列表
async function userList(userParams, pageParams) {
  const { page, skipIndex } = pageParams;
  // 根据条件查询所有用户列表
  // find条件查询, 参数2表示不查询_id和userPassword
  // 如果有skipIndex和page，可以跳转查询，可以返回分页的数据
  const list = await User.find(userParams, { _id: 0, userPassword: 0 }).skip(skipIndex).limit(page.pageSize);
  // countDocuments查询总共有多少条数据
  const total = await User.countDocuments(userParams);
  // 返回数据
  if (list && total) {
    return {
      page: {
        ...page,
        total,
      },
      list,
    };
  } else {
    return false;
  }
}
// 导出
module.exports = { login, userList };
