<script setup>
import { ref, onMounted } from "vue";
import UserLayout from "@/layouts/UserLayout.vue";

const profileImageUrl = ref('https://picsum.photos/id/237/536/354')
const email = ref('')
const name = ref('')

const handleFileUpload = (event) => {
    try {
        const file = event.target.files[0]

        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                profileImageUrl.value = e.target.result
            }
            reader.readAsDataURL(file)
        }
    } catch (error) {
        console.log('error', error)
    }
}

const updateProfile = () => {
    try {
        const profileData = {
            imageUrl: profileImageUrl.value,
            name: name.value,
            email: email.value
        }

        localStorage.setItem('profile-data', JSON.stringify(profileData))
        alert('Success update profile')
    } catch (error) {
        console.log('error', error)
    }
}

onMounted(() => {
    try {
        let profileData = localStorage.getItem('profile-data')
        if (profileData) {
            profileData = JSON.parse(profileData)
            profileImageUrl.value = profileData.imageUrl
            name.value = profileData.name
            email.value = profileData.email
        }
    } catch (error) {
        console.log('error', error)
    }
})

</script>

<template>
    <UserLayout>
        <div class="max-w-2xl mx-auto border border-base-200 shadow-xl p-5">
            <div class="font-bold text-3xl p-5">Profile</div>

            <div class="flex flex-col items-center my-2">
                <div class="avatar">
                    <div class="w-24 rounded-full">
                        <img :src="profileImageUrl" />
                    </div>
                </div>

                <div class="mt-5 ">
                    <input type="file" @change="handleFileUpload">
                </div>

                <div class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Email</span>
                    </div>
                    <input v-model="email" type="text" placeholder="Type here" class="input input-bordered w-full" />
                </div>
                <div class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Name</span>
                    </div>
                    <input v-model="name" type="text" placeholder="Type here" class="input input-bordered w-full" />
                </div>
                <button @click="updateProfile" class="btn btn-neutral w-full mt-4">UPDATE PRODILE</button>
            </div>
        </div>
    </UserLayout>
</template>