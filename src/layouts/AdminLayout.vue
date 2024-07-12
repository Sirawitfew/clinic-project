<script setup>
import { RouterLink, useRoute , useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

import { useAccountStore } from '@/stores/account';


const menus = [
    {
        name: 'Dashboard',
        routeName: 'admin-dashboard',
    },
    {
        name: 'Product',
        routeName: 'admin-product-list',
    },
    {
        name: 'Order',
        routeName: 'admin-order-list',
    },
    {
        name: 'User',
        routeName: 'admin-user-list',
    },
]

const activeMenu = ref('')
const accountStore = useAccountStore()
const route = useRoute()
const router = useRouter()

onMounted(() => {
    console.log(route.name)
})

const logout = async () => {
    try {
        await accountStore.logout()
        router.push({name : 'login'})
    } catch (error) {
        console.log('error' , error)
    }
}

</script>

<template>
    <div class="drawer drawer-open">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content p-4">

            <slot></slot>

        </div>


        <div class="drawer-side">
            <label for="my-drawer-2" class="drawer-overlay"></label>
            <ul class="menu p-4 w-60 h-full bg-base-200 text-base-content">
                <!-- Sidebar content here -->
                <li class="mb-2 font-semibold text-2xl">
                    <div>Admin</div>
                </li>
                <li v-for="menu in menus" :key="menu">
                    <RouterLink :to="{ name: menu.routeName }" :class="menu.routeName === activeMenu ? 'active' : ''">
                        {{ menu.name }}
                    </RouterLink>
                </li>
                <li>
                    <a @click="logout">Logout</a>
                </li>
            </ul>
        </div>
    </div>
</template>
