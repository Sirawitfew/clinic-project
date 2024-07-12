<script setup>
import { defineProps, ref, onMounted } from 'vue';

const props = defineProps({
    items: Array,
    removeProduct: Function
});

// Function to convert timestamp to readable date format
const formatTimestamp = (timestamp) => {
    const { seconds, nanoseconds } = timestamp;
    const milliseconds = (seconds * 1000) + (nanoseconds / 1000000);
    const date = new Date(milliseconds);
    return date.toISOString();
};

const formattedItems = ref([]);

onMounted(() => {
    formattedItems.value = props.items.map(item => ({
        ...item,
        formattedUpdatedAt: formatTimestamp(item.updatedAt)
    }));
});
</script>

<template>
    <tr v-for="(product, index) in formattedItems" :key="index">
        <th class="w-[20%]">{{ product.name }}</th>
        <td>
            <div class="avatar">
                <div class="w-14 rounded">
                    <img :src="product.imageUrl" />
                </div>
            </div>
        </td>
        <td>{{ product.price }}</td>
        <td>{{ product.remainQuantity }} / {{ product.quantity }}</td>
        <td>
            <div :class="['badge', product.status === 'close' ? 'badge-error' : 'badge-success']">
                {{ product.status }}
            </div>
        </td>
        <td>{{ product.formattedUpdatedAt }}</td>
        <td>
            <div class="flex space-x-2">
                <RouterLink :to="{ name: 'admin-product-update', params: { id: index } }" class="btn btn-ghost">
                    <Edit />
                </RouterLink>
                <div class="btn btn-ghost" @click="removeProduct(index)">
                    <Trash />
                </div>
            </div>
        </td>
    </tr>
</template>
