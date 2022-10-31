/*
 * 用户集合的数据模型, 包含数据规范
 * @date 2022年11月1日01点51分
 * @author Lumxx
 */

// 导入
const mongoose = require("../db/conn");
// 配置字段的格式
const UserSchema = mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true,
      unique: true, // 唯一
    }, // 用户ID，自增长
    userName: {
      type: String,
      required: true,
      unique: true,
    }, // 用户名称
    userPassword: {
      type: String,
      required: true,
    }, // 用户密码，md5加密
    userEmail: String, // 用户邮箱
    mobile: String, // 手机号
    sex: Number, // 性别 0：男 1：女
    departmentId: [], // 部门
    job: String, // 岗位
    state: {
      type: Number,
      default: 1, // 默认值
    }, // 状态 1：在职 2：离职 3：试用期
    role: {
      type: Number,
      default: 1,
    }, // 用户角色 0：系统管理员 1：普通用户
    roleList: [], // 系统角色
    createTime: {
      type: Date,
      default: Date.now(),
    }, // 创建时间
    lastLoginTime: {
      type: Date,
      default: Date.now(),
    }, // 更新时间
  },
  {
    timestamps: true, // 时间戳
    versionKey: false, // 清除版本信息
  }
);
// 定义模型
const User = mongoose.model("user", UserSchema);
// 输出模型
module.exports = User;
