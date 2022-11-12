<template>
    <div class="basic-layout">
        <!-- 左侧的导航栏 -->
        <div :class="['nav-side', isCollapse ? 'fold' : 'expand']">
            <!-- logo -->
            <div class="logo">
                <img src="../assets/images/logo.png" alt="" />
                <span>Manager</span>
            </div>
            <!-- 导航菜单 -->
            <el-menu default-active="route.path" background-color="#001529" text-color="#fff" :collapse="isCollapse" router>
                <!-- 将定义好的菜单数据传递给子组件 -->
                <Menu :menuList="menuList" />
            </el-menu>
        </div>
        <!-- 右侧的内容区 -->
        <div :class="['content', isCollapse ? 'fold' : 'expand']">
            <!-- 顶部导航 -->
            <div class="nav-top">
                <div class="nav-left">
                    <!-- 切换左侧导航栏开关的图标 -->
                    <el-icon v-if="!isCollapse" @click="toggle">
                        <Fold />
                    </el-icon>
                    <el-icon v-else @click="toggle">
                        <Expand />
                    </el-icon>
                    <!-- 面包屑导航 -->
                    <div class="bread">
                        <BreadCrumb />
                    </div>
                </div>
                <!-- 用户信息 -->
                <div class="user-info">
                    <!-- 通知图标 -->
                    <el-badge :is-dot="Boolean(noticeCount)" class="notice">
                        <el-icon>
                            <Bell />
                        </el-icon>
                    </el-badge>
                    <!-- 用户名，下拉菜单 -->
                    <el-dropdown @command="handleCommand">
                        <span class="user-link">{{ userInfo.userName }}</span>
                        <template #dropdown>
                            <el-dropdown-item command="email">邮箱：{{ userInfo.userEmail }}</el-dropdown-item>
                            <el-dropdown-item command="logout">退出</el-dropdown-item>
                        </template>
                    </el-dropdown>
                </div>
            </div>
            <!-- 主内容区 -->
            <div class="wrapper">
                <!-- 主页面 -->
                <div class="main-page">
                    <!-- 路由组件 -->
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useStore } from "vuex"
// 生命周期函数，组件挂载后触发
import { onMounted } from "vue"
// 导入api：表单验证成功后，进行ajax请求
import api from "../api"
import Menu from "./Menu.vue"
import BreadCrumb from "./BreadCrumb.vue"
const store = useStore()
const router = useRouter()
const route = useRoute()
// 从vuex中获取用户信息
const userInfo = store.state.userInfo
// 组件挂载之后触发获取
onMounted(() => {
    // 自动触发获取消息数量函数
    getNoticeCount()
    // 获取菜单列表
    getMenuList()
})
// 定义左侧列表
const menuList = ref([])
// 获取菜单列表
function getMenuList() {
    api.menuList().then((res) => {
        // 更新MenuList数据
        menuList.value = res
    })
}
// 定义消息数量和消息状态
const noticeCount = ref(0)
// 获取消息数量
function getNoticeCount() {
    api.noticeCount().then((res) => {
        // 更新noticeCount数据
        noticeCount.value = res
    })
}
// 默认展开
const isCollapse = ref(false)
// 侧边栏展开折叠
const toggle = () => {
    isCollapse.value = !isCollapse.value
}
// 定义点击事件
const handleCommand = (key) => {
    if (key === "email") {
        return false
    }
    // 退出操作
    if (key === "logout") {
        // 清除vuex里的数据
        store.commit("removeUserInfo")
        // 跳转登录页
        router.push("/login")
    }
}
</script>

<style lang="scss" scoped>
.basic-layout {
    .nav-side {
        position: fixed;

        &.fold {
            width: 64px;
        }

        &.expand {
            width: 200px;
        }

        height: 100vh;
        background-color: #001529;
        color: #fff;
        overflow-y: auto;
        transition: width 0.5s;
        overflow-x: hidden;

        .logo {
            display: flex;
            align-items: center;
            font-size: 18px;
            height: 50px;

            img {
                width: 32px;
                height: 32px;
                margin: 0 16px;
            }

            span {
                color: #fff;
            }
        }

        .el-menu {
            border-right: none;
        }
    }

    .content {
        transition: margin-left 0.5s;

        &.fold {
            margin-left: 64px;
        }

        &.expand {
            margin-left: 200px;
        }

        .nav-top {
            height: 50px;
            line-height: 50px;
            display: flex;
            justify-content: space-between;
            padding: 0 20px;
            border-bottom: 1px solid #ddd;

            .nav-left {
                display: flex;
                align-items: center;

                .el-icon {
                    margin-right: 15px;
                    font-size: 20px;
                }
            }

            .user-info {
                display: flex;
                align-items: center;

                .notice {
                    font-size: 22px;
                    line-height: 16px;
                    margin-right: 16px;
                }

                &:hover {
                    cursor: pointer;
                }

                .user-link {
                    color: #409eff;
                    font-weight: bold;
                }
            }
        }

        .wrapper {
            background-color: #eef0f3;
            padding: 20px;
            height: calc(100vh - 50px);

            .main-page {
                height: 100%;
            }
        }
    }
}
</style>
