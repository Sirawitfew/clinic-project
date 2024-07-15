<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

import User from './User.vue';

const isPopupOpen = ref(false);
const currentStep = ref(1);
const steps = ["หมวดหมู่", "เลือกวันที่และเวลา", "ตรวจสุขภาพ", "ขอใบรับรองออนไลน์"];

function nextStep() {
    if (currentStep.value < steps.length) {
        currentStep.value++;
    }
}

function prevStep() {
    if (currentStep.value > 1) {
        currentStep.value--;
    }
}

const togglePopup = () => {
    isPopupOpen.value = !isPopupOpen.value;
    currentStep.value = 1;
};
</script>

<template>
    <div class="hero h-screen rounded-lg"
        style="background-image: url(https://img.freepik.com/free-photo/blur-hospital_1203-7972.jpg?t=st=1719026335~exp=1719029935~hmac=e7e875465af8178b6aaa99946fe20441f051ce12c3a5882b06556b56fbaffb79&w=826);">
        <div class="hero-overlay bg-opacity-10 rounded-lg"></div>
        <div class="hero-content text-center text-neutral-content">
            <div
                class="flex flex-col bg-[#FF791A] rounded-lg h-72 w-11/12 md:w-[500px] bg-opacity-50 justify-between items-center mx-auto">
                <div class="mt-7">
                    <RouterLink :to="{ name: 'home' }" class="mb-5 text-3xl md:text-5xl font-bold text-white">
                        Yourname
                    </RouterLink>
                </div>
                <div class="mb-5 text-center">
                    <p class="text-white text-sm md:text-base">Your Description.</p>
                </div>
                <div class="flex flex-col my-5">
                    <div>
                        <button
                            class="btn bg-orange-500 hover:-translate-y-1 rounded-md shadow-md hover:shadow-lg active:shadow-inner h-14 w-48 hover:bg-slate-50 hover:bg-opacity-50"
                            @click="togglePopup" role="button">
                            <span class="relative z-10 text-white font-light text-lg">จองคิวออนไลน์</span>
                        </button>
                    </div>
                    <div class="flex justify-center">
                        <p class=" text-white mt-3">สถานะ : </p>
                        <p class="text-red-500 mx-2 mt-3">ปิดร้าน</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Popup Content -->
    <div v-if="isPopupOpen" class="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
        <div class="absolute w-full h-full bg-gray-900 opacity-50"></div>
        <div class="flex flex-col bg-white rounded-lg shadow-lg z-50 w-11/12 md:w-[60%] h-[90%]">
            <div class="flex items-center justify-between bg-gray-400 rounded-t-lg h-10 px-4">
                <h2 class="text-xl text-white font-bold mx-auto">การจองคิว</h2>
                <button @click="togglePopup" class="btn btn-sm btn-circle btn-ghost">✕</button>
            </div>

            <div class="w-full my-5 flex items-center justify-center">
                <ul class="steps">
                    <li v-for="(step, index) in steps" :key="index"
                        :class="['step', { 'step-primary': index < currentStep }]">
                        {{ step }}
                    </li>
                </ul>
            </div>

            <!-- หมวดหมู่ -->
            <div v-if="currentStep === 1" class="flex flex-col items-center justify-center">
                <div class="grid grid-cols-2 gap-2 w-full h-full p-4" style="grid-template-columns: 1fr 2fr;">
                    <div class=" bg-opacity-5 bg-teal-800 rounded-md shadow-lg">
                        <div class="flex flex-col justify-center items-center mt-5">
                            <!-- YourPic -->
                            <div class="avatar">
                                <div class="w-24 rounded">
                                    <img
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </div>
                        </div>
                        <!-- Your name-->
                        <div class="p-8">
                            <div class="form-control w-full">
                                <div class="label">
                                    <span class="label-text">ชื่อ - นามสกุล</span>
                                </div>
                                <input type="text" placeholder="" class="input input-bordered w-full" />
                            </div>
                            <div class="form-control w-full mt-2">
                                <div class="label">
                                    <span class="label-text">เลขประจำตัวประชาชน</span>
                                </div>
                                <input type="text" placeholder="" class="input input-bordered w-full" />
                            </div>
                            <div class="form-control w-full mt-2">
                                <div class="label">
                                    <span class="label-text">เบอร์โทรศัพท์</span>
                                </div>
                                <input type="text" placeholder="" class="input input-bordered w-full" />
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col justify-center items-center shadow-lg rounded-md">
                        <p class="text-2xl font-bold">หมวดหมู่</p>
                        <label class="form-control w-full max-w-xs mt-5">
                            <select class="select select-bordered">
                                <option disabled selected>กรุณาเลือก</option>
                                <option>ตรวจทั่วไป</option>
                                <option>เสริมความงาม</option>
                                <option>ตรวจสุขภาพ</option>
                                <option>ขอใบรับรองออนไลน์</option>
                            </select>
                        </label>
                        <div class="flex mt-5 gap-3">
                            <div class="flex">
                                <p class="text-2xl font-bold">จำนวนการใช้บริการคลินิคตอนนี้ 3 คน</p>
                                <div class="mt-[7px] mx-2">
                                    <User />
                                </div>
                            </div>
                            <!-- <div class="flex">
                                <p class="text-2xl">3 คน</p>
                                <div class="mt-1 mx-2">
                                    <User />
                                </div>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>

            <!-- เลือกวันที่และเวลา -->

            <div v-else-if="currentStep === 2" class="flex flex-col items-center justify-center">
                <div class="grid grid-cols-2 gap-2 w-full h-full p-4" style="grid-template-columns: 1fr 2fr;">
                    <div class=" bg-opacity-5 bg-teal-800 rounded-md shadow-lg">
                        <div class="flex flex-col justify-center items-center mt-5">
                            <!-- YourPic -->
                            <div class="avatar">
                                <div class="w-24 rounded">
                                    <img
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </div>
                        </div>
                        <!-- Your name-->
                        <div class="p-8">
                            <div class="form-control w-full">
                                <div class="label">
                                    <span class="label-text">ชื่อ - นามสกุล</span>
                                </div>
                                <input type="text" placeholder="" class="input input-bordered w-full" />
                            </div>
                            <div class="form-control w-full mt-2">
                                <div class="label">
                                    <span class="label-text">เลขประจำตัวประชาชน</span>
                                </div>
                                <input type="text" placeholder="" class="input input-bordered w-full" />
                            </div>
                            <div class="form-control w-full mt-2">
                                <div class="label">
                                    <span class="label-text">เบอร์โทรศัพท์</span>
                                </div>
                                <input type="text" placeholder="" class="input input-bordered w-full" />
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col justify-center items-center shadow-lg rounded-md">
                        <p class="text-2xl font-bold">เลือกวันที่และเวลา</p>
                        <input type="date" class="input input-bordered mt-5 w-full max-w-xs" />
                        <input type="time" class="input input-bordered mt-5 w-full max-w-xs" />
                    </div>
                </div>
            </div>

            <!-- สรุปข้อมูล -->

            <div v-else-if="currentStep === 3" class="flex flex-col items-center justify-center">
                <div class="grid grid-cols-2 gap-2 w-full h-full p-4" style="grid-template-columns: 1fr 2fr;">
                    <div class=" bg-opacity-5 bg-teal-800 rounded-md shadow-lg">
                        <div class="flex flex-col justify-center items-center mt-5">
                            <!-- YourPic -->
                            <div class="avatar">
                                <div class="w-24 rounded">
                                    <img
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </div>
                        </div>
                        <!-- Your name-->
                        <div class="p-8">
                            <div class="form-control w-full">
                                <div class="label">
                                    <span class="label-text">ชื่อ - นามสกุล</span>
                                </div>
                                <input type="text" placeholder="" class="input input-bordered w-full" />
                            </div>
                            <div class="form-control w-full mt-2">
                                <div class="label">
                                    <span class="label-text">เลขประจำตัวประชาชน</span>
                                </div>
                                <input type="text" placeholder="" class="input input-bordered w-full" />
                            </div>
                            <div class="form-control w-full mt-2">
                                <div class="label">
                                    <span class="label-text">เบอร์โทรศัพท์</span>
                                </div>
                                <input type="text" placeholder="" class="input input-bordered w-full" />
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col justify-center items-center shadow-lg rounded-md">
                        <p class="text-2xl font-bold">เลือกวันที่และเวลา</p>
                        <input type="date" class="input input-bordered mt-5 w-full max-w-xs" />
                        <input type="time" class="input input-bordered mt-5 w-full max-w-xs" />
                    </div>
                </div>
            </div>

            <!-- ขอใบรับรองออนไลน์ -->

            <div v-else-if="currentStep === 4" class="flex flex-col items-center justify-center">
                <p class="text-gray-700 text-xl mt-5 font-bold">ขอใบรับรองออนไลน์</p>
                <input type="date" class="input input-bordered mt-5 w-full max-w-xs" />
                <input type="time" class="input input-bordered mt-5 w-full max-w-xs" />
            </div>

            <div class="flex justify-end items-end w-full p-4 space-x-2">
                <button v-if="currentStep > 1" @click="prevStep"
                    class="btn btn-neutral rounded w-1/4 md:w-1/6">กลับ</button>
                <button v-if="currentStep === 4" @click="togglePopup"
                    class="btn btn-neutral rounded w-1/4 md:w-1/6">เสร็จสิ้น</button>
                <button v-else @click="nextStep" class="btn btn-neutral rounded w-1/4 md:w-1/6">ถัดไป</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.overflow-auto {
    overflow-y: auto;
}
</style>
