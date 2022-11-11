/**
 * 消息模块
 * @date 2022年11月9日21点11分
 * @author Lumxx
 */
const router = require("koa-router")();
const util = require("../utils/util");
const jwt = require("jsonwebtoken");
router.prefix("/notice");
// 返回消息数量
router.get("/count", async (ctx) => {
  ctx.body = util.success(11);
});
module.exports = router;
