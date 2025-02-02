import { defineStore } from 'pinia'


export const useUserReservatioStore = defineStore('reservation', {
    state: () => ({
        list: [],
    }),
    actions: {
        confirm(userData) {
            try {
                const usersData = {
                    ...userData, // ... กระจายฟิลใน object ทั้งหมด
                }
                localStorage.setItem('reservation-data', JSON.stringify(usersData))
            } catch (error) {
                console.log('error' , error)
            }
        }
    }
})