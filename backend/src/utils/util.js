/**
 * 后台通用的工具函数
 * @date 2022年10月31日21点47分
 * @author Lumxx
 */

// 定义错误码，大写通常表示常量
const CODE = {
  SUCCESS: 0, // 没有错误
  PARAM_ERROR: 1001, //参数不正确
  USER_ACCOUNT_ERROR: 2001, // 用户账号密码错误
  USER_LOGIN_ERROR: 3001, // 用户未登录
  BUSINESS_ERROR: 4001, // 业务请求失败
  AUTH_ERROR: 5001, // 认证失败或Token过期
};

/**
 * 分页结构
 * @param {object} pageNum第几页，pageSize每页多少条
 */
function pager({ pageNum = 1, pageSize = 10 }) {
  // pageNum,pageSize参数转数字
  pageNum *= 1;
  pageSize *= 1;
  // 数据库查询数据，需要起始索引和查询条数
  // 根据pageNum和pageSize，可以计算起始索引
  const skipIndex = (pageNum - 1) * pageSize;
  // 返回数据
  return {
    page: { pageNum, pageSize },
    skipIndex,
  };
}

// 导入封装好的日志对象
const myLog = require("./myLog");

/**
 * 成功请求的封装，第一个参数data，方便调用时传参，code默认成功，可以不传
 * @param {object} data数据
 * @param {string} msg信息
 * @param {number} code错误码
 * returns {object} 包含数据，信息，错误码的对象
 */
function success(data = "", msg = "", code = CODE.SUCCESS) {
  // 利用封装好的日志方法，进行打印日志
  myLog.debug(JSON.stringify(data));
  return { data, msg, code };
}

/**
 * 错误请求的封装，第一个参数msg，方便调用时传参，默认错误码为业务请求失败，错误状态下，data默认为空
 * @param {string} msg信息
 * @param {number} code错误码
 * @param {object} data数据
 * @returns {object} 包含数据，信息，错误码的对象
 */
function fail(msg = "", code = CODE.BUSINESS_ERROR, data = "") {
  myLog.error(JSON.stringify(data));
  return { data, msg, code };
}

// 导出
module.exports = { pager, success, fail };
