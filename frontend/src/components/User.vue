<template>
    <div class="user-manager">
        <!-- 查询用户表单 -->
        <div class="query-form">
            <el-form inline :model="user" ref="formRef">
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
                    <el-button type="danger" @click="handleReset(formRef)">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 用户列表表格 -->
        <div class="base-table">
            <div class="action">
                <el-button type="primary">新增用户</el-button>
                <el-button type="danger" @click="multiDalete">批量删除</el-button>
            </div>
            <el-table stripe :data="userList" style="width:100%" ref="multiTableRef" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="30" />
                <el-table-column show-overflow-tooltip v-for="item in columns" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width" :formatter="item.formatter" />
                <el-table-column label="操作" width="130" fixed="right">
                    <template #default="scope">
                        <el-button type="info">编辑</el-button>
                        <el-button type="danger" @click="handleDelete(scope.row.userId)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="pagination" small layout="prev, pager, next" :page-size="pager.pageSize" :total="pager.total || 0" @current-change="handleCurrentChange" hide-on-single-page />
        </div>
    </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { reactive, ref, onMounted } from "vue";
import api from "../api";
import util from "../utils/util"
// 表单引用
const formRef = ref();
// 查询信息
const user = reactive({
    state: 0
})
// 表格字段
const columns = reactive([
    {
        label: "用户ID",
        prop: "userId",
        width: "100"
    },
    {
        label: "用户名",
        prop: "userName",
        width: "150"
    },
    {
        label: "用户邮箱",
        prop: "userEmail",
    },
    {
        label: "用户角色",
        prop: "role",
        width: "90",
        formatter(row, column, value) {
            const roleObj = {
                0: "管理员",
                1: "普通用户"
            }
            return roleObj[value]
        }
    },
    {
        label: "用户状态",
        prop: "state",
        width: "90",
        formatter(row, column, value) {
            const stateObj = {
                1: "在职",
                2: "离职",
                3: "试用期"
            }
            return stateObj[value]
        }
    },
    {
        label: "注册时间",
        prop: "createTime",
        width: "150",
        formatter(row, column, value) {
            return util.utc2bj(value);
        }
    },
    {
        label: "最后登录时间",
        prop: "lastLoginTime",
        width: "150",
        formatter(row, column, value) {
            return util.utc2bj(value);
        }
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
// 删除用户
function handleDelete(userId) {
    const params = [userId]
    api.userDelete(params).then((res) => {
        if (res.nModified === 1) {
            // 重新获取用户列表
            getUserList()
        }
    })
}
// 选中的用户id
const checkedUserIds = ref([])
// 点击复选框触发函数
const handleSelectionChange = (val) => {
    // 定义数组存放选中的userId
    const arr = []
    val.forEach((el) => {
        arr.push(el.userId)
    })
    checkedUserIds.value = arr
};
// 批量删除用户
function multiDalete() {
    if (checkedUserIds.value.length === 0) {
        ElMessage.error("请选择要删除的用户")
        return
    }
    const params = {
        userIds: checkedUserIds.value
    }
    api.userDelete(params).then((res) => {
        if (res.nModified > 0) {
            ElMessage.success("批量删除成功")
            getUserList()
        } else {
            ElMessage.error("批量删除失败")
        }
    })
}
</script>

<style lang="scss" scoped>

</style>