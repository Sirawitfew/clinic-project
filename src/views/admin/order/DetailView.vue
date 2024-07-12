<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import AdminLayout from "@/layouts/AdminLayout.vue";
import { useAdminOrderStore } from "@/stores/admin/order";

const orderIndex = ref(-1)
const route = useRoute()
const router = useRouter()
const adminOrderStore = useAdminOrderStore()
const orderData = ref({
    products: []
})

onMounted(() => {
    if (route.params.id) {
        orderIndex.value = parseInt(route.params.id)
        const selectedOrder = adminOrderStore.getOrder(orderIndex.value)
        orderData.value = selectedOrder
    }
})
</script>

<template>
    <AdminLayout>
        <div class="shadow-xl p-8 mt-4 max-w-5xl mx-auto">
            <div class="text-4xl font-bold">Order Detail id: {{ orderIndex }}</div>
            <div class="divider"></div>

            <div class="grid grid-cols-2 gap-2">
                <div>
                    <div class="font-bold">Order Date</div>
                    <div>{{ orderData.updatedAt }}</div>
                </div>
                <div>
                    <div class="font-bold">Number</div>
                    <div>##{{ orderData.no }}</div>
                </div>
                <div>
                    <div class="font-bold">Payment Method</div>
                    <div>{{ orderData.paymentMethod }}</div>
                </div>
                <div>
                    <div class="font-bold">Address</div>
                    <div>{{ orderData.address }}</div>
                </div>
            </div>

            <div class="divider"></div>

            <div v-for="product in orderData.products" :key="product" class="grid grid-cols-4 items-center">
                <div>
                    <!-- Image Avatar Dai-->
                    <div class="avatar">
                        <div class="w-40 rounded">
                            <img :src="product.imageUrl" />
                        </div>
                    </div>
                </div>

                <div>
                    <div class="font-bold">{{ product.name }}</div>
                    <div>{{ product.description }}</div>
                </div>

                <div class="mx-auto">
                    จำนวน {{ product.quantity }} ชิ้น
                </div>
                <div class="mx-auto">
                    {{ product.price }} ฿
                </div>
            </div>

            <div class="divider"></div>

            <div class="flex justify-between mx-5">
                <div class="font-bold">ราคาสินค้าทั้งหมด</div>
                <div class="mx-5">{{ orderData.totalPrice }}</div>
            </div>
            <div class="flex justify-end mt-5 mx-5">
                <RouterLink :to="{ name: 'admin-order-list' }" class="btn btn-ghost">Back</RouterLink>
            </div>
        </div>
    </AdminLayout>
</template>