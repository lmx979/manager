/**
 * 环境配置封装
 * @date 2022年10月30日22点18分
 * @author Lumxx
 */

// 获取当前的环境类型，如果没有设置，默认生产环境
const env = import.meta.env.MODE === "development" ? "dev" : "prod";

// 定义相关配置
const EnvConfig = {
  // 开发环境
  dev: {
    // 直接访问后端接口根路径
    baseApi: "//localhost:3000",
    mockApi: "https://www.fastmock.site/mock/81adf08f799f9107f501e3e1d90cebba/api",
  },
  // 生产环境
  prod: {
    baseApi: "//future.com/api", // 双斜线定义的路径是相对路径的一种，省了协议http或https，会根据实际情况动态的添加
    mockApi: "https://www.fastmock.site/mock/81adf08f799f9107f501e3e1d90cebba/api",
  },
};

// 导出
export default {
  // 当前环境为开发环境
  env: env,
  // 是否需要mock接口（临时用的测试接口）
  mock: true,
  // storage的命名空间
  namespace: "manager",
  // 接口调用地址，解构即可
  ...EnvConfig[env],
};
