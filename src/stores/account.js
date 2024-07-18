import { defineStore } from 'pinia'

import { GoogleAuthProvider,
        signInWithPopup,
        signOut,
        onAuthStateChanged,
        signInWithEmailAndPassword
} from "firebase/auth";

import {
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

import { auth , db } from '@/firebase';

const provider = new GoogleAuthProvider();

export const useAccountStore = defineStore('account', {
    state: () => ({
        isLoggedIn: false,
        isAdmin: false,
        user: {},
        profile: {}
    }),
    actions: {
        async checkAuth () {
            return new Promise((resolve) => {
                onAuthStateChanged(auth, async (user) => {
                    console.log('user' , user)
                    if (user) {
                        this.user = user

                        const docRef = doc(db , 'users' , user.uid)
                        const docSnap = await getDoc(docRef)

                        if (docSnap.exists()) {
                            //ไม่สร้างข้อมูลใหม่
                            this.profile = docSnap.data()
                        } else {
                            //ยังไม่มีข้อมูล = สร้างข้อมูลใหม่
                            const newUser = {
                                fullname: user.displayName,
                                role: 'member',
                                status: 'active',
                                updateAt: new Date()
                            }
                            await setDoc(docRef , newUser)
                            this.profile = newUser
                        }
                        if (this.profile.role === 'admin' ||
                            this.profile.role === 'modorator'
                        ) {
                            this.isAdmin = true
                        }
                        this.isLoggedIn = true

                        //จังหวะสร้าง user สร้าง data เข้า collection user ทันที 
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                })
            })
        },
        async signInWithGoogle () {
            try {
                const result = await signInWithPopup(auth , provider)
                this.isLoggedIn = true
                this.user = result.user
            } catch (error) {
                console.log('error' , error)
            }
        },
        async signInAdmin (email , password) {
            try {
                const result = await signInWithEmailAndPassword(auth, email , password)
                this.isLoggedIn = true
                this.isAdmin = true
                this.user = result.user
            } catch (error) {
                console.log('error' , error.code)
                switch (error.code) {
                    case 'auth/invalid-email':
                        throw new Error('Email ไม่ถูกต้อง')
                    case 'auth/wrong-password':
                        throw new Error('Password ไม่ถูกต้อง')
                    default:
                        throw new Error('มีปัญหาเกี่ยวกับ Login ')
                }
            }
        },
        async logout () {
            this.isLoggedIn = false
            this.isAdmin = false
            await signOut(auth)
        }
    }
})