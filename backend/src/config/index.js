/**
 * 配置文件
 * @date 2022年11月1日01点44分
 * @author Lumxx
 */

// 定义url
<<<<<<< HEAD
const url = "mongodb://127.0.0.1:27017";
=======
const url = "mongodb://localhost:27017";
>>>>>>> 0e71a1244abe57e506ed2854f3af618ff09895cb
// 定义数据库的名字
const dbName = "manager";
// 拼接url
const URL = `${url}/${dbName}`;
// 导出配置
module.exports = { URL };
