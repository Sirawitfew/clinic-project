<script setup>
import { RouterLink } from "vue-router";
import { useAdminUserStore } from '@/stores/admin/user'

import AdminLayout from '@/layouts/AdminLayout.vue'

import Edit from '@/components/admin/Edit.vue'
import Trash from '@/components/admin/Trash.vue'
import Table from '@/components/Table.vue'

const adminUserStore = useAdminUserStore()

const changeStatus = (index) => {
    const selectedUser = adminUserStore.list[index]
    selectedUser.status = selectedUser.status === 'active' ? 'inactive' : 'active'
    adminUserStore.updateUser(selectedUser)
}
</script>

<template>
    <AdminLayout>
        <Table :headers="['Name', 'Role', 'Status', 'updateAt', '']">
            <tr v-for="(user, index) in adminUserStore.list" :key="user">
                <td>{{ user.fullname }}</td>
                <td>{{ user.role }}</td>
                <td>{{ user.status }}</td>
                <td>{{ user.updatedAt }}</td>
                <td>
                    <div class="flex gap-2">
                        <RouterLink :to="{ name: 'admin-user-update', params: { id: index } }" class="btn">Edit
                        </RouterLink>
                        <button class="btn" @click="changeStatus(index)">
                            {{ user.status === 'active' ? 'Disable' : 'Enable' }}
                        </button>
                    </div>
                </td>
            </tr>
        </Table>
    </AdminLayout>
</template>