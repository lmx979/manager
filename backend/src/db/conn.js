/*
 * 数据库连接
 * @date 2022年11月1日01点46分
 * @author Lumxx
 */

// 引用mongoose
const mongoose = require("mongoose");
// 引入封装好的日志
const myLog = require("../utils/myLog");
// 引入配置文件
const config = require("../config/index");
// 开始连接
mongoose.connect(config.URL);
// 获取连接对象
const conn = mongoose.connection;
// 监听错误
conn.on("error", () => {
  myLog.error("数据库连接失败");
});
// 监听成功
conn.on("open", () => {
  myLog.info("数据库连接成功");
});
// 导出
module.exports = mongoose;
