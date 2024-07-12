<script setup>
import { RouterLink } from "vue-router";
import AdminLayout from "@/layouts/AdminLayout.vue";

import { useAdminOrderStore } from "@/stores/admin/order";
import Table from "@/components/Table.vue";

const adminOrderStore = useAdminOrderStore()
</script>

<template>
    <AdminLayout>
        <div class="flex items-center justify-between max-w-5xl mx-auto my-4">
            <div class="text-5xl font-bold">Order</div>
        </div>
        <Table :headers="['Customer Name', 'Price', 'Status', 'UpdateAt']">
            <tr v-for="(order, index) in adminOrderStore.list" :key="order">
                <td>{{ order.customerName }}</td>
                <td>{{ order.totalPrice }}</td>
                <td>{{ order.status }}</td>
                <td>{{ order.updatedAt }}</td>
                <td>
                    <RouterLink :to="{ name: 'admin-order-detail', params: { id: index } }" class="btn">See detail
                    </RouterLink>
                </td>
            </tr>
        </Table>
    </AdminLayout>
</template>