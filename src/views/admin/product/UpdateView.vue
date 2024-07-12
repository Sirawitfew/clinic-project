<script setup>
import { onMounted , reactive , ref } from 'vue';
import { useRoute , useRouter ,RouterLink } from 'vue-router';

import { useAdminProductStore } from '@/stores/admin/product';

import AdminLayout from '@/layouts/AdminLayout.vue'

const adminProduct = useAdminProductStore()
const route = useRoute()
const router = useRouter()

const productIndex = ref(-1)
const mode = ref('ADD')

const formData = [
    {
        name: 'Name',
        field: 'name'
    },
    {
        name: 'Image',
        field: 'imageUrl'
    },
    {
        name: 'Price',
        field: 'price'
    },
    {
        name: 'Quantity',
        field: 'quantity'
    },
    {
        name: 'About',
        field: 'about'
    },
]

const productData = reactive({
    name: '',
    imageUrl: '',
    price: 0,
    quantity: 0,
    about: '',
    status: ''
})

const updateProduct = () => {
    if (mode.value === 'EDIT') {
        adminProduct.updateProduct(productIndex.value , productData)
    } else {
        adminProduct.addProduct(productData)
    }
    router.push({name:'admin-product-list'})
}
</script>

<template>
    <AdminLayout>
        <div class=" shadow-xl p-8">
            <div class="text-2xl font-bold">{{ mode }}</div>
            <div class="divider"></div>
            <div class="grid grid-cols-2 gap-2">
                <div v-for="form in formData" class="form-control w-full " :key="form">
                    <div class="label">
                        <span class="label-text">{{ form.name }}</span>
                    </div>
                    <input 
                        type="text" 
                        class="input input-bordered w-full" 
                        v-model="productData[form.field]"
                    />
                </div>
            </div>

            <div class="divider"></div>

            <div class="grid grid-cols-2 gap-2">
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Status</span>
                    </div>
                    <select v-model="productData.status" class="select select-bordered">
                        <option disabled selected>choose status</option>
                        <option value="open">Open</option>
                        <option value="close">Close</option>
                    </select>
                </label>
            </div>
            <div class="flex mt-4 justify-end">
                <RouterLink :to="{ name: 'admin-product-list'}" class="btn btn-ghost">BACK</RouterLink>
                <button class="btn btn-neutral" @click="updateProduct()">{{ mode }}</button>
            </div>
        </div>
    </AdminLayout>
</template>