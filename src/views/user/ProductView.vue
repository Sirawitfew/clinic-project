<script setup>
import { defineProps, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { useUserProductStore } from '@/stores/user/product';
import { useUserCartStore } from '@/stores/user/cart';

import UserLayout from '@/layouts/UserLayout.vue';
import Product from '@/components/Product.vue';

const userProductStore = useUserProductStore()
const userCartStore = useUserCartStore()
const router = useRouter()

const addToCart = (product) => {
    try {
        userCartStore.addToCart(product)
    } catch (error) {
        console.log('error', error)
    }
}

</script>

<template>
    <UserLayout>
        <div class="flex justify-center items-center">
            <div
                class="flex bg-[#FFD600] rounded-full w-[27%] h-20 justify-center items-center bg-opacity-50 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                <p
                    class="text-xl sm:text-3xl md:text-3xl lg:text-5xl font-semibold text-left text-[#fefeff] stroke-text">
                    ข้อมูลสินค้า</p>
            </div>
        </div>
        <Product
            :products="userProductStore.list"
            :addToCart="addToCart"
        ></Product>
        
    </UserLayout>
</template>