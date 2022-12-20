/**
 * 用户集合控制器
 * @date 2022年11月1日02点00分
 * @author Lumxx
 */

// 引入数据库模型
const User = require("../model/User");
const Counter = require("../model/Counter");
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
  const list = await User.find(userParams, { _id: 0, userPassword: 0 })
    .skip(skipIndex)
    .limit(page.pageSize)
    .sort({ createTime: -1 });
  // countDocuments查询总共有多少条数据
  const total = await User.countDocuments(userParams);
  // 返回数据
  if (list !== undefined && total !== undefined) {
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
// 删除用户列表
async function userDelete(userIds) {
  // 逻辑删除（将状态设置为“离职”）
  const result = await User.updateMany({ userId: { $in: userIds } }, { state: 2 });
  // 判断更新的条数
  if (result.modifiedCount) {
    const deleteNumber = result.modifiedCount;
    return deleteNumber;
  } else {
    return false;
  }
}
// 用户查重
async function userUnique(userName, userEmail) {
  const res = await User.findOne({ $or: [{ userName }, { userEmail }] }, "_id userName userEmail");
  return res;
}
// 获取自增的id
async function getUserSequenceId() {
  const userId = await Counter.findOneAndUpdate({ _id: "userId" }, { $inc: { sequence_value: 1 } }, { new: true });
  return userId ? userId.sequence_value : false;
}
// 新增用户
async function userAdd(params) {
  const user = new User(params);
  // 用户保存, 就是新增的效果
  const userInfo = await user.save();
  return userInfo ? userInfo : false;
}
// 编辑用户
async function userEdit(userId, params) {
  // 找到用户信息进行更新, 返回最新的数据
  const result = await User.findOneAndUpdate({ userId }, params, { new: true });
  return result ? result : false;
}
// 导出
module.exports = { login, userList, userDelete, userUnique, getUserSequenceId, userAdd, userEdit };
