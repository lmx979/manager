/**
 * 用户管理模块
 * @date 2022年11月1日01点58分
 * @author Lumxx
 */

const router = require("koa-router")();
const { login, userList, userDelete, userUnique, getUserSequenceId, userAdd } = require("../controller/users");
const util = require("../utils/util");
const md5 = require("md5");
// 引入jwt
const jwt = require("jsonwebtoken");
// 路由前缀
router.prefix("/users");
// 登录post请求
router.post("/login", async (ctx) => {
  try {
    // 获取用户信息
    const { userName, userPassword } = ctx.request.body;
    // 密码md5加密
    userPassword = md5(userPassword);
    // 使用控制器验证登录
    let result = await login(userName, userPassword);
    // 生成并返回token，参数1是数据，参数2是密钥，参数3是过期时间（1h表示1天）
    if (result) {
      const token = jwt.sign({ data: result }, "Lumxx", { expiresIn: "60000" });
      result = result.toObject();
      delete result.userPassword;
      result.token = token;
      ctx.body = util.success(result);
    } else {
      ctx.body = util.fail("账号或密码不正确");
    }
  } catch (error) {
    ctx.body = util.fail("error.msg");
  }
});
// 获取用户列表get请求
router.get("/list", async (ctx) => {
  // 进行查询
  try {
    // 从前端的请求中获取userId,userName,state
    const { userId, userName, state } = ctx.request.query;
    // 从前端的请求中, 计算并返回page和skipIndex
    const { page, skipIndex } = util.pager(ctx.request.query);
    // 定义查询数据库的参数, 就是请求条件
    let userParams = {};
    let pageParams = {};
    // 拼接参数
    pageParams.page = page;
    pageParams.skipIndex = skipIndex;
    // 如果有userId、userName、state，需要一起带上
    if (userId) {
      userParams.userId = userId;
    }
    if (userName) {
      userParams.userName = userName;
    }
    if (state && state != "0") {
      // state为0，意味着"所有"，不用搜索
      userParams.state = state;
    }
    // 请求数据
    const result = await userList(userParams, pageParams);
    // 返回数据
    if (result) {
      // 成功返回数据
      ctx.body = util.success({
        // 注意需要展开
        ...result,
      });
    } else {
      // 失败提醒
      ctx.body = util.fail("查询不到符合条件的用户");
    }
  } catch (error) {
    ctx.body = util.fail("查询异常" + error);
  }
});
// 用户删除/批量删除
router.delete("/delete", async (ctx) => {
  try {
    // 待删除的用户id数组
    const { userIds } = ctx.request.body;
    // 批量删除（逻辑删除，就是批量更新）
    const result = await userDelete(userIds);
    // 判断删除条数，如果有数字，说明删除成功；如果没有数字，说明删除失败
    if (result) {
      ctx.body = util.success({ nModified: result }, `共删除成功${result}条`);
    } else {
      ctx.body = util.fail("删除失败");
    }
  } catch (error) {
    ctx.body = util.fail("删除操作异常" + error);
  }
});
// 用户新增/编辑
router.post("/operate", async (ctx) => {
  // 从请求体中获取所有参数，再进行参数的验证
  const { userId, userName, userEmail, mobile, job, state, roleList, deptId, action } = ctx.request.body;
  // 判断是新增还是编辑
  if (action === "add") {
    // 查重，新增用户名不可重复
    const res = await userUnique(userName, userEmail);
    if (res) {
      ctx.body = util.fail("用户名重复，已存在该用户");
      return;
    }
    // 没有问题, 就创建新用户，先从自增表中, 拿到最新的id
    const sequenceId = await getUserSequenceId();
    try {
      // 创建对象, 密码使用md5加密
      const userParams = {
        userId: sequenceId,
        userName,
        userPassword: md5("123456"),
        userEmail,
        role: 1, // 默认普通用户
        roleList,
        job,
        state,
        deptId,
        mobile,
      };
      const userAddResult = await userAdd(userParams);
      if (userAddResult) {
        ctx.body = util.success({ userId: userAddResult.userId }, "用户创建成功");
      } else {
        ctx.body = util.fail("用户创建失败");
      }
    } catch (error) {
      ctx.body = util.fail(error.stack);
    }
  }
  if (action === "edit") {
  }
});
// 导出
module.exports = router;
