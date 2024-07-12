<template>
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
		<div class="bg-white p-8">
			<slot />
			<button class="mt-4 bg-gray-800 text-white py-2 px-4 rounded" @click="TogglePopup">
				Close Popup
			</button>
		</div>
	</div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
	TogglePopup: {
		type: Function,
		required: true
	}
});
</script>
