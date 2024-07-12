<script setup>
import { ref } from 'vue';

</script>

<template>
    <div class="hero h-screen rounded-lg"
        style="background-image: url(https://img.freepik.com/free-photo/blur-hospital_1203-7972.jpg?t=st=1719026335~exp=1719029935~hmac=e7e875465af8178b6aaa99946fe20441f051ce12c3a5882b06556b56fbaffb79&w=826);">
        <div class="hero-overlay bg-opacity-10 rounded-lg"></div>
        <div class="hero-content text-center text-neutral-content">
            <div
                class="flex-col bg-[#FF791A] rounded-lg h-72 w-[500px] bg-opacity-50 flex justify-between items-center">
                <div class="mt-7">
                    <RouterLink :to="{ name: 'home' }" class="mb-5 text-5xl md:text-7xl font-bold text-[#FFFFFF]">
                        Yourname
                    </RouterLink>
                </div>
                <div class="mb-5">
                    <p class="text-[#FFFFFF]">Your Description.</p>
                </div>
                <div class="my-5">
                    <button role="button"
                        class="button-name inline-flex items-center appearance-none bg-[#d48b4a] bg-opacity-40 rounded-md border-0 shadow-md shadow-[#2D2342]/20 hover:shadow-lg hover:shadow-[#2D2342]/30 active:shadow-inner active:shadow-[#D6D6E7] focus:outline-none focus:ring focus:ring-[#D6D6E7] focus:ring-inset focus:ring-opacity-50 text-[#36395A] cursor-pointer justify-center leading-none overflow-hidden px-4 relative text-left text-decoration-none transition-shadow transition-transform duration-150 ease-in-out select-none whitespace-nowrap will-change-shadow will-change-transform text-[18px] h-14 w-48"
                        @click="togglePopup" @mouseover="isHovered = true" @mouseleave="isHovered = false"
                        @mousedown="isActive = true" @mouseup="isActive = false">
                        <span class="relative z-10 text-white font-light text-md">จองคิวออนไลน์</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
