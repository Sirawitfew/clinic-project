import { defineStore } from 'pinia'

import {
    collection,
    getDocs,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

import { db } from '@/firebase'

export const useAdminUserStore = defineStore('admin-user', {
    state: () => ({
        list: [],
    }),
    actions: {
        async loadUser() {
            try {
                const userCol = collection(db, 'users')
                const userSnapshot = await getDocs(userCol)
                const userList = userSnapshot.docs.map(doc => { // collection ต้องวนลูปเอาข้อมูล
                    let convertedUser = doc.data()
                    convertedUser.uid = doc.id
                    if (convertedUser.updatedAt && convertedUser.updatedAt.toDate) {
                        convertedUser.updatedAt = convertedUser.updatedAt.toDate()
                    } else {
                        convertedUser.updatedAt = null
                    }
                    return convertedUser
                }) // convert data snapshotfirestore to array JS
                this.list = userList
            } catch (error) {
                console.error('Error loading users:', error)
            }
        },
        async getUser(uid) {
            try {
                const userRef = doc(db, 'users', uid)
                const userSnapshot = await getDoc(userRef)
                return userSnapshot.data() // เคสตัวเดียวใช้ .data() ได้เลย
            } catch (error) {
                console.log('error', error)
            }
        },
        async updateUser(uid, userData) {
            try {
                // เราอยากได้ข้อมูลอะไรไป update
                const updatedUser = {
                    fullname: userData.fullname,
                    status: userData.status,
                    role: userData.role,
                    updatedAt: new Date()
                }

                const docRef = doc(db, 'users', uid)
                await setDoc(docRef, updatedUser)
            } catch (error) {
                console.log('error', error)
            }
        }
    }
})
