<script setup>
import { onMounted } from "vue";
import { RouterLink } from "vue-router";
import { useAdminUserStore } from '@/stores/admin/user'

import AdminLayout from '@/layouts/AdminLayout.vue'

import Table from '@/components/Table.vue'

const adminUserStore = useAdminUserStore()

const changeStatus = async (index) => {
    const selectedUser = adminUserStore.list[index]
    selectedUser.status = selectedUser.status === 'active' ? 'inactive' : 'active'
    await adminUserStore.updateUser(selectedUser.uid , selectedUser)
}

onMounted( async () => {
    await adminUserStore.loadUser()
})
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
                        <RouterLink :to="{ name: 'admin-user-update', params: { id: user.uid } }" class="btn">Edit
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