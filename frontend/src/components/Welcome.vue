<template>
    <!-- 欢迎页 -->
    <div class="welcome">
        <div class="content">
            <div class="sub-title">欢迎使用</div>
            <div class="title">通用后台管理系统</div>
            <div class="desc">Vue3.0 + ElementPlus + Node + MongoDB 通用后台管理系统</div>
        </div>
        <img src="../assets/images/welcome.png" alt="">
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.welcome {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    .content {
        position: relative;
        bottom: 30px;

        .sub-title {
            font-size: 30px;
            line-height: 42px;
            color: #333;
        }

        .title {
            font-size: 40px;
            line-height: 62px;
            color: #409eff;
        }

        .desc {
            font-size: 16px;
            line-height: 20px;
            color: #999;
        }
    }

    img {
        width: 371px;
        height: 438px;
        margin-left: 100px;
    }
}
</style>
