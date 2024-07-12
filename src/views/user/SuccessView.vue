<script setup>
import { onMounted, ref } from "vue";

import UserLayout from "@/layouts/UserLayout.vue";
import { useUserCartStore } from "@/stores/user/cart";

const userCartStore = useUserCartStore()
const orderData = ref({})


onMounted(() => {
    userCartStore.loadCheckout()
    if (userCartStore.checkout.orderNumber) {
        orderData.value = userCartStore.checkout
    }
})
</script>

<template>
    <UserLayout>
        <div
            class="flex flex-col max-w-3xl mx-auto border border-base-200 shadow-xl justify-center items-center rounded-xl bg-white">
            <div class="flex flex-col justify-center items-center">
                <svg version="1.1" width="52" height="52" viewBox="0 0 256 256" xml:space="preserve" class="mt-5">
                    <defs>
                    </defs>
                    <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"
                        transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                        <circle cx="45" cy="45" r="45"
                            style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(40,201,55); fill-rule: nonzero; opacity: 1;"
                            transform="  matrix(1 0 0 1 0 0) " />
                        <path
                            d="M 38.478 64.5 c -0.01 0 -0.02 0 -0.029 0 c -1.3 -0.009 -2.533 -0.579 -3.381 -1.563 L 21.59 47.284 c -1.622 -1.883 -1.41 -4.725 0.474 -6.347 c 1.884 -1.621 4.725 -1.409 6.347 0.474 l 10.112 11.744 L 61.629 27.02 c 1.645 -1.862 4.489 -2.037 6.352 -0.391 c 1.862 1.646 2.037 4.49 0.391 6.352 l -26.521 30 C 40.995 63.947 39.767 64.5 38.478 64.5 z"
                            style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;"
                            transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                    </g>
                </svg>
                <div class="text-3xl font-bold mt-3 ">Your order is successful!</div>
                <div class="mt-2">Hi {{ orderData.name }}</div>
                <div>Your order #{{ orderData.orderNumber }} is completed and ready to ship</div>
            </div>

            <RouterLink :to="{ name: 'product' }" href="#" title=""
                class="inline-flex items-center mt-2 gap-2 text-sm font-medium text-[#4338ca] underline hover:no-underline dark:text-[#6366f1]">
                Continue Shopping
                <svg viewBox="0 0 24 24" fill="#4338ca" class="w-5 h-5">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path
                            d="M3.77791 3.65484C3.59687 4.01573 3.50783 4.46093 3.32975 5.35133L2.73183 8.34093C2.35324 10.2339 3.8011 12 5.73155 12C7.30318 12 8.61911 10.8091 8.77549 9.24527L8.8445 8.55515C8.68141 10.4038 10.1385 12 11.9998 12C13.8737 12 15.338 10.382 15.1515 8.51737L15.2245 9.24527C15.3809 10.8091 16.6968 12 18.2685 12C20.1989 12 21.6468 10.2339 21.2682 8.34093L20.6703 5.35133C20.4922 4.46095 20.4031 4.01573 20.2221 3.65484C19.8406 2.89439 19.1542 2.33168 18.3337 2.10675C17.9443 2 17.4903 2 16.5823 2H14.4998H7.41771C6.50969 2 6.05567 2 5.66628 2.10675C4.84579 2.33168 4.15938 2.89439 3.77791 3.65484Z"
                            fill="#4338ca"></path>
                        <path
                            d="M18.2685 13.5C19.0856 13.5 19.8448 13.2876 20.5 12.9189V14C20.5 17.7712 20.5 19.6568 19.3284 20.8284C18.3853 21.7715 16.9796 21.9554 14.5 21.9913V18.5C14.5 17.5654 14.5 17.0981 14.299 16.75C14.1674 16.522 13.978 16.3326 13.75 16.201C13.4019 16 12.9346 16 12 16C11.0654 16 10.5981 16 10.25 16.201C10.022 16.3326 9.83261 16.522 9.70096 16.75C9.5 17.0981 9.5 17.5654 9.5 18.5V21.9913C7.02043 21.9554 5.61466 21.7715 4.67157 20.8284C3.5 19.6568 3.5 17.7712 3.5 14V12.9189C4.15524 13.2876 4.91439 13.5 5.73157 13.5C6.92864 13.5 8.02617 13.0364 8.84435 12.2719C9.67168 13.0321 10.7765 13.5 11.9998 13.5C13.2232 13.5 14.3281 13.032 15.1555 12.2717C15.9737 13.0363 17.0713 13.5 18.2685 13.5Z"
                            fill="#4338ca"></path>
                    </g>
                </svg>
            </RouterLink>

            <div class="divider w-full pr-5 pl-5"></div>
            <div class="grid grid-cols-3 gap-4 w-[90%]">
                <div class="bg-zinc-100 rounded-lg p-2">
                    <div class="mx-2">Order date</div>
                    <div class="mx-2">{{ orderData.createdDate }}</div>
                </div>
                <div class="bg-zinc-100 rounded-lg p-2">
                    <div class="mx-2">Payment Info</div>
                    <div class="mx-2">{{ orderData.paymentMethod }}</div>
                </div>
                <div class="bg-zinc-100 rounded-lg p-2">
                    <div class="mx-2">Address</div>
                    <div class="mx-2">{{ orderData.address }}</div>
                </div>
            </div>

            <div class="divider w-full pr-5 pl-5"></div>

            <h1 class="text-left w-[90%] opacity-70 font-bold">ORDER ITEMS</h1>
            <div v-for="product in orderData.products" :key="product"
                class="grid grid-cols-4 gap-2 w-[90%]  m-4 rounded-lg">
                <div>
                    <img class="w-[75%] p-2 bg-zinc-100 rounded-md" :src="product.imageUrl">
                </div>
                <div>
                    {{ product.name }}
                </div>
                <div class="text-center">
                    จำนวน {{ product.quantity }}
                </div>
                <div class="text-end">
                    ราคา {{ product.price * product.quantity }} ฿
                </div>
            </div>

            <div class="divider w-full pr-5 pl-5"></div>

            <div class="flex justify-between w-[90%] mb-5">
                <div class=" text-lg font-bold">SUBTOTAL</div>
                <div class=" text-lg">{{ orderData.totalPrice }}</div>
            </div>
        </div>
    </UserLayout>
</template>