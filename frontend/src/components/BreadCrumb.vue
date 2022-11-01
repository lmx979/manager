<template>
    <el-breadcrumb separator="/">
        <template v-for="(route, index) in breadList" :key="route.path">
            <el-breadcrumb-item v-if="index === 0" :to="{ path: '/' }">{{ route.meta.title }}</el-breadcrumb-item>
            <el-breadcrumb-item v-else>{{ route.meta.title }}</el-breadcrumb-item>
        </template>
    </el-breadcrumb>
</template>

<script setup>
import { computed } from "@vue/runtime-core"
import { useRoute } from 'vue-router'
const route = useRoute()
console.log(route.matched);
const breadList = computed(() => {
    return route.matched
})
</script>

<style lang="scss" scoped>

</style>