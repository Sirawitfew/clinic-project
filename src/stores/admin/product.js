import { defineStore } from 'pinia'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'

export const useAdminProductStore = defineStore('admin-product', {
    state: () => ({
        list: [
        ],
    }),
    actions: {
        async loadProduct() {
            try {
                const productSnapshot = await getDocs(collection(db, 'products'))
                const products = productSnapshot.docs.map(doc => doc.data())
                if (products.length > 0) {
                    this.list = products
                }
            } catch (error) {
                console.error('Error loading products:', error)
            }
        },
        getProduct(index) {
            if (!this.loaded) {
                this.loadProduct()
            }
            return this.list[index]
        },
        addProduct(productData) {
            productData.remainQuantity = productData.quantity
            productData.updatedAt = (new Date()).toISOString()
            this.list.push(productData)
            localStorage.setItem('admin-products', JSON.stringify(this.list))
        },
        updateProduct(index, productData) {
            this.list[index].name = productData.name
            this.list[index].imageUrl = productData.imageUrl
            this.list[index].price = productData.price
            this.list[index].quantity = productData.quantity
            this.list[index].remainQuantity = productData.quantity
            this.list[index].status = productData.status
            this.list[index].updatedAt = (new Date()).toISOString()
            localStorage.setItem('admin-products', JSON.stringify(this.list))
        },
        removeProduct(index) {
            this.list.splice(index, 1)
        }
    }
})

