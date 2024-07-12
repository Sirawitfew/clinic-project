<script setup>
import { defineProps } from 'vue'

defineProps({
    headers: Array
})
</script>

<template>
    <table class="table">
        <!-- head -->
        <thead>
            <tr class=" text-base">
                <th v-for="header in headers" :key="header">{{ header }}</th>
            </tr>
        </thead>
        <tbody>
            <slot></slot>
        </tbody>
    </table>
</template>