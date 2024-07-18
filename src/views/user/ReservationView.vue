<script setup>
import { ref, reactive } from 'vue';
import UserLayout from '@/layouts/UserLayout.vue';
import { useUserReservatioStore } from '@/stores/user/reservatio';

const currentStep = ref(1);
const userReservation = useUserReservatioStore();
const steps = ["หมวดหมู่", "เลือกวันที่และเวลา", "ตรวจสุขภาพ", "ขอใบรับรองออนไลน์"];

// Form data for the first step
const formData = reactive([
    {
        name: 'ชื่อ - นามสกุล',
        field: 'name'
    },
    {
        name: 'เลขประจำตัวประชาชน',
        field: 'cdnumber'
    },
    {
        name: 'เบอร์โทรศัพท์',
        field: 'phonenumber'
    },
]);

const useFormData = reactive({
    name: '',
    cdnumber: '',
    phonenumber: '',
    email: '',
    address: '',
    note: '',
    category: '',
    date: '',
    time: ''
});

// Function to move to the next step and store data
const nextStepCurrentstep = () => {
    if (currentStep.value < steps.length) {
        currentStep.value++;
    }
    userReservation.confirm(useFormData);
}

function nextStep() {
    if (currentStep.value < steps.length) {
        currentStep.value++;
    }
}


// Function to move to the previous step
const prevStep = () => {
    if (currentStep.value > 1) {
        currentStep.value--;
    }
}
</script>

<template>
    <UserLayout>
        <div
            class="flex flex-col max-w-5xl mx-auto border border-base-200 shadow-xl justify-center items-center rounded-xl bg-white">
            <div class="flex items-center justify-between bg-gray-400 rounded-t-lg h-10 px-4 w-full">
                <h2 class="text-xl text-white font-bold mx-auto">การจองคิว</h2>
            </div>
            <div class="w-full my-5 flex items-center justify-center">
                <ul class="steps">
                    <li v-for="(step, index) in steps" :key="index"
                        :class="['step', { 'step-primary': index < currentStep }]">
                        {{ step }}
                    </li>
                </ul>
            </div>

            <!-- หน้าเลือกหมวดหมู่ -->
            <div v-if="currentStep === 1" class="flex flex-col items-center justify-center w-full">
                <div class="grid grid-cols-2 gap-2 w-full h-full p-4" style="grid-template-columns: 1fr 2fr;">
                    <div class=" bg-opacity-5 bg-teal-800 rounded-md shadow-lg">
                        <!-- <div class="flex flex-col justify-center items-center mt-5">
                            <div class="avatar">
                                <div class="w-24 rounded">
                                    <img
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </div>
                        </div> -->
                        <!-- Your name-->
                        <div class="p-8">
                            <div v-for="form in formData" :key="form.field" class="form-control w-full">
                                <div class="label">
                                    <span class="label-text">{{ form.name }}</span>
                                </div>
                                <input type="text" placeholder="" class="input input-bordered w-full"
                                    v-model="useFormData[form.field]" />
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col justify-center items-center shadow-lg rounded-md">
                        <p class="text-2xl font-bold">หมวดหมู่</p>
                        <label class="form-control w-full max-w-xs mt-5">
                            <select class="select select-bordered" v-model="useFormData.category">
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
                        </div>
                    </div>
                </div>
            </div>

            <!-- หน้าเลือกวันที่และเวลา  -->
            <div v-else-if="currentStep === 2" class="flex flex-col items-center justify-center w-full">
                <div class="grid grid-cols-2 gap-2 w-full p-4" style="grid-template-columns: 1.5fr 2fr;">
                    <div class="bg-opacity-5 bg-teal-800 rounded-md shadow-lg">
                        <!-- Display user-entered data from the first step -->
                        <div class="p-4">
                            <div class="flex justify-between mt-2">
                                <p>ชื่อ - นามสกุล</p>
                                <p>{{ useFormData.name }}</p>
                            </div>
                            <div class="flex justify-between mt-2">
                                <p>เลขประจำตัวประชาชน</p>
                                <p>{{ useFormData.cdnumber }}</p>
                            </div>
                            <div class="flex justify-between mt-2">
                                <p>เบอร์โทรศัพท์</p>
                                <p>{{ useFormData.phonenumber }}</p>
                            </div>
                            <div class="flex justify-between mt-2">
                                <p>หมวดหมู่</p>
                                <p>{{ useFormData.category }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col justify-center items-center shadow-lg rounded-md">
                        <div>
                            <p class="text-2xl font-bold">เลือกวันที่และเวลา</p>
                        </div>
                        <div class="mb-5">
                            <input type="date" class="input input-bordered mt-5 w-full max-w-xs"
                                v-model="useFormData.date" />
                            <input type="time" class="input input-bordered mt-3 w-full max-w-xs"
                                v-model="useFormData.time" />
                        </div>
                    </div>
                </div>
            </div>


            <div v-else-if="currentStep === 3" class="flex flex-col items-center justify-center w-full">
                <div class="grid grid-cols-2 gap-2 w-full p-4" style="grid-template-columns: 1.5fr 2fr;">
                    <div class="bg-opacity-5 bg-teal-800 rounded-md shadow-lg">
                        <!-- Display user-entered data from the first step -->
                        <div class="p-4">
                            <div class="flex justify-between mt-2">
                                <p>ชื่อ - นามสกุล</p>
                                <p>{{ useFormData.name }}</p>
                            </div>
                            <div class="flex justify-between mt-2">
                                <p>เลขประจำตัวประชาชน</p>
                                <p>{{ useFormData.cdnumber }}</p>
                            </div>
                            <div class="flex justify-between mt-2">
                                <p>เบอร์โทรศัพท์</p>
                                <p>{{ useFormData.phonenumber }}</p>
                            </div>
                            <div class="flex justify-between mt-2">
                                <p>หมวดหมู่</p>
                                <p>{{ useFormData.category }}</p>
                            </div>
                            <div class="flex justify-between mt-2">
                                <p>วันที่</p>
                                <p>{{ useFormData.date }}</p>
                            </div>
                            <div class="flex justify-between mt-2">
                                <p>เวลา</p>
                                <p>{{ useFormData.time }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col justify-center items-center shadow-lg rounded-md">

                    </div>
                </div>
            </div>

            <!-- Navigation buttons -->
            <div class="flex justify-end items-end w-full p-4 space-x-2">
                <button v-if="currentStep > 1" @click="prevStep"
                    class="btn btn-neutral rounded w-1/4 md:w-1/6">กลับ</button>
                <button v-if="currentStep === 1" @click="nextStepCurrentstep"
                    class="btn btn-neutral rounded w-1/4 md:w-1/6">ถัดไป</button>
                <button v-else @click="nextStepCurrentstep" class="btn btn-neutral rounded w-1/4 md:w-1/6">ถัดไป</button>
            </div>
        </div>

    </UserLayout>
</template>