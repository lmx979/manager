const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const cors = require("koa2-cors");
const koajwt = require("koa-jwt");

const index = require("./routes/index");
const users = require("./routes/users");
const notice = require("./routes/notice");
// 引入封装好的日志文件
const myLog = require("./utils/myLog");
// 引入封装好的工具函数
const util = require("./utils/util");

// error handler
onerror(app);

// 配置cors：服务器支持跨域
app.use(cors({ origin: "*" }));

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());
// app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "pug",
  })
);

// logger
app.use(async (ctx, next) => {
  // 打印请求日志
  if (ctx.method.toLowerCase() === "get") {
    myLog.info(`get请求，params:${JSON.stringify(ctx.request.query)}`);
  } else if (ctx.method.toLowerCase() === "post") {
    myLog.info(`post请求，params:${JSON.stringify(ctx.request.body)}`);
  }
  // token验证，如果验证失败，会抛出异常，添加catch来捕获处理异常
  await next().catch((err) => {
    // 如果状态码是401
    if (err.status === 401) {
      // 接口是通的，所以改为200
      ctx.status = 200;
      // 返回错误信息
      ctx.body = util.fail("token验证失败", util.CODE.AUTH_ERROR);
    }
  });
});

// 日志打印后，开始token拦截，参数是一个对象，secret是生成token时的密钥
app.use(
  koajwt({ secret: "Lumxx" }).unless({
    // unless可以设置不进行校验的接口，格式是正则表达式
    path: [/^\/users(\/login||\/list)/],
  })
);

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(notice.routes(), notice.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
