<template>
    <div class="user-manager">
        <!-- 查询用户表单 -->
        <div class="query-form">
            <el-form inline :model="user" ref="form">
                <el-form-item label="用户ID" prop="userId">
                    <el-input v-model="user.userId" placeholder="请输入用户ID" />
                </el-form-item>
                <el-form-item label="用户名称" prop="userName">
                    <el-input v-model="user.userName" placeholder="请输入用户名称" />
                </el-form-item>
                <el-form-item label="用户状态" prop="state">
                    <el-select v-model="user.state">
                        <el-option :value="0" label="所有"></el-option>
                        <el-option :value="1" label="在职"></el-option>
                        <el-option :value="2" label="离职"></el-option>
                        <el-option :value="3" label="试用期"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleQuery">查询</el-button>
                    <el-button type="danger" @click="handleReset(form)">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 用户列表表格 -->
        <div class="base-table">
            <div class="action">
                <el-button type="primary">查询</el-button>
                <el-button type="danger">删除</el-button>
            </div>
            <el-table :data="userList" style="width:100%">
                <el-table-column type="selection" width="55" />
                <el-table-column v-for="item in columns" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width" />
                <el-table-column label="操作" width="150">
                    <template #default>
                        <el-button type="info">编辑</el-button>
                        <el-button type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="pagination" small layout="prev, pager, next" :page-size="pager.pageSize" :total="pager.total || 0" @current-change="handleCurrentChange" hide-on-single-page />
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import api from "../api";
// 表单引用
const form = ref();
// 查询信息
const user = reactive({
    state: 0
})
// 表格字段
const columns = reactive([
    {
        label: "用户ID",
        prop: "userId"
    },
    {
        label: "用户名",
        prop: "userName"
    },
    {
        label: "用户邮箱",
        prop: "userEmail"
    },
    {
        label: "用户角色",
        prop: "role"
    },
    {
        label: "用户状态",
        prop: "state"
    },
    {
        label: "注册时间",
        prop: "createTime"
    },
    {
        label: "最后登录时间",
        prop: "lastLoginTime"
    }
])
// 组件挂载后触发
onMounted(() => {
    getUserList();
})
// 用户列表
const userList = ref([])
// 分页
const pager = ref([])
// 获取用户列表和分页信息
function getUserList() {
    // 设置参数
    const params = { ...pager.value, ...user }
    api.userList(params).then((res) => {
        // 解构
        const { list, page } = res
        // 更新数据
        userList.value = list
        pager.value = page
    })
}
// 翻页函数
const handleCurrentChange = (val) => {
    // 更新页数
    pager.pageNum = val
    // 请求接口
    getUserList()
}
// 查询函数
function handleQuery() {
    // 请求接口
    getUserList()
}
// 重置函数
function handleReset(form) {
    form.resetFields()
    getUserList()
}
</script>

<style lang="scss" scoped>

</style>