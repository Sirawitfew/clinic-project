<script setup>
import UserLayout from '@/layouts/UserLayout.vue';
import Hero from '@/components/user/Hero.vue';
import Coutdown from '@/components/user/Coutdown.vue';
import ImageSlider from '@/components/user/ImageSlider.vue';
</script>

<template>
<UserLayout>
    <!-- Hero -->
    <Hero></Hero>

    <!-- Number Content -->
    <div class=" p-4 mt-5 rounded-lg h-92 bg-[url('https://img.freepik.com/free-photo/blurred-common-room_1203-106.jpg?t=st=1719203002~exp=1719206602~hmac=0d3b39bf7dc429fbc3c52dedccad6682e0a7c893d9ce5712359b20d2bcf397f9&w=826')]">
        <div class="flex">
            <div class="flex-1">
            <h1 class="text-7xl font-bold mx-3 text-white">Promotion</h1>
            </div>

            <!-- Countdown -->
            <Coutdown></Coutdown>

        </div>
        <ImageSlider></ImageSlider>

    </div>
</UserLayout>
</template>

<style scope>
.button-name {
    box-shadow: rgba(45, 35, 66, 0.2) 0 2px 4px, rgba(45, 35, 66, 0.15) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
    transition: box-shadow .15s, transform .15s;
}

.button-name:hover {
    box-shadow: rgba(45, 35, 66, 0.3) 0 4px 8px, rgba(45, 35, 66, 0.2) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
    transform: translateY(-2px);
}

.button-name:focus {
    box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
}

.button-name:active {
    box-shadow: #D6D6E7 0 3px 7px inset;
    transform: translateY(2px);
}
</style>
