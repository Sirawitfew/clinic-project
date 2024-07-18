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

const removeProduct = async (index) => {
    await adminProductStore.removeProduct(index)
    await adminProductStore.loadProduct()
}

onMounted(async () => {
    await adminProductStore.loadProduct()
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
            <tr v-for="(product, index) in adminProductStore.list" :key="index">
                <th class="w-[20%]">{{ product.name }}</th>
                <td>
                    <div class="avatar">
                        <div class="w-14 rounded">
                            <img :src="product.imageUrl" />
                        </div>
                    </div>
                </td>
                <td>{{ product.price }}</td>
                <td>{{ product.remainQuantity }} / {{ product.quantity }}</td>
                <td>
                    <div :class="['badge', product.status === 'close' ? 'badge-error' : 'badge-success']">
                        {{ product.status }}
                    </div>
                </td>
                <td>{{ product.updatedAt }}</td>
                <td>
                    <RouterLink :to="{ name: 'admin-product-update', params: { id: product.productId } }"
                        class="btn btn-ghost">
                        <svg class="feather feather-edit" fill="none" height="24" stroke="currentColor"
                            stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"
                            width="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                    </RouterLink>
                    <div class="btn btn-ghost" @click="removeProduct(product.productId)">
                        <svg fill="[#000000]" height="24" enable-background="new 0 0 32 32" id="Glyph" version="1.1"
                            viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink">
                            <path
                                d="M6,12v15c0,1.654,1.346,3,3,3h14c1.654,0,3-1.346,3-3V12H6z M12,25c0,0.552-0.448,1-1,1s-1-0.448-1-1v-9  c0-0.552,0.448-1,1-1s1,0.448,1,1V25z M17,25c0,0.552-0.448,1-1,1s-1-0.448-1-1v-9c0-0.552,0.448-1,1-1s1,0.448,1,1V25z M22,25  c0,0.552-0.448,1-1,1s-1-0.448-1-1v-9c0-0.552,0.448-1,1-1s1,0.448,1,1V25z"
                                id="XMLID_237_" />
                            <path
                                d="M27,6h-6V5c0-1.654-1.346-3-3-3h-4c-1.654,0-3,1.346-3,3v1H5C3.897,6,3,6.897,3,8v1c0,0.552,0.448,1,1,1h24  c0.552,0,1-0.448,1-1V8C29,6.897,28.103,6,27,6z M13,5c0-0.551,0.449-1,1-1h4c0.551,0,1,0.449,1,1v1h-6V5z"
                                id="XMLID_243_" />
                        </svg>
                    </div>
                </td>
            </tr>
        </Table>
    </AdminLayout>
</template>
