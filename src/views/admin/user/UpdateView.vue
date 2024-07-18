<script setup>
import { reactive, onMounted, ref } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import AdminLayout from "@/layouts/AdminLayout.vue";
import { useAdminUserStore } from "@/stores/admin/user";
import { useEventStore } from "@/stores/event";

const adminUserStore = useAdminUserStore();
const eventStore = useEventStore()

const route = useRoute();
const router = useRouter()
const userIndex = ref(-1);

const formData = [
    {
        name: 'Name',
        field: 'fullname',
        type: 'text'
    },
    {
        name: 'Role',
        field: 'role',
        type: 'select',
        dropdownList: ['admin', 'moderator', 'member']
    },
    {
        name: 'Status',
        field: 'status',
        type: 'select',
        dropdownList: ['active', 'inactive']
    },
];

const userData = reactive({
    fullname: '',
    role: '',
    status: ''
});

onMounted(async () => {
    if (route.params.id) {
        userIndex.value = route.params.id
        const selectedUser = await adminUserStore.getUser(userIndex.value);


        userData.fullname = selectedUser.fullname;
        userData.role = selectedUser.role;
        userData.status = selectedUser.status;
    }
});

const updateUser = async () => {
    // Your update logic here
    await adminUserStore.updateUser(userIndex.value, userData)
    eventStore.popupMessage('info' , 'Update User Successful')
    router.push({ name: 'admin-user-list' })
}
</script>

<template>
    <AdminLayout>
        <div class="shadow-xl p-8 mt-4">
            <div class="text-xl font-bold">Update User</div>
            <div class="divider"></div>
            <div class="grid grid-cols-1 gap-2">
                <div v-for="form in formData" :key="form.field" class="form-control w-full">
                    <div class="label">
                        <span class="label-text">{{ form.name }}</span>
                    </div>
                    <input v-if="form.type === 'text'" v-model="userData[form.field]" type="text"
                        class="input input-bordered w-full" />
                    <select v-if="form.type === 'select'" v-model="userData[form.field]"
                        class="input input-bordered w-full">
                        <option v-for="item in form.dropdownList" :key="item">
                            {{ item }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="flex mt-4 justify-end">
                <RouterLink :to="{ name: 'admin-user-list' }" class="btn btn-ghost">Back</RouterLink>
                <button class="btn btn-neutral" @click="updateUser()">Update</button>
            </div>
        </div>
    </AdminLayout>
</template>
