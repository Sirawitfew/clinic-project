<script setup>
import { ref } from "vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import { useAdminDashboardStore } from "@/stores/admin/dashboard";
import { storeToRefs } from "pinia";

const AdminDashboardStore = useAdminDashboardStore();
const { ToggleOpenClose } = storeToRefs(AdminDashboardStore);

const toggleStore = () => {
    if (ToggleOpenClose.value) {
        AdminDashboardStore.closeStore();
    } else {
        AdminDashboardStore.openStore();
    }
};

const barOption = {
    options: {
        chart: {
            id: "vuechart-example",
        },
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
    },
    series: [
        {
            name: "series-1",
            data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
    ],
};

const donutOption = {
    options: {},
    series: [44, 55, 41, 17, 15],
};
</script>




<template>
    <AdminLayout>
        <div class="flex justify-between">
            <h1 class="text-4xl mb-4">Dashboard</h1>
            <div class="form-control">
                <label class="label cursor-pointer">
                    <span class="label-text">เปิดร้าน - ปิดร้าน</span>
                    <input type="checkbox" class="toggle toggle-accent mx-2" :checked="ToggleOpenClose"
                        @change="toggleStore" />
                </label>
            </div>
        </div>
        <div class="flex mb-4">
            <div class="stats shadow w-full">
                <div class="stat">
                    <div class="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            class="inline-block h-8 w-8 stroke-current">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <div class="stat-title">Order</div>
                    <div class="stat-value">31K</div>
                    <div class="stat-desc">Jan</div>
                </div>

                <div class="stat">
                    <div class="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            class="inline-block h-8 w-8 stroke-current">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4">
                            </path>
                        </svg>
                    </div>
                    <div class="stat-title">Products</div>
                    <div class="stat-value">4,200</div>
                    <div class="stat-desc">↗︎ 400 (22%)</div>
                </div>

                <div class="stat">
                    <div class="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            class="inline-block h-8 w-8 stroke-current">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4">
                            </path>
                        </svg>
                    </div>
                    <div class="stat-title">Users</div>
                    <div class="stat-value">1,200</div>
                </div>
            </div>
        </div>
        <div class="flex gap-2">
            <div class="flex-1">
                <div class="card w-full p-6 bg-base-100 shadow-xl">
                    <h1>ยอดขาย</h1>
                    <apexchart type="bar" :options="barOption.options" :series="barOption.series"></apexchart>
                </div>
            </div>
            <div class="flex-1">
                <div class="card w-full p-6 bg-base-100 shadow-xl">
                    <h1>ประเภทการขาย</h1>
                    <apexchart type="donut" :options="donutOption.options" :series="donutOption.series"></apexchart>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
