<template>
    <div class="basic-layout">
        <!-- 左侧的导航栏 -->
        <div class="nav-side"></div>
        <!-- 右侧的内容区 -->
        <div class="content">
            <!-- 顶部导航 -->
            <div class="nav-top">
                <!-- 面包屑导航 -->
                <div class="bread">面包屑导航</div>
                <!-- 用户信息 -->
                <div class="user-info">用户信息</div>
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

<script>
export default {
    name: "Home",
}
</script>

<style lang="scss" scoped>
.basic-layout {

    .nav-side {
        position: fixed;
        width: 200px;
        height: 100vh;
        background-color: #001529;
        color: #fff;
        overflow-y: auto;
        transition: width 0.5s;
    }

    .content {
        margin-left: 200px;

        .nav-top {
            height: 50px;
            line-height: 50px;
            display: flex;
            justify-content: space-between;
            padding: 0 20px;
            border-bottom: 1px solid #ddd;
        }

        .wrapper {
            background-color: #eef0f3;
            padding: 20px;
            height: calc(100vh - 50px);

            .main-page {
                background-color: #fff;
                height: 100%;
            }
        }
    }
}
</style>
