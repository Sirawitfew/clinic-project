<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue';

import { useUserProductStore } from './stores/user/product';
import { useAdminProductStore } from './stores/admin/product';
import { useUserCartStore } from './stores/user/cart';
import { useEventStore } from './stores/event';

const productStore = useUserProductStore()
const adminProductStore = useAdminProductStore()
const cartStore = useUserCartStore()
const eventStore = useEventStore()

onMounted(() => {
  cartStore.loadCart()
  productStore.loadProducts()
  adminProductStore.loadProduct()
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