<script setup>
import { onMounted } from "vue";
import { RouterLink } from "vue-router";
import AdminLayout from "@/layouts/AdminLayout.vue"

import Edit from '@/components/admin/Edit.vue'
import Trash from '@/components/admin/Trash.vue'
import Table from '@/components/Table.vue'
import userTable from '@/components/userTable.vue'

import { useAdminProductStore } from "@/stores/admin/product";

const adminProductStore = useAdminProductStore()

const removeProduct = (index) => {
    adminProductStore.removeProduct(index)
}

onMounted(() => {
    adminProductStore.loadProduct()
})
</script>

<template>
    <AdminLayout>
        <div class="flex items-center justify-between my-4 mx-5">
            <div class="text-5xl font-bold">Product</div>
            <div>
                <RouterLink :to="{ name: 'admin-product-create' }" class="btn btn-neutral">Add New</RouterLink>
            </div>
        </div>

        <div class="divider mt-2"></div>

        <Table :headers="['Name', 'Image', 'Price', 'Quantity', 'Status', 'updateAt', '']">
            <userTable
                :items="adminProductStore.list"
                :removeProduct="removeProduct"
            >
            </userTable>
        </Table>
    </AdminLayout>
</template>

