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
                <el-button type="primary" @click="addUser">新增用户</el-button>
                <el-button type="danger" @click="multiDalete">批量删除</el-button>
            </div>
            <el-table stripe :data="userList" style="width:100%" ref="multiTableRef" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="30" />
                <el-table-column show-overflow-tooltip v-for="item in columns" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width" :formatter="item.formatter" />
                <el-table-column label="操作" width="130" fixed="right">
                    <template #default="scope">
                        <el-button type="info" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="danger" @click="handleDelete(scope.row.userId)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="pagination" small layout="prev, pager, next" :page-size="pager.pageSize" :total="pager.total || 0" @current-change="handleCurrentChange" hide-on-single-page />
        </div>
        <!-- 用户新增弹框 -->
        <el-dialog v-model="showModal" :title="actionName + '用户'">
            <el-form ref="dialogForm" :model="addUserForm" label-width="20%" :rules="rules">
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="addUserForm.userName" placeholder="请输入用户名称" :disabled="action === 'edit'" />
                </el-form-item>
                <el-form-item label="邮箱" prop="userEmail">
                    <el-input v-model="addUserForm.userEmail" placeholder="请输入用户邮箱" :disabled="action === 'edit'">
                        <template #append>@163.com</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="addUserForm.mobile" placeholder="请输入手机号" />
                </el-form-item>
                <el-form-item label="岗位" prop="job">
                    <el-input v-model="addUserForm.job" placeholder="请输入岗位" />
                </el-form-item>
                <el-form-item label="状态" prop="state">
                    <el-select v-model="addUserForm.state">
                        <el-option :value="1" label="在职"></el-option>
                        <el-option :value="2" label="离职"></el-option>
                        <el-option :value="3" label="试用期"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="系统角色" prop="roleList">
                    <el-select v-model="addUserForm.roleList" placeholder="请选择用户系统角色" multiple>
                        <el-option v-for="role in roleList" :key="role._id" :label="role.roleName" :value="role._id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="部门" prop="deptId">
                    <el-cascader v-model="addUserForm.deptId" placeholder="请选择所属部门" :options="deptList" :props="{ checkStrictly: true, value: '_id', label: 'deptName' }" clearable style="width:90%">
                    </el-cascader>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="handleCancel(dialogForm)">取消</el-button>
                    <el-button type="primary" @click="handleConfirm(dialogForm)">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { reactive, ref, onMounted, toRaw, nextTick } from "vue";
import api from "../api";
import util from "../utils/util"
// 表单引用
const formRef = ref();
// 查询数据
const user = reactive({
    state: 1
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
    getUserList()
    getDeptList()
    getRoleList()
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
    pager.value.pageNum = val;
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
// 新增用户对话框是否显示
const showModal = ref(false);
// 对话框表单属性值
const addUserForm = reactive({
    state: 2
});
// 校验规则
const rules = reactive({
    userName: [
        {
            required: true,
            message: "请输入用户名称",
            trigger: "blur",
        },
    ],
    userEmail: [
        {
            required: true,
            message: "请输入用户邮箱",
            trigger: "blur"
        }
    ],
    mobile: [
        {
            pattern: /1[3-9]\d{9}/,
            message: "请输入正确的手机号格式",
            trigger: "blur",
        },
    ],
    deptId: [
        {
            required: true,
            message: "请输入用户邮箱",
            trigger: "blur",
        },
    ],
});
// 所有角色列表
const roleList = ref([]);
// 获取角色列表
function getRoleList() {
    api.getRoleList().then((res) => {
        roleList.value = res;
    });
}
// 所有部门列表
const deptList = ref([]);
// 获取部门列表
function getDeptList() {
    api.getDeptList().then((res) => {
        deptList.value = res;
    });
}
// 定义用户操作行为
const action = ref()
// 定义操作名称
const actionName = ref()
// 新增用户
function addUser() {
    action.value = "add"
    actionName.value = "新增"
    showModal.value = true
}
// 编辑用户
function handleEdit(row) {
    action.value = "edit"
    actionName.value = "编辑"
    // 展示弹框
    showModal.value = true;
    // 展示数据到弹框
    //nextTick：渲染完dom立即触发
    nextTick(() => {
        Object.assign(addUserForm, row);
        // 清理掉邮箱的后缀，使用正则替换，g表示匹配并且替换所有符合条件的字符串
        addUserForm.userEmail = addUserForm.userEmail.replace(/@.+$/g, "");
    });
}
// 对话框引用
const dialogForm = ref()
// 点击对话框的取消按钮
function handleCancel(dialogForm) {
    // 重置表单
    handleReset(dialogForm)
    // 关闭对话框
    showModal.value = false
}
// 点击对话框的确定按钮
function handleConfirm(dialogForm) {
    // 校验表单
    dialogForm.validate((valid) => {
        if (valid) {
            let params = { ...toRaw(addUserForm), userEmail: addUserForm.userEmail + "@163.com" }
            params.action = action.value
            // 提交用户信息到服务器
            api.userSubmit(params).then((res) => {
                if (res) {
                    ElMessage.success(actionName.value + "用户成功")
                    handleReset(dialogForm)
                    showModal.value = false
                    // 重新请求用户列表
                    getUserList()
                } else {
                    ElMessage.error(actionName.value + "用户失败")
                    return false
                }
            })
        } else {
            ElMessage.error("信息输入有误")
            return false
        }
    })
}
</script>

<style lang="scss" scoped>
.el-dialog {
    .el-form-item *:first-child {
        width: 90%;
    }
}
</style>
