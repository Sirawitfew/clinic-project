<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

import { GoogleAuthProvider , signInWithPopup } from "firebase/auth";
import { auth } from '@/firebase';

import { useUserCartStore } from '@/stores/user/cart';
import { useAccountStore } from '@/stores/account';
import DashboardView from '@/views/admin/DashboardView.vue';

const provider = new GoogleAuthProvider();

const userCartStore = useUserCartStore()
const accountStore = useAccountStore()

const searchText = ref('')
const router = useRouter()

const login = async () => {
    try {
        await accountStore.signInWithGoogle()
    } catch (error) {
        console.log('error' , error)
    }
}

const logout = async () => {
    try {
        await accountStore.logout()
        window.location.reload()
    } catch (error) {
        console.log('error' , error)
    }
}

const handleSearch = (event) => {
    if (event.key === 'Enter') {
        router.push({
            name: 'search',
            query: {
                q: searchText.value
            }
        })
    }
}

onMounted(async () => {
    await accountStore.checkAuth()
})

</script>

<template>
    <div class=" container mx-auto">
        <div
            class="navbar bg-base-100 mb-5 bg-[#FAFAFA] rounded-full my-3 shadow-lg sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <div class="flex-1 mx-3">
                <RouterLink :to="{ name: 'home' }" class="btn btn-ghost text-xl rounded-full">Yourname</RouterLink>
            </div>

            <div class="mx-5 menu">
                <ul class="flex items-center">
                    <li class="mx-4 sm:mx-2">
                        <RouterLink :to="{ name: 'home' }">หน้าแรก</RouterLink>
                    </li>
                    <li class="mx-4 sm:mx-2">
                        <RouterLink :to="{ name: 'promotion'}">โปรโมชั่น</RouterLink>
                    </li>
                    <li class="mx-4 sm:mx-2">
                        <RouterLink :to="{ name: 'product' }">สินค้า</RouterLink>
                    </li>
                    <li class="mx-4 sm:mx-2">
                        <RouterLink :to="{ name: 'service'}">บริการ</RouterLink>
                    </li>
                    <li class="mx-4 sm:mx-2">
                        <RouterLink :to="{ name: 'article' }">บทความ</RouterLink>
                    </li>
                    <li class="mx-4 sm:mx-2">
                        <RouterLink :to="{ name: 'about' }">เกี่ยวกับเรา</RouterLink>
                    </li>
                </ul>
            </div>

            <div class="flex-none gap-2 mx-4">
                <form class="relative mx-auto w-max" @submit.prevent="handleSearch">
                    <input type="search"
                        class="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border-orange-300 focus:pl-16 focus:pr-4"
                        v-model="searchText" 
                        @keyup="handleSearch" />
                    <svg xmlns="http://www.w3.org/2000/svg"
                        class="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-orange-300 peer-focus:stroke-orange-500"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </form>


                <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                        <div class="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span class="badge badge-sm indicator-item">{{ userCartStore.summaryQuantity }}</span>
                        </div>
                    </div>
                    <div tabindex="0" class="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                        <div class="card-body">
                            <span class="text-lg font-bold">{{ userCartStore.summaryQuantity }} Items</span>
                            <span class="text-info">Subtotal: ${{ userCartStore.summaryPrice}}</span>
                            <div class="card-actions">
                                <RouterLink :to="{ name: 'cart' }" class="btn btn-primary btn-block">View cart
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                </div>

                <button @click="login" class="btn btn-ghost" v-if="!accountStore.isLoggedIn">
                    Login
                </button>

                <div v-else class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                        <div class="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                    <ul tabindex="0"
                        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-48 p-2 shadow">
                        <li>
                            <RouterLink :to="{ name: 'profile' }" class="justify-between">แก้ไขข้อมูลส่วนตัว</RouterLink>
                        </li>
                        <li>
                            <a>ตั้งค่า</a>
                        </li>
                        <li>
                            <a @click="logout">ออกจากระบบ</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <slot></slot>

        <div class="hero mt-5 rounded-lg mb-5" style="
        background-image: url(https://img.freepik.com/premium-photo/interior-house-apartment-dining-3d-architecture-inside-hall-white-floor-generative-ai_163305-172769.jpg?w=826);
        ">
            <div class="hero-overlay rounded-lg"></div>
            <div class="hero-content text-center text-neutral-content">
                <div class="max-w-md">
                    <h1 class="mb-5 text-5xl font-bold text-white">ติดต่อเรา</h1>
                    <p class="mb-5">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
                        excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
                        a id nisi.
                    </p>
                    <!-- Social-->
                    <div class="flex space-x-4 justify-center">
                        <!-- Instagram -->
                        <button
                            class="button bg-gradient-to-r from-purple-600 via-red-500 to-yellow-400 hover:bg-gradient-to-r hover:from-purple-600 hover:via-red-500 hover:to-yellow-400">
                            <svg viewBox="0 0 24 24" fill="none" height="24" width="24" aria-hidden="true"
                                class="w-6 h-6 text-gray-800 dark:text-white">
                                <path clip-rule="evenodd"
                                    d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7 2a1 1 0 1 1 2 0 1 1 0 0 1-2 0ZM8 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm4-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"
                                    fill="currentColor" fill-rule="evenodd"></path>
                            </svg>
                        </button>
                        <!-- Twitter -->
                        <button
                            class="button bg-gradient-to-r from-purple-600 via-red-500 to-yellow-400 hover:bg-gradient-to-r hover:from-purple-600 hover:via-red-500 hover:to-yellow-400">
                            <svg viewBox="0 0 24 24" fill="none" height="24" width="24" aria-hidden="true"
                                class="w-6 h-6 text-gray-800 dark:text-white">
                                <path
                                    d="M23.1 4.6a8.8 8.8 0 0 1-2.5.7 4.3 4.3 0 0 0 1.9-2.4c-.9.6-2 .9-3.1 1.2A4.4 4.4 0 0 0 16.1 3c-2.4 0-4.3 2-4.3 4.4 0 .3 0 .6.1.9-3.6-.2-6.8-1.9-9-4.6-.4.6-.6 1.4-.6 2.2 0 1.5.8 2.9 1.9 3.7a4.1 4.1 0 0 1-2-.6v.1c0 2.2 1.5 4 3.6 4.4-.4.1-.8.2-1.3.2-.3 0-.6 0-.9-.1.6 2 2.3 3.3 4.3 3.4A8.7 8.7 0 0 1 1.5 19a10.6 10.6 0 0 0 5.8 1.7c7 0 10.8-6 10.8-11.1 0-.2 0-.4 0-.5a7.8 7.8 0 0 0 2-2.1"
                                    fill="currentColor"></path>
                            </svg>
                        </button>
                        <!-- Facebook -->
                        <button
                            class="button bg-gradient-to-r from-purple-600 via-red-500 to-yellow-400 hover:bg-gradient-to-r hover:from-purple-600 hover:via-red-500 hover:to-yellow-400">
                            <svg viewBox="0 0 24 24" fill="none" height="24" width="24" aria-hidden="true"
                                class="w-6 h-6 text-gray-800 dark:text-white">
                                <path
                                    d="M9 8H6v4h3v12h5V12h3.6L18 8h-4V6.5c0-.9.6-1.5 1.5-1.5H18V0h-3c-3.1 0-6 1.9-6 5.6V8Z"
                                    fill="currentColor"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>






</template>