/**
 * 配置文件
 * @date 2022年11月1日01点44分
 * @author Lumxx
 */

// 定义url
const url = "mongodb://localhost:27017";
// 定义数据库的名字
const dbName = "manager";
// 拼接url
const URL = `${url}/${dbName}`;
// 导出配置
module.exports = { URL };
