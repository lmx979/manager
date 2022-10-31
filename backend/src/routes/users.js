/*
 * 用户管理模块
 * @date 2022年11月1日01点58分
 * @author Lumxx
 */

const router = require("koa-router")();
const { login } = require("../controller/users");
const util = require("../utils/util");

router.prefix("/users");

// 登录post请求
router.post("/login", async (ctx) => {
  try {
    // 获取用户信息
    const { userName, userPassword } = ctx.request.body;
    // 使用控制器验证登录
    let result = await login(userName, userPassword);
    if (result) {
      result = result.toObject();
      delete result.userPassword;
      ctx.body = util.success(result);
    } else {
      ctx.body = util.fail("账号或密码不正确");
    }
  } catch (error) {
    ctx.body = util.fail("error.msg");
  }
});

module.exports = router;
