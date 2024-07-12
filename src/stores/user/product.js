import { defineStore } from 'pinia'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'

export const useUserProductStore = defineStore('product', {
    state: () => ({
        list: [],
    }),
    actions: {
        async loadProducts() {
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
        filterProducts(searchText) {
            return this.list.filter(product => product.name.includes(searchText))
        }
    }
})


// {
//     name: 'เตียงผู้ป่วย 1 ไกร์ แบบมือหมุน PISIT',
//     imageUrl: 'https://img5.pic.in.th/file/secure-sv1/28765a73b3269bdf2.png',
//     quantity: 10,
//     about: 'เตียงผู้ป่วย โครงสร้างเตียงทำจากเหล็กกล่องพ่นสีกันสนิม มีความแข็งแรง ทนทาน แบ่งเป็น 2 ตอน ราวกั้นเตียงทำจากอลูมิเนียมพับเก็บได้',
//     status: 'open',
//     price: 100,
// },
// {
//     name: 'ชุด PPE ป้องกันเชื้อโรค หนา 75 แกรม',
//     imageUrl: 'https://www.egosportthailand.com/wp-content/uploads/2021/09/PPE_1.png',
//     quantity: 10,
//     about: 'ชุด PPE ป้องกันเชื้อโรค หนา 75 แกรม ไซต์ L เป็นชุดป้องกันเชื้อโรค เหมาะกับการใช้งานในการตรวจคัดกรองผู้ป่วย แต่ไม่เหมาะกับการใช้ในห้องผ่าตัด',
//     status: 'open',
//     price: 100,
// },
// {
//     name: 'ไม้เท้าค้ำศอกอลูมิเนียม แบบครึ่งแขน',
//     imageUrl: 'https://www.berryb.co.th/wp-content/uploads/2020/10/CA851L5.png',
//     quantity: 10,
//     about: 'ไม้เท้าค้ำศอกอลูมิเนียม แบบครึ่งแขน ช่วยค้ำยันผู้ที่ต้องการเดิน การยืนได้เป็นอย่างดี โครงสร้างแข็งแรงทนทาน รองรับน้ำหนักได้ดี เหมาะกับผู้ป่วย ผู้สูงอายุอย่างมาก ๆ',
//     status: 'open',
//     price: 450,
// },
// {
//     name: 'ผ้าพันเคล็ด ยี่ห้อ อิซซี่ (ISSI)',
//     imageUrl: 'https://cf.shopee.co.th/file/ccb1241a5decfc652bd3bfcfe7cb23ab_tn',
//     quantity: 10,
//     about: 'ผ้าพันเคล็ด (Elastic Bandage) ยี่ห้อ อี่ซี่ (ISSI) รหัส RM-ETB01 ใช้พันเพื่อช่วยลดอาการบาดเจ็บและลดอาการบวมบริเวณที่ได้รับบาดเจ็บ ช่วยให้เลือดไหลเวียนได้ดีมากยิ่งขึ้น',
//     status: 'open',
//     price: 190,
// },

