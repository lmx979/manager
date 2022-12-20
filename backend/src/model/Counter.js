/**
 * 维护用户id子增长表
 * @date 2022年12月20日 16:41
 * @author Lumxx
 */

const mongoose = require("../db/conn");
// 配置字段格式
const CounterSchema = mongoose.Schema({
  _id: String,
  sequence_value: Number,
});
// 定义模型
const Counter = mongoose.model("counter", CounterSchema);
module.exports = Counter;
