import { createRouter, createWebHistory } from 'vue-router'

import { useAccountStore } from '@/stores/account'

import HomeView from '@/views/user/HomeView.vue'
import AboutView from '@/views/user/AboutView.vue'
import SearchView from '@/views/user/SearchView.vue'
import ProfileView from '@/views/user/ProfileView.vue'
import CartView from '@/views/user/CartView.vue'
import CheckoutView from '@/views/user/CheckoutView.vue'
import SuccessView from '@/views/user/SuccessView.vue'
import ProductView from '@/views/user/ProductView.vue'
import PromotionView from '@/views/user/PromotionView.vue'
import ArticleView from '@/views/user/ArticleView.vue'
import ServiceView from '@/views/user/ServiceView.vue'
import ReservationView from '@/views/user/ReservationView.vue'

//Admin Site
import AdminLogin from '@/views/admin/LoginView.vue'
import DashboardView from '@/views/admin/DashboardView.vue'
import AdminProductList from '@/views/admin/product/ListView.vue'
import AdminProductUpdate from '@/views/admin/product/UpdateView.vue'

import AdminUserList from '@/views/admin/user/ListView.vue'
import AdminUserUpdate from '@/views/admin/user/UpdateView.vue'

import AdminOrderList from '@/views/admin/order/ListView.vue'
import AdminOrderDetail from '@/views/admin/order/DetailView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView
    },
    {
      path: '/reservation',
      name: 'reservation',
      component: ReservationView
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutView
    },
    {
      path: '/success',
      name: 'success',
      component: SuccessView
    },
    {
      path: '/service',
      name: 'service',
      component: ServiceView
    },
    {
      path: '/product',
      name: 'product',
      component: ProductView
    },
    {
      path: '/promotion',
      name: 'promotion',
      component: PromotionView
    },
    {
      path: '/article',
      name: 'article',
      component: ArticleView
    },

    // Admin

    {
      path: '/admin/login',
      name: 'login',
      component: AdminLogin
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: DashboardView
    },
    //Admin Product
    {
      path: '/admin/products',
      name: 'admin-product-list',
      component: AdminProductList
    },
    {
      path: '/admin/products/create',
      name: 'admin-product-create',
      component: AdminProductUpdate
    },
    {
      path: '/admin/products/update/:id',
      name: 'admin-product-update',
      component: AdminProductUpdate
    },

    // Admin User
    {
      path: '/admin/users',
      name: 'admin-user-list',
      component: AdminUserList
    },
    {
      path: '/admin/users/update/:id',
      name: 'admin-user-update',
      component: AdminUserUpdate
    },

    // Admin Order
    {
      path: '/admin/orders',
      name: 'admin-order-list',
      component: AdminOrderList
    },
    {
      path: '/admin/orders/detail/:id',
      name: 'admin-order-detail',
      component: AdminOrderDetail
    },
  ]
})

router.beforeEach(async(to , from , next) => {
  const accountStore = useAccountStore()
  await accountStore.checkAuth()
  if(to.name.includes('admin') && !accountStore.isAdmin) {
    next({name:'home'})
  } 
  else if (to.name === 'login' && accountStore.isAdmin) {
    next({ name: 'admin-dashboard'})
  }
  else {
    next()
  }
  next()
})

export default router
