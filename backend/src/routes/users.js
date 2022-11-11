/**
 * 用户管理模块
 * @date 2022年11月1日01点58分
 * @author Lumxx
 */

const router = require("koa-router")();
const { login } = require("../controller/users");
const util = require("../utils/util");
// 引入jwt
const jwt = require("jsonwebtoken");

// 路由前缀
router.prefix("/users");

// 登录post请求
router.post("/login", async (ctx) => {
  try {
    // 获取用户信息
    const { userName, userPassword } = ctx.request.body;
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

module.exports = router;
