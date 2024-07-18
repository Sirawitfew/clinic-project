<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue';

import { useUserProductStore } from './stores/user/product';
import { useAdminProductStore } from './stores/admin/product';
import { useUserCartStore } from './stores/user/cart';
import { useEventStore } from './stores/event';
import { useAdminDashboardStore } from './stores/admin/dashboard';

const productStore = useUserProductStore()
const adminProductStore = useAdminProductStore()
const cartStore = useUserCartStore()
const eventStore = useEventStore()
const AdminDashboardStore = useAdminDashboardStore()

onMounted(() => {
  cartStore.loadCart()
  productStore.loadProducts()
  adminProductStore.loadProduct()
  AdminDashboardStore.loadStore()
})

</script>

<template>
  <div v-if="eventStore.alert" class="toast">
    <div class="alert" :class="`alert-${eventStore.data.status}`">
      <span>{{ eventStore.data.message }}</span>
    </div>
  </div>
  <RouterView />
</template>