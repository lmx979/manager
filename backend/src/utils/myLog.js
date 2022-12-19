/**
 * 日志存储封装
 * @date 2022年10月31日20点38分
 * @author Lumxx
 */

// 引入log4js
const log4js = require("log4js");

// 定义级别，大写通常代表常量，log4js.levels.TRACE是一个对象
const levels = {
  trace: log4js.levels.TRACE,
  debug: log4js.levels.DEBUG,
  info: log4js.levels.INFO,
  warn: log4js.levels.WARN,
  error: log4js.levels.ERROR,
  fatal: log4js.levels.FATAL,
};

// 定义相关配置
log4js.configure({
  // 追加器，名字可以自定义
  appenders: {
    console: {
      type: "console", // 控制台输出
    },
    trace: {
      type: "file", // 文件输出
      filename: "log/trace", // 文件名
      pattern: "yyyy-MM-dd.log", // 文件后缀
      alwaysIncludePattern: true, // 文件名和文件后缀结合
    },
    debug: {
      type: "file",
      filename: "log/debug",
      pattern: "yyyy-MM-dd.log",
      alwaysIncludePattern: true,
    },
    info: {
      type: "file",
      filename: "log/info",
      pattern: "yyyy-MM-dd.log",
      alwaysIncludePattern: true,
    },
    warn: {
      type: "file",
      filename: "log/warn",
      pattern: "yyyy-MM-dd.log",
      alwaysIncludePattern: true,
    },
    error: {
      type: "file",
      filename: "log/error",
      pattern: "yyyy-MM-dd.log",
      alwaysIncludePattern: true,
    },
    fatal: {
      type: "file",
      filename: "log/fatal",
      pattern: "yyyy-MM-dd.log",
      alwaysIncludePattern: true,
    },
  },
  // 分类，名称可以自定义
  categories: {
    // default分类必须有，否则报错
    default: {
      // 支持多个追加器
      appenders: ["console"],
      // 定义级别为debug
      level: levels.debug,
    },
    myTrace: {
      appenders: ["trace", "console"],
      level: levels.trace,
    },
    myDebug: {
      appenders: ["debug", "console"],
      level: levels.debug,
    },
    myInfo: {
      appenders: ["info", "console"],
      level: levels.info,
    },
    myWarn: {
      appenders: ["warn", "console"],
      level: levels.warn,
    },
    myError: {
      appenders: ["error", "console"],
      level: levels.error,
    },
    myFatal: {
      appenders: ["fatal", "console"],
      level: levels.fatal,
    },
  },
});

/**
 * 日志输出
 * @param {string} content输出的日志内容
 */
const trace = (content) => {
  // getLogger的参数是之前定义的分类名称
  const logger = log4js.getLogger("myTrace");
  // 触发一个trace日志
  logger.trace(content);
};
const debug = (content) => {
  const logger = log4js.getLogger("myDebug");
  logger.debug(content);
};
const info = (content) => {
  const logger = log4js.getLogger("myInfo");
  logger.info(content);
};
const warn = (content) => {
  const logger = log4js.getLogger("myWarn");
  logger.warn(content);
};
const error = (content) => {
  const logger = log4js.getLogger("myError");
  logger.error(content);
};
const fatal = (content) => {
  const logger = log4js.getLogger("myFatal");
  logger.fatal(content);
};

// 导出
module.exports = { trace, debug, info, warn, error, fatal };
