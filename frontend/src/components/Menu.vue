<template>
    <!-- 遍历menuList，获取一级菜单 -->
    <template v-for="menu in menuData.menuList" :key="menu._id">
        <!-- 父菜单 -->
        <el-sub-menu v-if="menu.children !== undefined && menu.children.length > 0 && menu.children[0].menuType === '1'" :index="menu.path">
            <template #title>
                <el-icon>
                    <component :is="menu.icon.split('-').pop()" />
                </el-icon>
                <span>{{ menu.menuName }}</span>
            </template>
            <!-- 递归展示 -->
            <Menu :menuList="menu.children" />
        </el-sub-menu>
        <!-- 子菜单 -->
        <el-menu-item v-else-if="menu.children !== undefined && menu.children.length > 0 && menu.children[0].menuType === '2'" :index="menu.path">{{ menu.menuName }}</el-menu-item>
    </template>
</template>

<script setup>
import Menu from "./Menu.vue"
<<<<<<< HEAD
=======
// 定义接收属性
import { defineProps } from "vue";
>>>>>>> 0e71a1244abe57e506ed2854f3af618ff09895cb
// 定义从父组件接收的属性
const menuData = defineProps({
    menuList: { type: Array }
})
</script>

<style lang="scss" scoped>

</style>