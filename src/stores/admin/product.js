import { defineStore } from 'pinia'
import { 
    collection,
    getDocs,
    doc,
    getDoc,
    setDoc,
    deleteDoc,
    addDoc
} from 'firebase/firestore'
import { db } from '@/firebase'

export const useAdminProductStore = defineStore('admin-product', {
    state: () => ({
        list: [
        ],
    }),
    actions: {
        async loadProduct() {
            try {
                const productCol = collection(db , 'products')
                const productSnapshot = await getDocs(productCol)
                const products = productSnapshot.docs.map(doc => {
                    const convertedProduct = doc.data()
                    convertedProduct.productId = doc.id
                    convertedProduct.updatedAt = convertedProduct.updatedAt.toDate()
                    return convertedProduct
                })
                this.list = products
            } catch (error) {
                console.error('Error loading products:', error)
            }
        },
        async getProduct (productId) {
            try {
                const productRef = doc(db , 'products' , productId)
                const productSnapshot = await getDoc(productRef)
                return productSnapshot.data()
            } catch (error) {
                console.log('error' , error)
            }
        },
        async addProduct(productData) {
            try {
                productData.remainQuantity = productData.quantity
                productData.updatedAt = new Date()
                const productCol = collection(db , 'products')
                await addDoc(productCol , productData)
            } catch (error) {
                console.log('error' , error)
            }
        },
        async updateProduct(productId, productData) {
            try {
                const updateProduct = {}
                updateProduct.name = productData.name
                updateProduct.imageUrl = productData.imageUrl
                updateProduct.price = productData.price
                updateProduct.quantity = productData.quantity
                updateProduct.remainQuantity = productData.quantity
                updateProduct.about = productData.about
                updateProduct.status = productData.status
                updateProduct.updatedAt = new Date()

                const productRef = doc(db , 'products' , productId)
                await setDoc(productRef, updateProduct)
            } catch (error) {
                console.log('UpdateProduct Error' , error)
            }
        },
        async removeProduct(productId) {
            try {
                const productRef = doc(db, 'products' , productId)
                await deleteDoc(productRef)
            } catch (error) {
                console.log('error' , error)
            }
        }
    }
})

