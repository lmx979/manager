/**
 * storage二次封装
 * @date 2022年10月31日00点32分
 * @author Lumxx
 */

// 引入配置config
import config from "../config/index";

// 封装的时候，尽量和原生api相似，减少记忆成本
export default {
  // 设置
  setItem(name, value) {
    // 定义需要存储的名值
    // 存储的key是当前的命名空间
    const storageKey = config.namespace;
    // 存储的value是接收的两个形参
    let storageValue = { [name]: value };
    // 先取出原来的storage对应的value对象，如果没有，返回空对象
    let oldStorageValue = window.localStorage.getItem(storageKey) || "{}";
    // json字符串转对象
    oldStorageValue = JSON.parse(oldStorageValue);
    // 对象合并：原有的数据和新数据放在一起，注意同名覆盖
    storageValue = { ...oldStorageValue, ...storageValue };
    // 对象转json字符串
    storageValue = JSON.stringify(storageValue);
    // 把接收到的name和value写入原来的value对象里面，需要先把原来的value对象取出，进行序列化
    window.localStorage.setItem(storageKey, storageValue);
  },
  // 获取
  getItem(name) {
    // 通过命名空间，找到存储的value对象
    let storageValue = window.localStorage.getItem(config.namespace) || "{}";
    storageValue = JSON.parse(storageValue);
    // 通过name从对象中取值并返回
    return storageValue[name];
  },
  // 删除
  removeItem(name) {
    // 通过命名空间找到对象
    let storageValue = window.localStorage.getItem(config.namespace) || "{}";
    storageValue = JSON.parse(storageValue);
    // 删除name值
    delete storageValue[name];
    // 删除之后需要写回去
    storageValue = JSON.stringify(storageValue);
    // 使用原生api
    window.localStorage.setItem(config.namespace, storageValue);
  },
  // 清除
  clear() {
    // 调用原生api即可
    window.localStorage.clear();
  },
};
