<template>
    <!-- 登录页 -->
    <div class="login-wrapper">
        <!-- 模态框 -->
        <div class="modal">
            <!-- 登录表单 -->
            <el-form ref="userFormRef" :model="user" status-icon :rules="rules">
                <!-- 标题 -->
                <div class="title">后台管理系统</div>
                <!-- 表单元素 -->
                <el-form-item prop="userName">
                    <el-input type="text" :prefix-icon="User" v-model="user.userName" />
                </el-form-item>
                <el-form-item prop="userPassword">
                    <el-input type="password" :prefix-icon="View" v-model="user.userPassword" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="btn-login" @click="login(userFormRef)">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
// 引入ref：生产响应式数据
import { reactive, ref } from "vue"
// 导入useRouter：路由跳转
import { useRouter } from "vue-router";
// 导入api：表单验证成功后，进行ajax请求
import api from "../api"
// 导入useStore：验证通过后，将用户信息存入vuex和localstorage中
import { useStore } from "vuex"
// 引入图标：需要显示在视图层
import { User, View } from "@element-plus/icons-vue"
// 使用路由
const router = useRouter();
// 创建store
const store = useStore();
// 定义表单的用户数据
const user = reactive({ userName: "", userPassword: "" });
// 在setup中，获取模板的引用将存储在名字匹配的ref中
const userFormRef = ref();
// 定义表单的验证规则
const rules = {
    userName: {
        required: true, // 必传
        message: "请输入用户名", // 不符合规则时的错误信息
        trigger: "blur", // 失去焦点触发
    },
    userPassword: {
        required: true,
        message: "请输入密码",
        trigger: "blur",
    }
}
// 登录按钮点击事件触发的login方法
function login(formRef) {
    // 进行验证，参数是一个回调函数，形参valid是验证的结果
    formRef.validate((valid) => {
        if (valid) {
            // 调用封装好的ajax方法，进行用户的登录
            api.login(user).then((res) => {
                // 保存信息
                store.commit("saveUserInfo", res);
                // 登录成功后，跳转首页
                router.push("/")
            })
        } else {
            return false;
        }
    })
}
</script>

<style lang="scss" scoped>
.login-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f8fcff;
    width: 100vw;
    height: 100vh;

    .modal {
        width: 500px;
        padding: 50px;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 0 10px 3px #dad9d9;

        .title {
            font-size: 50px;
            line-height: 1.5;
            text-align: center;
            margin-bottom: 30px;
        }

        .btn-login {
            width: 100%;
        }
    }
}
</style>
